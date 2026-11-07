import * as THREE from 'three';
import gsap from 'gsap';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createStage } from './stage.js';

const section = document.getElementById('story');
const stage = document.getElementById('stage');
const canvas = document.getElementById('gl');
const still = stage.querySelector('.still');
const meter = document.getElementById('meter');
const panels = [...stage.querySelectorAll('.panel')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- WebGL (com plano B de imagem fixa) ----------
function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
  catch { return false; }
}
let renderer, scene, camera, knot, rim, draw = () => {};
let progress = 0, dirty = true, visible = true, fit = 1;

if (webglOk()) {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  scene = new THREE.Scene();
  // Reflexos realistas sem baixar HDR: ambiente de estúdio gerado em código.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  const geo = new THREE.TorusKnotGeometry(1.1, 0.34, 220, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0x7aa2ff, metalness: 1, roughness: 0.22 });
  knot = new THREE.Mesh(geo, mat);
  scene.add(knot);
  scene.add(new THREE.HemisphereLight(0xcfe0ff, 0x10121a, 0.35));
  rim = new THREE.DirectionalLight(0xffffff, 1.4);
  rim.position.set(3, 4, 5);
  scene.add(rim);

  const colorA = new THREE.Color(0x7aa2ff), colorB = new THREE.Color(0xffb86b);

  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;          // do palco, não de window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 2);   // limite de resolução = desempenho
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    fit = Math.max(1, 0.95 / camera.aspect);                       // tela estreita (celular em pé): afasta a câmera para o objeto caber
    dirty = true;
  };
  new ResizeObserver(resize).observe(stage);
  resize();

  // A posição do 3D é função direta do progresso (sem lerp): fica colado na rolagem.
  draw = () => {
    const p = progress;
    knot.rotation.set(p * Math.PI * 1.4, p * Math.PI * 2.0, 0);
    camera.position.z = gsap.utils.interpolate(7, 4.6, gsap.parseEase('power1.inOut')(p)) * fit;
    camera.position.x = Math.sin(p * Math.PI) * 0.8;
    camera.lookAt(0, 0, 0);
    knot.material.color.copy(colorA).lerp(colorB, p);
    renderer.render(scene, camera);
  };

  // Só desenha quando o palco está na tela.
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) dirty = true; }).observe(section);

  // Perda de contexto (comum em celular): mostra a imagem fixa em vez de uma tela preta.
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); canvas.hidden = true; still.hidden = false; });
} else {
  canvas.hidden = true; still.hidden = false;                       // sem WebGL: imagem real da cena
}

// ---------- Textos e barra (só transform/opacity) ----------
const tl = gsap.timeline({ defaults: { ease: 'none', force3D: true } });
panels.forEach((el, i) => {
  const t = i * 0.3;
  tl.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.08 }, t + 0.04)
    .to(el, { autoAlpha: 0, y: -28, duration: 0.08 }, t + 0.24);
});
tl.fromTo(meter, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);
tl.to({}, { duration: 1 }, 0);                                      // garante duração total = 1

// ---------- Palco + laço de desenho ----------
createStage({
  section, stage, timeline: tl,
  onProgress: (p) => { progress = p; dirty = true; },
});

gsap.ticker.add(() => {                                             // desenha 1x por quadro, e só se algo mudou
  if (!renderer || !visible) return;
  if (!reduceMotion && knot) knot.rotation.z += 0.0015;             // movimento automático: some com "reduzir animações"
  if (dirty || !reduceMotion) { draw(); dirty = false; }
});

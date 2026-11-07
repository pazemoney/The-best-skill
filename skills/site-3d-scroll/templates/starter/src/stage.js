// Palco de rolagem estável.
//  - A seção tem altura fixa em CSS (sem "pin-spacer" do GSAP).
//  - Entrada e saída: o palco fica `position: sticky` (o navegador cuida, sem tremor).
//  - Durante a animação: `position: fixed`, trocado já com o palco em top:0 (sem salto).
//  - O progresso é função da posição da rolagem (funciona com salto, inércia e reload no meio).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Barra de endereço do celular não deve disparar recálculo (evita saltos no iOS/Android).
ScrollTrigger.config({ ignoreMobileResize: true });

export function createStage({ section, stage, timeline, onProgress, onActive }) {
  let holdPx = 0, animPx = 0, travel = 0;
  const measure = () => {
    travel = Math.max(1, section.offsetHeight - stage.offsetHeight);   // total rolável dentro da seção
    const css = getComputedStyle(section);
    const hold = parseFloat(css.getPropertyValue('--hold')) || 30;
    const anim = parseFloat(css.getPropertyValue('--anim')) || 400;
    const unit = travel / (anim + hold * 2);
    holdPx = hold * unit; animPx = anim * unit;
  };
  measure();

  // 1) Troca sticky <-> fixed, decidida só pela posição (p), nunca pelo "sentido" da rolagem.
  const mode = (p) => {
    const a = (holdPx / travel) / 2;            // metade do trecho parado de entrada
    const b = 1 - a;                             // metade do trecho parado de saída
    return p >= a && p <= b ? 'fixed' : 'sticky';
  };
  let current = '';
  const apply = (p) => {
    const m = mode(p);
    if (m !== current) { current = m; stage.dataset.mode = m; onActive?.(m === 'fixed'); }
  };
  ScrollTrigger.create({
    trigger: section, start: 'top top', end: () => '+=' + travel,
    invalidateOnRefresh: true,
    onRefreshInit: measure,
    onUpdate: (self) => apply(self.progress),
    onRefresh: (self) => apply(self.progress),
  });

  // 2) Progresso da animação: só o trecho do meio. scrub: true = sem suavização (nada "correndo atrás").
  const anim = ScrollTrigger.create({
    trigger: section,
    start: () => 'top+=' + holdPx + ' top',
    end: () => '+=' + animPx,
    scrub: true,
    invalidateOnRefresh: true,
    animation: timeline,
    onUpdate: (self) => onProgress?.(self.progress),
    onRefresh: (self) => onProgress?.(self.progress),
  });
  return { refresh: () => ScrollTrigger.refresh(), anim };
}

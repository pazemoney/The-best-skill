#!/usr/bin/env python3
"""Regenera INDEX.md, o catálogo do guia (CATALOG.tsv) e os perfis de instalação.
Uso (na raiz do repositório):  python3 tools/build.py
Depende de: skills/*/SKILL.md, PROVENANCE.tsv, tools/installs.tsv, profiles/core.list
"""
import os, re, csv, collections
try:
    import yaml
except ImportError:
    yaml = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SK = os.path.join(ROOT, "skills")

def read_tsv(p):
    with open(p, encoding="utf-8") as f:
        rows = list(csv.reader(f, delimiter="\t"))
    return {r[0]: r[1] for r in rows[1:] if len(r) >= 2}

prov = read_tsv(os.path.join(ROOT, "PROVENANCE.tsv"))
inst = {k: int(v) for k, v in read_tsv(os.path.join(ROOT, "tools", "installs.tsv")).items()}

def meta(d):
    t = open(os.path.join(SK, d, "SKILL.md"), encoding="utf-8", errors="ignore").read()
    m = re.match(r"^﻿?---\r?\n(.*?)\r?\n---", t, re.S)
    name, desc = d, ""
    if m:
        if yaml:
            try:
                y = yaml.safe_load(m.group(1)) or {}
                name, desc = str(y.get("name", d)), str(y.get("description", ""))
            except Exception:
                pass
        if not desc:
            mm = re.search(r"^description:\s*(.*)$", m.group(1), re.M)
            desc = mm.group(1).strip() if mm else ""
    return name, " ".join(desc.split())

CATS = [  # (categoria, regex no NOME, regex na DESCRIÇÃO) — a primeira que casar vence
    ("tokens-e-modelos", r"token|context-(budget|engineering|compress|driven)|caveman|paleo|cost-aware|model-(rout|funnel)|handoff|compact|cost-optim",
        r"token (saving|usage|budget|efficien)|context window|reduce (token|cost)|cheaper model|model rout"),
    ("web-front-end-3d", r"three|3d|webgl|gsap|scroll|parallax|r3f|shader|lenis|animat|motion|taste|frontend|front-end|web-design|\bui\b|ui-|ux|design|landing|tailwind|shadcn|css|figma|brand|slides|typograph|layout|accessib|wcag|web-quality|react|next|vue|svelte|angular|astro|nuxt",
        r"three\.js|webgl|gsap|scrolltrigger|landing page|front-?end|web design|tailwind|\bcss\b|ui/ux|user interface|react component|design system"),
    ("escrita-e-copy", r"humaniz|slop|writing|writer|copywrit|proofread|blog|article|newsletter|ghostwrit|editor|prose",
        r"copywriting|writing style|blog post|rewrite|proofread"),
    ("video-e-midia", r"video|hyperframes|remotion|heygen|audio|speech|music|image|elevenlabs|caption|podcast|avatar|dubbing|voice|sound",
        r"video|audio|image generation|speech|music|voice"),
    ("marketing-e-vendas", r"seo|marketing|sales|\bads?\b|ad-|advertis|affiliate|revenue|lead|crm|pricing|growth|conversion|funnel|outreach|social|linkedin|partner|revops|competitor|keyword",
        r"\bseo\b|marketing|sales|advertis|lead gen|conversion|affiliate"),
    ("cloud-e-dados", r"azure|aws|cloudflare|firebase|supabase|vercel|docker|kubernetes|terraform|gcp|google-cloud|deploy|devops|github-actions|observab|sentry|grafana|neon|convex|clickhouse|prisma|postgres|database|sql|redis|mongo|stripe|clerk|auth|netlify|salesforce|apex|sf-",
        r"azure|aws|cloudflare|firebase|supabase|docker|kubernetes|terraform|database|postgres|\bsql\b|deployment"),
    ("mobile", r"expo|flutter|react-native|swift|ios|android|kotlin|dart|mobile|xcode|simulator",
        r"expo|flutter|react native|swiftui|\bios\b|android"),
    ("agentes-e-mcp", r"agent|mcp|langchain|langgraph|skill|orchestr|crew|llm|prompt|claude|gemini|openai|rag|memory|swarm",
        r"\bmcp\b|agent skill|langchain|\bllm\b|prompt engineering|subagent"),
    ("docs-e-produtividade", r"pdf|docx|xlsx|pptx|excel|spreadsheet|notion|obsidian|gws|workspace|document|markdown|chart|visualiz|diagram|mermaid|excalidraw|notebook|planning|research|summar",
        r"\bpdf\b|spreadsheet|notion|obsidian|google workspace|diagram|presentation"),
    ("seguranca", r"security|pentest|ctf|vulnerab|owasp|threat|exploit|fuzz|forensic|malware|crypto",
        r"security|vulnerab|pentest|\bctf\b|owasp"),
    ("engenharia", r"^$", r"^$"),
]
def cat_of(name, desc, src):
    nm, ds = name.lower(), desc[:200].lower()
    for c, nrx, drx in CATS:
        if c != "engenharia" and re.search(nrx, nm): return c
    for c, nrx, drx in CATS:
        if c != "engenharia" and re.search(drx, ds): return c
    return "engenharia"

rows = []
for d in sorted(os.listdir(SK)):
    if not os.path.isfile(os.path.join(SK, d, "SKILL.md")):
        continue
    name, desc = meta(d)
    src = prov.get(d, "?")
    rows.append(dict(dir=d, name=name, desc=desc, src=src, inst=inst.get(d, 0), cat=cat_of(d, desc, src)))

# ---------- INDEX.md ----------
out = ["# Índice de skills\n",
       f"Total: **{len(rows)}** skills. Instalações vêm do ranking do skills.sh (0 = sem dado ou skill própria).\n",
       "Para achar uma skill: procure pelo nome ou assunto nesta página (Ctrl+F) ou use `skills/the-best-skill-guide/CATALOG.tsv`.\n"]
bycat = collections.defaultdict(list)
for r in rows: bycat[r["cat"]].append(r)
for c in [x[0] for x in CATS]:
    items = sorted(bycat.get(c, []), key=lambda r: (-r["inst"], r["dir"]))
    if not items: continue
    out += [f"\n## {c} ({len(items)})\n", "| Skill | Origem | Instalações | Descrição |", "|---|---|---:|---|"]
    for r in items:
        d = r["desc"][:150].replace("|", "/")
        src = r["src"]
        out.append(f"| `{r['dir']}` | [{src}](https://github.com/{src}) | {r['inst']:,} | {d} |")
open(os.path.join(ROOT, "INDEX.md"), "w", encoding="utf-8").write("\n".join(out) + "\n")

# ---------- CATALOG.tsv (dentro do guia) ----------
gdir = os.path.join(SK, "the-best-skill-guide")
os.makedirs(gdir, exist_ok=True)
with open(os.path.join(gdir, "CATALOG.tsv"), "w", encoding="utf-8") as f:
    f.write("skill\tcategoria\tinstalacoes\torigem\tdescricao\n")
    for r in sorted(rows, key=lambda r: (r["cat"], -r["inst"], r["dir"])):
        f.write(f"{r['dir']}\t{r['cat']}\t{r['inst']}\t{r['src']}\t{r['desc'][:140]}\n")

# ---------- perfis ----------
PD = os.path.join(ROOT, "profiles"); os.makedirs(PD, exist_ok=True)
core = [l.strip() for l in open(os.path.join(PD, "core.list")) if l.strip() and not l.startswith("#")]
present = {r["dir"] for r in rows}
miss = [c for c in core if c not in present]
if miss: print("AVISO: no core.list mas ausentes:", miss)
N = 35
CURATED = {"tokens-e-modelos", "web-front-end-3d"}   # têm perfis curados à mão (economia-de-tokens, 3d-e-scroll)
for c in [x[0] for x in CATS]:
    if c in CURATED: continue
    items = sorted(bycat.get(c, []), key=lambda r: (-r["inst"], r["dir"]))[:N]
    chars = sum(len(r["name"]) + len(r["desc"]) for r in items)
    with open(os.path.join(PD, f"{c}.list"), "w", encoding="utf-8") as f:
        f.write(f"# Perfil {c}: as {len(items)} skills mais instaladas da categoria (~{chars:,} caracteres de descrição)\n")
        for r in items: f.write(r["dir"] + "\n")
tot = sum(len(r["name"]) + len(r["desc"]) for r in rows if r["dir"] in set(core))
print(f"{len(rows)} skills | core={len(core)} (~{tot:,} caracteres de descrição) | categorias:", {c: len(v) for c, v in bycat.items()})

# ---------- licenças: quais origens não têm arquivo ----------
LD = os.path.join(ROOT, "licenses")
srcs = sorted({r["src"] for r in rows if r["src"] not in ("?", "pazemoso/The-best-skill") and not r["src"].startswith("pazemoney/")})
missing = [s for s in srcs if not os.path.exists(os.path.join(LD, s.replace("/", "__") + ".LICENSE"))]
with open(os.path.join(LD, "SEM-ARQUIVO-DE-LICENCA.txt"), "w", encoding="utf-8") as f:
    f.write("Repositórios de origem sem arquivo de licença na raiz copiado aqui (veja o repositório original e a pasta de cada skill):\n")
    for m in missing: f.write(f"https://github.com/{m}\n")
print(f"origens: {len(srcs)} | sem licença copiada: {len(missing)}")

# The Best Skill

Coleção das skills mais instaladas do [skills.sh](https://skills.sh) (ranking de 07/11/2026), organizadas por área. Cada skill fica em `skills/<nome>/SKILL.md`.

## Como usar

Copie a pasta da skill que quiser para `.claude/skills/` (projeto) ou `~/.claude/skills/` (global).

## Observações

- O conteúdo vem dos repositórios originais (links na tabela); as licenças estão em `licenses/`. Cada autor mantém seus direitos.
- Não incluí `docx`, `pdf`, `pptx` e `xlsx` da Anthropic (licença proprietária que proíbe redistribuir).
- `taste-skill` está sem as pastas `assets/photos` e `assets/objects` (fotos de banco de imagem, ~18 MB). O `CLAUDE.md` do site da Flávia proíbe banco de imagens.
- São instruções de terceiros: revise antes de ativar em projeto importante.

## Skills

### Design/Docs/Dev

| Skill | Origem | Descrição |
|---|---|---|
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typog |
| `skill-creator` | [anthropics/skills](https://github.com/anthropics/skills) | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, ed |
| `webapp-testing` | [anthropics/skills](https://github.com/anthropics/skills) | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI be |
| `mcp-builder` | [anthropics/skills](https://github.com/anthropics/skills) | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-design |
| `doc-coauthoring` | [anthropics/skills](https://github.com/anthropics/skills) | Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical s |
| `web-artifacts-builder` | [anthropics/skills](https://github.com/anthropics/skills) | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, |
| `theme-factory` | [anthropics/skills](https://github.com/anthropics/skills) | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set t |
| `brand-guidelines` | [anthropics/skills](https://github.com/anthropics/skills) | Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use |
| `claude-api` | [anthropics/skills](https://github.com/anthropics/skills) | Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model  |
| `internal-comms` | [anthropics/skills](https://github.com/anthropics/skills) | A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use  |
| `canvas-design` | [anthropics/skills](https://github.com/anthropics/skills) | Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a pos |

### Engenharia/Produtividade

| Skill | Origem | Descrição |
|---|---|---|
| `code-review` | [mattpocock/skills](https://github.com/mattpocock/skills) | "Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes: Standards (does the code follow this repo's doc |
| `codebase-design` | [mattpocock/skills](https://github.com/mattpocock/skills) | Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunitie |
| `diagnosing-bugs` | [mattpocock/skills](https://github.com/mattpocock/skills) | Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwi |
| `domain-modeling` | [mattpocock/skills](https://github.com/mattpocock/skills) | Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a GLOSSARY.md, or recording or edit |
| `grill-with-docs` | [mattpocock/skills](https://github.com/mattpocock/skills) | A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go. |
| `implement` | [mattpocock/skills](https://github.com/mattpocock/skills) | "Implement a piece of work based on a spec or set of tickets." |
| `implement-spec` | [mattpocock/skills](https://github.com/mattpocock/skills) | "Implement the result of /to-spec and /to-tickets in code." |
| `improve-codebase-architecture` | [mattpocock/skills](https://github.com/mattpocock/skills) | Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick. |
| `pr` | [mattpocock/skills](https://github.com/mattpocock/skills) | "Use when writing a PR body." |
| `prototype` | [mattpocock/skills](https://github.com/mattpocock/skills) | Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, |
| `research` | [mattpocock/skills](https://github.com/mattpocock/skills) | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a |
| `retro` | [mattpocock/skills](https://github.com/mattpocock/skills) | "Conduct a retrospective on a coding session." |
| `tdd` | [mattpocock/skills](https://github.com/mattpocock/skills) | Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integrati |
| `to-spec` | [mattpocock/skills](https://github.com/mattpocock/skills) | "Turn the current conversation into a spec and publish it to the project issue tracker: no interview, just synthesis of what you've already  |
| `to-tickets` | [mattpocock/skills](https://github.com/mattpocock/skills) | Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the con |
| `triage` | [mattpocock/skills](https://github.com/mattpocock/skills) | Move issues and external PRs through a state machine of triage roles, categorise, verify, grill if needed, and write agent-ready briefs. |
| `wayfinder` | [mattpocock/skills](https://github.com/mattpocock/skills) | Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on your issue tracker, and resolve them |
| `wizard` | [mattpocock/skills](https://github.com/mattpocock/skills) | Generate an interactive bash wizard that walks a human through steps only they can perform. Use when provisioning infrastructure, setting up |
| `grill-me` | [mattpocock/skills](https://github.com/mattpocock/skills) | A relentless interview to sharpen a plan or design. |
| `grilling` | [mattpocock/skills](https://github.com/mattpocock/skills) | Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trig |
| `handoff` | [mattpocock/skills](https://github.com/mattpocock/skills) | Compact the current conversation into a handoff document for another agent to pick up. |
| `teach` | [mattpocock/skills](https://github.com/mattpocock/skills) | Teach the user a new skill or concept, within this workspace. |
| `to-questionnaire` | [mattpocock/skills](https://github.com/mattpocock/skills) | Turn a decision you can't fully answer into a questionnaire for someone else to fill in. |
| `wait-what` | [mattpocock/skills](https://github.com/mattpocock/skills) | "Stop. That last message did not land: re-pitch it." |
| `writing-for-agents` | [mattpocock/skills](https://github.com/mattpocock/skills) | Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md. |
| `git-guardrails-claude-code` | [mattpocock/skills](https://github.com/mattpocock/skills) | Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before they execute. Use when user wan |
| `setup-pre-commit` | [mattpocock/skills](https://github.com/mattpocock/skills) | Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use when user wants to add pre-comm |

### Web/React/Vercel

| Skill | Origem | Descrição |
|---|---|---|
| `react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refacto |
| `composition-patterns` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React composition patterns that scale. Use when refactoring components with |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX" |
| `react-view-transitions` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Guide for implementing smooth, native-feeling animations using React's View Transition API (`<ViewTransition>` component, `addTransitionType |
| `deploy-to-vercel` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Deploy applications and websites to Vercel. Use when the user requests deployment actions like "deploy my app", "deploy and give me the link |
| `react-native-skills` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React Native and Expo best practices for building performant mobile apps. Use |
| `writing-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Review docs/prose for Writing Guidelines compliance. Use when asked to "review my docs", "check writing style", "audit prose", "review docs  |
| `vercel-optimize` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | "Use for Vercel cost and performance optimization on deployed projects, especially Next.js, SvelteKit, Nuxt, and limited Astro apps. Collect |
| `vercel-cli-with-tokens` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Deploy and manage projects on Vercel using token-based authentication. Use when working with Vercel CLI using access tokens rather than inte |

### Agentes

| Skill | Origem | Descrição |
|---|---|---|
| `find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) | Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can |

### Agentes/Browser

| Skill | Origem | Descrição |
|---|---|---|
| `agent-browser` | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages, filling forms, clicking |

### Testes

| Skill | Origem | Descrição |
|---|---|---|
| `dogfood` | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | Systematically explore and test a web application to find bugs, UX issues, and other problems. Use when asked to "dogfood", "QA", "explorato |

### Design/UI

| Skill | Origem | Descrição |
|---|---|---|
| `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | "UI/UX design intelligence for web, mobile, and desktop. This skill should be used when designing, building, reviewing, or fixing interfaces |
| `design` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | "Comprehensive design skill: brand identity, design tokens, UI styling, logo generation (55 styles, Gemini, Atlas Cloud, or MuAPI AI), corpo |
| `design-system` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Token architecture, component specifications, and slide generation. Three-layer tokens (primitive→semantic→component), CSS variables, spacin |
| `brand` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Brand voice, visual identity, messaging frameworks, asset management, brand consistency. Activate for branded content, tone of voice, market |
| `ui-styling` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, a |
| `banner-design` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | "Design banners for social media, ads, website heroes, creative assets, and print. Multiple art direction options with optional generated or |
| `slides` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies. |

### Design/Mobile

| Skill | Origem | Descrição |
|---|---|---|
| `design-mobile-apps` | [designed-by-ai/skills](https://github.com/designed-by-ai/skills) | Design mobile app screens with Sleek, edit Sleek projects, and implement their designs in React Native or HTML. |

### Design/Frontend

| Skill | Origem | Descrição |
|---|---|---|
| `taste-skill` | [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) | tasteskill 2.5.1, the anti-slop frontend skill. Builds professional company websites at the level of figma.com and x.ai: plain copy in a voi |

### Vídeo

| Skill | Origem | Descrição |
|---|---|---|
| `remotion-best-practices` | [remotion-dev/skills](https://github.com/remotion-dev/skills) | Router for all Remotion skills |
| `remotion-create` | [remotion-dev/skills](https://github.com/remotion-dev/skills) | Create a new Remotion video |
| `hyperframes` | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Read first to make, edit, animate or render any video with HyperFrames (HTML rendered to video), including launch films, explainers, music v |
| `hyperframes-cli` | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | The HyperFrames CLI by job - scaffold, check, look at frames, edit the timeline, preview, render locally or in the cloud, publish, project h |

### Economia de tokens

| Skill | Origem | Descrição |
|---|---|---|
| `caveman` | [juliusbrussee/caveman](https://github.com/juliusbrussee/caveman) | Terse caveman voice: answer first, fluff gone, every technical fact kept. Use for /caveman, "caveman mode", "talk like caveman", "be brief", |
| `caveman-commit` | [juliusbrussee/caveman](https://github.com/juliusbrussee/caveman) | Write a Conventional Commits message compressed to intent only. Use for "write a commit", "commit message", /commit or /caveman-commit. |
| `caveman-review` | [juliusbrussee/caveman](https://github.com/juliusbrussee/caveman) | Compressed code review - one line per finding with location, problem and fix. Use for /caveman-review, "review this PR", or "review the diff |
| `caveman-compress` | [juliusbrussee/caveman](https://github.com/juliusbrussee/caveman) | Compress a memory file such as CLAUDE.md or a todo list into caveman format to save input tokens, keeping a readable backup. Sends the file' |

### Agentes/Google

| Skill | Origem | Descrição |
|---|---|---|
| `google-agents-cli-adk-code` | [google/agents-cli](https://github.com/google/agents-cli) | This skill should be used when the user wants to "write agent code", "build an agent with ADK", "add a tool", "create a callback", "define a |
| `google-agents-cli-deploy` | [google/agents-cli](https://github.com/google/agents-cli) | This skill should be used when the user wants to "deploy an agent", "deploy my ADK agent", "set up CI/CD", "configure secrets", "troubleshoo |
| `google-agents-cli-eval` | [google/agents-cli](https://github.com/google/agents-cli) | This skill should be used when the user wants to "run an evaluation", "evaluate my agent", "evaluate my ADK agent", "write an eval dataset", |
| `google-agents-cli-scaffold` | [google/agents-cli](https://github.com/google/agents-cli) | This skill should be used when the user wants to "create an agent project", "start a new ADK project", "build me a new agent", "add CI/CD to |
| `google-agents-cli-workflow` | [google/agents-cli](https://github.com/google/agents-cli) | This skill should be used when the user wants to "develop an agent", "build an agent using ADK", "run the agent locally", "debug agent code" |
| `google-agents-cli-observability` | [google/agents-cli](https://github.com/google/agents-cli) | This skill should be used when the user wants to "set up tracing", "monitor my agent", "configure logging", "add observability", "debug prod |
| `google-agents-cli-publish` | [google/agents-cli](https://github.com/google/agents-cli) | This skill should be used when the user wants to "publish an agent", "publish my ADK agent", "register an agent with Gemini", "publish to Ge |

### Cloud/Azure

| Skill | Origem | Descrição |
|---|---|---|
| `azure-prepare` | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) | "Prepare azd-based Azure projects for deployment: generates azure.yaml, infrastructure (Bicep/Terraform), and Dockerfiles for the Azure Deve |
| `azure-deploy` | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) | "Execute Azure deployments for ALREADY-PREPARED applications that have existing .azure/deployment-plan.md and infrastructure files. DO NOT u |
| `azure-validate` | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) | "Pre-deployment validation for Azure readiness. Run deep checks on configuration, infrastructure (Bicep or Terraform), RBAC role assignments |
| `azure-diagnostics` | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) | "Debug Azure production issues using AppLens, Azure Monitor, resource health, and safe triage, including evidence-only diagnosis without liv |
| `azure-storage` | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) | "Azure Storage Services including Blob Storage, File Shares, Queue Storage, Table Storage, and Data Lake. Answers questions about storage ac |
| `azure-compute` | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) | "Azure VM/VMSS router. WHEN: create / provision / deploy / spin-up VM, recommend VM size, compare VM pricing, VMSS, scale set, autoscale, bu |
| `azure-kubernetes` | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) | "Plan, create, and configure production-ready Azure Kubernetes Service (AKS) clusters. Covers Day-0 checklist, SKU selection (Automatic vs S |

# SGI — Portal de Conteúdo

## What This Is
A public Delivery Hub for the Sociedade Gnóstica Internacional (SGI). Replaces Google Drive/Docs as the primary content delivery mechanism for course buyers. Accessible via public URL — no login required.

Built using the Anti-Prompt Method (structured brainstorm → content pipeline → parallel research → build → deploy).

## Current Status
- Phase A: ✅ Scaffold + navigation built
- Phase B: ✅ 227 transcripts processed into markdown (8 sections)
- Phase C: ⬜ Polish pass (font loading, favicon, any visual tweaks)
- Phase D: ⬜ Deploy to Vercel + push to GitHub

## Key Context

### Audience
Course and program buyers of SGI. Portuguese-speaking (PT-BR). Accessing on mobile and desktop equally.

### Core Outcome
Clear understanding of the gnosis/esoteric methodology. Content is a reference library — no guided onboarding path, no progress tracking.

### Content Structure (8 sections, 227 lessons)
| Section slug | Title | Lessons |
|---|---|---|
| psicologia-esoterica | Psicologia Esotérica | ~92 |
| segunda-camara | 2ª Câmara | ~33 |
| corpo-energetico | Corpo Energético & Chacras | ~29 |
| mundo-astral | Mundo Astral & Sonhos | ~23 |
| magia-pratica | Magia Prática | ~16 |
| tradicoes-iniciaticas | Tradições Iniciáticas | ~14 |
| tira-duvidas | Tira-Dúvidas & Encontros | ~12 |
| meditacao-presenca | Meditação & Presença | ~8 |

### Content Source
Raw transcripts: `/Users/victorfreitas/Desktop/SGI-IA/resultados-finais-transcripts-txt/` (227 .txt files)
Processing script: `scripts/process-transcripts.ts`
Processed markdown: `content/` directory

### Brand
- Dark background (#080808), near-white text (#F5F5F5)
- Gold accent (#D4AF37)
- Bold, direct, no-BS — "Tomada de Vergonha na Cara" methodology

## Tech Stack
- **Next.js 16** (App Router, static generation)
- **TypeScript**
- **Tailwind CSS v4**
- **gray-matter** — frontmatter parsing
- **remark/remark-html** — markdown rendering
- **Static export** — no server, no database, no auth
- **Vercel** — deployment target
- **GitHub** — `github.com/victorleme/sgi-ia`

## Architecture
```
app/
  page.tsx                    # Homepage (section grid)
  [section]/page.tsx          # Section index (lesson list)
  [section]/[lesson]/page.tsx # Individual lesson
components/
  Sidebar.tsx                 # Desktop sidebar nav
  MobileNav.tsx               # Mobile hamburger nav
lib/
  sections.ts                 # Section config (slugs, titles, icons, colors)
  content.ts                  # Content loader (reads markdown from content/)
content/
  [section-slug]/[lesson].md  # Processed lessons with frontmatter
scripts/
  process-transcripts.ts      # One-time pipeline: .txt → .md
```

## Commands
```bash
npm run dev              # Local dev server
npm run build            # Production build
npm run process-content  # Re-process transcripts → markdown
```

## Mistakes List
<!-- Every mistake that happened during build goes here. Same mistake twice = flag it. -->
- (none yet)

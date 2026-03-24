# Output log

A running record of session outputs — learnings, content produced, and key decisions made across work sessions.

---

<!-- New entries are appended below by the /learn skill -->

---

## Session — 2026-03-23

### What was built

**Project setup**
- Created `my-content-system` project with `CLAUDE.md`, `memory.md`, `skills/tone-checker.md`, `skills/learn.md`
- Initialized git and pushed to GitHub: `github.com/inahuang-netizen/my-content-system`

**Obsidian vault**
- Configured `my-content-system` as an Obsidian vault (`.obsidian/` config)
- Installed Obsidian Git plugin set to auto-commit and push every 10 minutes
- Synced Obsidian vault at `C:\Users\rod_f\INAOBSIDIAN\my-content-system` with GitHub

**Style guide**
- Added full Intuit Content Style Guide to `CLAUDE.md` — voice/tone, grammar, punctuation, formatting, word choices, anti-racist language, UI writing
- Added Intuit Accessibility & Inclusion guidelines — POUR principles, alt text, plain language (5th–8th grade target), inclusive language

**Skills**
- Rebuilt `skills/tone-checker.md` — 8-category style check with pass/flag output, rewrite table, and Approve/Revise/Rewrite verdict
- Created `skills/content-pipeline.md` — 4-step guided content creation pipeline:
  - Step 1: Ideation & Research (3 angles, audience, goal)
  - Step 2: Draft (style-compliant copy)
  - Step 3: Verify (8-category check + auto-fix)
  - Step 4: Gatekeeper Score (0–100 with per-category breakdown)
- Updated `skills/learn.md` — now writes to both `memory.md` and `output.md`

**Output log**
- Created `output.md` as a running session output log

---

## Session — 2026-03-24

### What was built

**Tone Checker web app — deployed to Vercel**
- Built `tone-checker-app/` — a Next.js 14 web app for SF Dining Cam designers
- Accepts pasted copy (text mode) or uploaded screenshots (image mode)
- Calls Claude Opus 4.6 via the Anthropic API with the full Intuit style guide as system prompt
- Streams the tone check report back in real time with markdown rendering
- Color-coded score badge (0–100): Publish-ready / Minor revisions / Significant revisions / Rewrite required
- Deployed to Vercel; auto-deploys on every push to `master`

**Key technical decisions**
- API route runs on Edge Runtime (no execution time limit — Claude can take 20–30s for a full report)
- Route uses raw fetch + SSE parsing instead of the Anthropic SDK (SDK streaming doesn't work in Edge Runtime)
- No auth — open access for the design team

**Debugging resolved**
- node_modules committed to git → removed with `git rm --cached`, rewrote commit history before pushing
- 500 error → added try/catch and proper error responses to the API route
- Vercel 10s timeout → switched to Edge Runtime
- No results streaming → rewrote route to use raw fetch + SSE parsing (bypasses SDK)
- Anthropic billing error → added credits to console.anthropic.com

**Files created**
- `tone-checker-app/app/api/check/route.ts` — Edge Runtime POST endpoint, SSE streaming
- `tone-checker-app/app/page.tsx` — main UI with tab switcher, input, submit, results
- `tone-checker-app/app/layout.tsx` — root layout
- `tone-checker-app/app/globals.css` — Tailwind base
- `tone-checker-app/components/InputTabs.tsx` — Text / Screenshot tab toggle
- `tone-checker-app/components/CopyInput.tsx` — textarea for copy paste
- `tone-checker-app/components/ImageUpload.tsx` — drag-and-drop image upload with preview
- `tone-checker-app/components/ResultsPanel.tsx` — streamed markdown report renderer
- `tone-checker-app/components/ScoreBadge.tsx` — color-coded score badge
- `tone-checker-app/lib/systemPrompt.ts` — full Intuit style guide as API system prompt

**Next: Phase 2**
- Figma plugin integration — reads selected frame text via Figma Plugin API, sends to `/api/check`, displays report inside Figma

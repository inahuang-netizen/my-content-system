# Skill: Tone Checker

## Purpose
Evaluate content against the Intuit Content Style Guide and return a structured report with pass/fail findings, flagged issues, and suggested rewrites.

## Usage
```
/tone-checker [paste content here]
```

## How to Run This Check

Evaluate the provided content across all 8 categories below. For each category, mark it **Pass** or **Flag**, state the finding, then compile all flagged issues into a rewrite table at the end.

---

## 8 Evaluation Categories

### 1. Voice & Tone
Check that the content is warm, confident, and genuine.
- Uses "you" for the reader; "we/us" when speaking as Intuit
- Explains *why*, not just what to do
- Greets warmly ("Hi", "Hey there") where appropriate
- No stiff, formal, or corporate phrasing
- Not arrogant or over-the-top enthusiastic

### 2. Active Voice & Verb Tenses
- Active voice is preferred ("Categorize your transactions" not "Transactions can be categorized")
- Simple tenses only: past, present, future
- Flag progressive forms ("is running", "will be importing")
- Flag perfect forms ("has run", "had been getting")

### 3. Contractions & Conversational Register
- Common contractions are used naturally (we'll, can't, it's, you're)
- Content reads naturally out loud — if it sounds robotic, flag it
- No Latin abbreviations: flag e.g., i.e., etc. → replace with "for example", "that is", and so on
- No semicolons — too formal; use a period or conjunction instead

### 4. Capitalization & Formatting
- Sentence case everywhere, including headings and titles
- Feature names are lowercase ("mileage reports" not "Mileage Reports")
- No ALL CAPS (except marketing badges, navigation labels, table headers)
- Bold used only on UI elements users can select (buttons, field names, menu items)
- No italics — use bold instead
- No angle brackets for navigation paths ("Go to Banking and select Receipts" not "Banking > Receipts")

### 5. Word Choices
Flag these terms and suggest replacements:

| Flag | Replace with |
|---|---|
| click | select |
| enable / disable | turn on / turn off |
| deselect | clear |
| bug | issue |
| hacked / breached / leaked | compromised |
| e.g. | for example |
| i.e. | that is |
| functionality | [describe what it does specifically] |
| feature | [use the feature's actual name] |
| allow / allows | [reframe around customer benefit] |
| easy / easily / effortless | [remove unless you can prove it] |
| "Learn more" (standalone) | [descriptive link text] |

Also flag directional cues: above, below, left, right, top, bottom — these break accessibility.

### 6. Readability
- Sentences should be ≤ 20 words
- Lines should be ≤ 80 characters
- Prefer short words (3–5 letters) over long ones (8–9 letters)
- Target reading level: 5th–8th grade (use as a guide, not a rule)
- Replace jargon with everyday alternatives ("use" not "utilize", "help" not "facilitate")
- Exception: technical/professional terms are acceptable for expert audiences (e.g., accountants)

### 7. Anti-Racist & Inclusive Language
Flag these terms:

| Flag | Replace with |
|---|---|
| blacklist | blocklist, deny list, excluded list |
| whitelist | allowlist |
| master / slave | primary / replica, leader / follower |
| grandfathered | legacy, existing |
| tribe | community, group |
| powwow | meeting, discussion |
| spirit animal | kindred spirit, inspiration |
| brown bag | lunch-and-learn |
| sanity check | confidence check |
| crazy / insane / psycho | person diagnosed with a mental health condition |
| wheelchair-bound | person who uses a wheelchair |
| Indian (if meaning Indigenous) | Indigenous |
| transgendered | transgender, trans |
| crippled / handicapped | disabled, person with a disability |

Also check:
- No black/white/dark/light used as metaphors — only literal visual descriptions
- Gender-neutral language: "you", they/them/their for unknown gender, not "s/he" or "he/she"
- Greetings: folks, everyone, team — not guys, dudes, sir, ma'am

### 8. Accessibility
- No directional cues (above, below, left, right) — assistive tech and varied layouts make these unreliable
- Link text is meaningful and descriptive — not "click here" or standalone "Learn more"
- Icons referenced with text labels, not shape or position alone
- No instructions that rely on color alone to convey meaning

---

## Output Format

```
## Tone Check Report

**Overall verdict:** Approve / Revise / Rewrite

---

### 1. Voice & Tone — Pass / Flag
[finding, or "Looks good"]

### 2. Active Voice & Verb Tenses — Pass / Flag
[finding, or "Looks good"]

### 3. Contractions & Register — Pass / Flag
[finding, or "Looks good"]

### 4. Capitalization & Formatting — Pass / Flag
[finding, or "Looks good"]

### 5. Word Choices — Pass / Flag
[finding, or "Looks good"]

### 6. Readability — Pass / Flag
[finding, or "Looks good"]

### 7. Anti-Racist & Inclusive Language — Pass / Flag
[finding, or "Looks good"]

### 8. Accessibility — Pass / Flag
[finding, or "Looks good"]

---

### Flagged Issues & Suggested Rewrites

| # | Original | Issue | Suggested rewrite |
|---|---|---|---|
| 1 | "..." | Reason | "..." |

---

### Summary
[1–2 sentences on overall quality and the top priority to address if revising]
```

---

## Verdict Guide
- **Approve** — 0–1 minor flags, no critical issues
- **Revise** — 2–4 flags or 1 critical issue (word choice, inclusive language, accessibility)
- **Rewrite** — 5+ flags or fundamental tone/voice mismatch

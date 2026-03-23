# my-content-system

## Project Overview
This is a content management and creation system. It uses Claude Code to assist with writing, editing, and managing content. All content follows the **Intuit Content Style Guide** (contentdesign.intuit.com).

## Project Structure
- `CLAUDE.md` — Project instructions and conventions for Claude Code
- `memory.md` — Running notes and context for ongoing work
- `skills/` — Custom skill definitions for Claude Code

## Skills
- `skills/tone-checker.md` — Checks content tone and style
- `skills/learn.md` — Captures new learnings and knowledge

---

## Intuit Style Guide

> Reference: [contentdesign.intuit.com](https://contentdesign.intuit.com/)
> Default style authority: AP Stylebook. Dictionary: Merriam-Webster (US).

### Voice & Tone

Intuit's voice is **warm, confident, and genuine**.

- **Warm**: Greet with "Hi" or "Hey there." Use "Thanks" over formal alternatives.
- **Confident**: Self-assured but not arrogant. Energetic but not over the top.
- **Genuine**: Sincere and candid. Explain *why* tasks matter, not just what to do.

**8 core writing principles:**

1. Talk to your friends — write conversationally, prioritize natural speech
2. Be clear and precise — definitive language, consistent terminology
3. End sentences with prepositions when it sounds natural
4. Speak to customers as "you"; use "we/us" for Intuit
5. Think globally — consider translation, cultural variation, regional differences
6. Use active voice ("Quickly categorize your transactions")
7. Use everyday contractions (we'll, can't, it's)
8. Use simple verb tenses — past, present, future only (no progressive or perfect)

---

### Grammar & Mechanics

**Capitalization**
- Sentence case everywhere, including headings and titles
- Don't capitalize feature names ("mileage reports," not "Mileage Reports")
- Capitalize branded products: "QuickBooks Online"
- No ALL CAPS except marketing badges, navigation labels, and table headers

**Sentences**
- Keep them short and punchy
- Read copy out loud — if it sounds unnatural, rewrite it
- One idea per sentence

**Lists**
- Bulleted: keep under 5 items; use consistent structure (all fragments or all sentences)
- Numbered: use for sequence or priority; one action per step
- No commas or semicolons at the end of list items

---

### Punctuation

| Rule | Guidance |
|---|---|
| Apostrophes | Use for contractions and possessives; avoid regional forms like "y'all" |
| Quotation marks | Commas and periods inside; colons, semicolons, ?, ! outside |
| Hyphens | Connect compound adjectives; no spaces around them |
| Em-dashes | Use for conversational pauses; no spaces; never use multiple in one sentence |
| Semicolons | **Don't use** — too formal; replace with a period or conjunction |

---

### Formatting

**Bold**
- Use only for UI elements users select (buttons, field names, menu items)
- Don't bold headers or non-clickable labels
- Don't use bold for general emphasis

**Italics**
- Avoid — use bold instead

**Navigation paths**
- Write conversationally: "Go to Banking and select the Receipts tab"
- Don't use angle brackets (Settings > Banking)
- Reference icons by label with emoji: "Go to Settings ⚙"

---

### Word Choices

**Preferred terms:**

| Use | Instead of |
|---|---|
| select | click |
| turn on / turn off | enable / disable |
| clear | deselect |
| bank transfer (ACH) | ACH |
| issue | bug |
| compromised | hacked / breached / leaked |
| for example | e.g. |
| that is | i.e. |

**Avoid:**
- "functionality" → be specific about what it does
- "feature" → use the feature's actual name
- "allow/allows" → focus on the customer benefit
- "easy" or "effortless" → only say it if you can prove it
- "Learn more" as standalone link text
- Latin abbreviations (e.g., i.e., etc.)
- Directional cues (above, below, left, right) — bad for accessibility

---

### Anti-Racist Language

Intuit avoids terms with racist roots. Key replacements:

| Avoid | Use instead |
|---|---|
| blacklist | blocklist, deny list, excluded list |
| whitelist | allowlist |
| master / slave | primary / replica, leader / follower |
| grandfathered | legacy, existing |
| tribe | community, group |
| spirit animal | kindred spirit, inspiration |
| powwow | meeting, discussion |

- Don't use black, white, dark, or light as metaphors — only as literal visual descriptions
- Impact over intent: well-intentioned words can still cause harm

---

### UI & Product Writing

- Match UI capitalization exactly when referencing elements
- Use "screen" or "area" over "page" or "window"
- Avoid directional language (above, below, left, right) for accessibility
- Error messages: explain what happened and provide clear next steps
- Empty states: guide users on what to do next
- Mobile: condense and prioritize essential information

---

### Working Conventions

- Run the tone checker (`skills/tone-checker.md`) before finalizing any piece
- Log new learnings with the learn skill (`skills/learn.md`)
- Keep content organized and clearly labeled

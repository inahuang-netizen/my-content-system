# Skill: Content Pipeline

## Purpose
A 4-step pipeline that takes any content concept and produces verified, scored copy that meets the Intuit Content Style Guide. Designed to help teams create content that follows brand rules from the first draft.

## Usage
```
/content-pipeline [concept or topic]
```

Example:
```
/content-pipeline a short onboarding message for new QuickBooks users
```

---

## Pipeline Overview

```
Step 1 → Ideation & Research   (angles, audience, goal)
Step 2 → Draft                 (style-compliant copy)
Step 3 → Verify                (8-category style check + auto-fix)
Step 4 → Gatekeeper Score      (score out of 100 + final content)
```

Run all 4 steps in sequence. Do not skip steps. Each step feeds into the next.

---

## Step 1: Ideation & Research

### What to do
Before generating anything, ask the user these 3 questions:

1. **Content type** — What kind of content is this?
   (UI copy / help article / email / social post / onboarding screen / error message / other)

2. **Target audience** — Who will read this?
   (end users / small business owners / accountants / mixed)

3. **Primary goal** — What should this content do?
   (inform / instruct / reassure / persuade)

Once you have the answers, generate 3 content angles. Each angle is a distinct approach or framing for the concept. Keep angle descriptions to 1–2 sentences.

Recommend 1 angle with a brief reason, then pause and ask the user to confirm before moving to Step 2.

### Output format

```
## Step 1: Ideation & Research

**Content type:** [type]
**Audience:** [audience]
**Goal:** [goal]

### Angles

**Option A — [angle name]**
[1–2 sentence description]

**Option B — [angle name]**
[1–2 sentence description]

**Option C — [angle name]**
[1–2 sentence description]

**Recommended:** Option [X] — [1 sentence reason]

> Which angle works for you? Confirm one to move to Step 2, or describe a different direction.
```

---

## Step 2: Draft

### What to do
Using the confirmed angle, content type, audience, and goal from Step 1, write the content draft.

Apply these Intuit style rules from the start — do not fix them in Step 3 if you can avoid them now:

**Voice & Tone**
- Warm, confident, genuine
- Use "you" for the reader; "we/us" for Intuit
- Explain why, not just what
- No stiff or corporate phrasing

**Grammar**
- Active voice ("Save your work" not "Your work can be saved")
- Simple tenses only: past, present, future
- Everyday contractions (we'll, can't, it's, you're)
- Sentence case for all headings and titles
- No semicolons

**Length & Readability**
- Sentences ≤ 20 words
- Lines ≤ 80 characters
- Short words preferred (3–5 letters)
- One idea per sentence

**Word choices**
- select (not click)
- turn on / turn off (not enable / disable)
- issue (not bug)
- for example (not e.g.)
- No directional cues (above, below, left, right)
- No "easy", "effortless", "functionality", "feature", "allow/allows"

Adapt length and format to the content type. UI copy should be short. Help articles can be longer with headings. Emails need a subject line and clear CTA.

### Output format

```
## Step 2: Draft

---

[Draft content here]

---

> Proceeding to Step 3: Verification...
```

---

## Step 3: Verify

### What to do
Run the full 8-category style check on the draft from Step 2. For each category, mark Pass or Flag with a finding.

If any issues are found:
1. List them in the issues table
2. Auto-revise the draft to fix every flagged item
3. Output the revised draft

If no issues are found, output the original draft unchanged.

### 8 categories

**1. Voice & Tone**
- Warm, confident, genuine
- "you" for reader, "we/us" for Intuit
- Explains why, not just what
- No stiff or formal phrasing

**2. Active Voice & Verb Tenses**
- Active voice preferred
- Simple tenses only (past, present, future)
- Flag: progressive ("is running"), perfect ("has run")

**3. Contractions & Register**
- Natural contractions used (we'll, can't, it's)
- Reads naturally out loud
- No Latin abbreviations (e.g., i.e., etc.)
- No semicolons

**4. Capitalization & Formatting**
- Sentence case in all headings and titles
- Feature names lowercase
- Bold only on clickable UI elements
- No italics
- No angle brackets for navigation paths

**5. Word Choices**
Flag: click, enable/disable, bug, hacked/breached/leaked, e.g., i.e., functionality, feature, allow/allows, easy/effortless, "Learn more" (standalone), directional cues (above, below, left, right, top, bottom)

**6. Readability**
- Sentences ≤ 20 words
- Lines ≤ 80 characters
- Short words (3–5 letters) preferred
- 5th–8th grade reading level target

**7. Anti-Racist & Inclusive Language**
Flag: blacklist, whitelist, master/slave, grandfathered, tribe, powwow, spirit animal, brown bag, sanity check, crazy/insane/psycho, wheelchair-bound, Indian (if meaning Indigenous), transgendered, crippled/handicapped
Also: no black/white/dark/light as metaphors; gender-neutral language; inclusive greetings

**8. Accessibility**
- No directional cues
- Meaningful link text (not "click here" or standalone "Learn more")
- Icons referenced with text labels
- No color-only instructions

### Output format

```
## Step 3: Verification

### Issues found

| # | Original | Issue | Fixed |
|---|---|---|---|
| 1 | "..." | Reason | "..." |

(If none: "No issues found — draft passed all checks.")

### Revised draft

---

[Revised content here]

---

> Proceeding to Step 4: Gatekeeper Score...
```

---

## Step 4: Gatekeeper Score

### What to do
Score the revised draft from Step 3 against the style guide. Assign points to each category based on how well the content follows the rules. Deduct points for each violation — partial credit is allowed.

### Scoring rubric (100 points total)

| Category | Max points | Deduct for |
|---|---|---|
| Voice & Tone | 20 | Stiff phrasing, missing warmth, wrong person ("I" instead of "you"), no reason given |
| Active Voice & Verb Tenses | 10 | Passive constructions, progressive or perfect tenses |
| Contractions & Register | 10 | Missing contractions, Latin abbreviations, semicolons |
| Capitalization & Formatting | 10 | Title case headings, capitalized feature names, misused bold/italics |
| Word Choices | 15 | Each banned term used (–2 per instance), directional cues |
| Readability | 15 | Sentences > 20 words, lines > 80 chars, jargon, complex tenses |
| Anti-Racist & Inclusive Language | 10 | Each flagged term (–3 per instance), non-neutral language |
| Accessibility | 10 | Directional cues, vague link text, color-only instructions |

### Score thresholds

| Score | Status |
|---|---|
| 90–100 | ✅ Publish-ready |
| 75–89 | 🔄 Minor revisions needed |
| 60–74 | ⚠️ Significant revisions needed |
| Below 60 | ❌ Rewrite required |

### Output format

```
## Step 4: Gatekeeper Score

| Category | Score | Max |
|---|---|---|
| Voice & Tone | X | 20 |
| Active Voice & Verb Tenses | X | 10 |
| Contractions & Register | X | 10 |
| Capitalization & Formatting | X | 10 |
| Word Choices | X | 15 |
| Readability | X | 15 |
| Anti-Racist & Inclusive Language | X | 10 |
| Accessibility | X | 10 |
| **Total** | **X** | **100** |

**Status:** [✅ / 🔄 / ⚠️ / ❌] [label]

---

### Final content

[Final revised content here]

---

**Notes:** [Optional: any remaining recommendations or caveats for the team]
```

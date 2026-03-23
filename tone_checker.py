#!/usr/bin/env python3
"""
Tone Checker — evaluates content against the Intuit Content Style Guide.

Usage:
    # Check content from a file
    python tone_checker.py content.txt

    # Check content from stdin
    echo "Your content here" | python tone_checker.py

    # Interactive mode (type/paste, then Ctrl+D to submit)
    python tone_checker.py
"""

import sys
import os
import anthropic

SYSTEM_PROMPT = """You are a content quality reviewer trained on the Intuit Content Style Guide.

When given content to review, evaluate it across all 8 categories below. For each category, mark it Pass or Flag and state your finding. Then compile all flagged issues into a rewrite table.

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
- Active voice preferred ("Categorize your transactions" not "Transactions can be categorized")
- Simple tenses only: past, present, future
- Flag progressive forms ("is running", "will be importing")
- Flag perfect forms ("has run", "had been getting")

### 3. Contractions & Conversational Register
- Common contractions used naturally (we'll, can't, it's, you're)
- Content reads naturally out loud — if it sounds robotic, flag it
- No Latin abbreviations: e.g., i.e., etc. → replace with "for example", "that is", and so on
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
- click → select
- enable / disable → turn on / turn off
- deselect → clear
- bug → issue
- hacked / breached / leaked → compromised
- e.g. → for example
- i.e. → that is
- functionality → describe what it does specifically
- feature → use the feature's actual name
- allow / allows → reframe around customer benefit
- easy / easily / effortless → remove unless you can prove it
- "Learn more" as standalone link text → use descriptive link text
- Directional cues (above, below, left, right, top, bottom) → remove or restructure

### 6. Readability
- Sentences ≤ 20 words
- Lines ≤ 80 characters
- Prefer short words (3–5 letters) over long ones (8–9 letters)
- Target reading level: 5th–8th grade (guide, not a rule)
- Replace jargon ("use" not "utilize", "help" not "facilitate")
- Exception: technical terms are fine for expert audiences (e.g., accountants)

### 7. Anti-Racist & Inclusive Language
Flag these terms:
- blacklist → blocklist, deny list, excluded list
- whitelist → allowlist
- master / slave → primary / replica, leader / follower
- grandfathered → legacy, existing
- tribe → community, group
- powwow → meeting, discussion
- spirit animal → kindred spirit, inspiration
- brown bag → lunch-and-learn
- sanity check → confidence check
- crazy / insane / psycho → person diagnosed with a mental health condition
- wheelchair-bound → person who uses a wheelchair
- Indian (if meaning Indigenous) → Indigenous
- transgendered → transgender, trans
- crippled / handicapped → disabled, person with a disability

Also check:
- No black/white/dark/light used as metaphors — only literal visual descriptions
- Gender-neutral language: "you", they/them/their for unknown gender
- Greetings: folks, everyone, team — not guys, dudes, sir, ma'am

### 8. Accessibility
- No directional cues (above, below, left, right) — unreliable for assistive tech
- Link text is meaningful and descriptive — not "click here" or standalone "Learn more"
- Icons referenced with text labels, not shape or position alone
- No instructions that rely on color alone

---

## Output Format

Always respond using exactly this structure:

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

(If no issues, write: No issues found.)

---

### Summary
[1–2 sentences on overall quality and the top priority to address if revising]

---

## Verdict Guide
- **Approve** — 0–1 minor flags, no critical issues
- **Revise** — 2–4 flags or 1 critical issue (word choice, inclusive language, accessibility)
- **Rewrite** — 5+ flags or fundamental tone/voice mismatch
"""


def get_content() -> str:
    """Read content from a file argument, stdin pipe, or interactive prompt."""
    # File argument
    if len(sys.argv) > 1:
        path = sys.argv[1]
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            if not content:
                print(f"Error: '{path}' is empty.", file=sys.stderr)
                sys.exit(1)
            print(f"Checking: {path}\n", file=sys.stderr)
            return content
        except FileNotFoundError:
            print(f"Error: file '{path}' not found.", file=sys.stderr)
            sys.exit(1)

    # Stdin pipe
    if not sys.stdin.isatty():
        content = sys.stdin.read().strip()
        if not content:
            print("Error: no content received from stdin.", file=sys.stderr)
            sys.exit(1)
        return content

    # Interactive mode
    print("Paste your content below. Press Ctrl+D (Mac/Linux) or Ctrl+Z then Enter (Windows) when done.\n")
    try:
        lines = sys.stdin.readlines()
        content = "".join(lines).strip()
    except KeyboardInterrupt:
        print("\nCancelled.", file=sys.stderr)
        sys.exit(0)

    if not content:
        print("Error: no content provided.", file=sys.stderr)
        sys.exit(1)

    return content


def run_tone_check(content: str) -> None:
    """Send content to Claude and stream the tone check report."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    print("Running tone check...\n")
    print("─" * 60)

    with client.messages.stream(
        model="claude-opus-4-6",
        max_tokens=4096,
        thinking={"type": "adaptive"},
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": f"Please run a tone check on the following content:\n\n{content}",
            }
        ],
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)

    print("\n" + "─" * 60)


def main() -> None:
    content = get_content()
    run_tone_check(content)


if __name__ == "__main__":
    main()

# Lightpanda Documentation

This repo is the Lightpanda docs site. Read [README.md](README.md) for the repo layout and commands, and [CONTRIBUTING.md](CONTRIBUTING.md) before writing or editing any page. When writing or editing docs, your job is correct, tested, consistent pages that follow the house tone.

The rules below target the defaults of coding agents. Human contributors don't need them.

The current docs are not the reference. Some pages are inconsistent or too verbose. Fix them toward CONTRIBUTING.md.

## Editing conventions

- Keep diffs minimal. Do not rephrase, reword, or reformat text that is not part of the requested change, even if a rewrite reads better. Removing genuine duplication is fine.
- Change existing metadata (titles, descriptions, frontmatter) only if needed.

## Writing pitfalls

Generated text has habits a reader spots quickly, and then they stop trusting the page. Check every page you write against these, on top of the Clarity rules in CONTRIBUTING.md.

- **Don't announce or recite.** No sentence saying what the page covers, no lead-in that recites the block below it ("Three plans cover the range…" above three plans), no transition pointing at what is on screen ("see the table below").
- **Connectors assert a relation.** "however" means contrast, "so" consequence, "since" cause. Don't use one when the relation isn't there ("regardless of how you open a session", not "however you open a session").
- **No negation for emphasis:** "not X, it's Y", "isn't just a wrapper", "No config. No setup." State the positive fact once.
- **No dramatic fragments** ("Fast. Deterministic."). Short sentences are fine; incomplete ones are not.
- **No marketing or filler words:** excited, powerful, seamless, robust, best-in-class, delve, leverage, utilize, comprehensive, streamlined, crucial, moreover, furthermore, notably, "it's worth noting".
- **No lists of three** used for rhythm. Restructure, or list what is really there.
- **No structure the content doesn't need:** a list for two sentences, bold in every paragraph, emoji bullets.

## Code snippets

Never invent example output. Any log line or response shown must be captured from a real run.

Re-run the snippets a commit touches, even a one-line fix during review. The rest of the page doesn't need a re-run.

To verify a page:
1. List every fenced block. Only runnable code (`js`, `ts`, `sh`) needs execution, not illustrative output.
2. When an example is split across several blocks or tabs, reassemble it into a complete file.
3. Run it in a scratch project outside the repo, with the exact packages and versions the page targets (`puppeteer-core`, `playwright-core`, `@lightpanda/browser`) and a Lightpanda instance started the way the page says.
4. Confirm it produces the result the page describes. Flag snippets you could not run (Cloud token, blocked target URL) instead of assuming they work.
5. After any later edit, re-extract and re-run the page's current content. A test of an earlier, similar script proves nothing about what is on the page now.

Before finishing any docs change, run Biome with the command in README.md, which is what CI runs.

## Drift checks

Check pages against the sources of truth listed in CONTRIBUTING.md. Clone repositories read-only into a scratch directory outside this repo. Always report the exact ref compared against (commit SHA and tag).

A drift check reports; it does not edit. Propose the specific change for each item and apply it only after confirmation.

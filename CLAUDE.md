# Lightpanda Documentation

This repo is the Lightpanda docs site. It's a [Nextra 4](https://nextra.site) + Next.js 15 app. Content is MDX under `src/content/`, and the sidebar is driven by `_meta.ts` files. When writing or editing docs, your job is correct, tested, consistent pages that follow the house tone.

## Tone and structure

Follow `Tone - Documentation.md` at the repo root. It is the source of truth for voice, page types, structure, and the quality checklist. Read it before writing or editing any page.

Key rules, short version:
- Developer-friendly, straight-talking, short sentences. Get to the point.
- No em dashes. No idioms. No "simply" or "just".
- Every page is exactly one type: tutorial, how-to, reference, or explanation. Do not mix.
- Consistency matters most. Pages of the same type should share the same shape. Copy the best existing page of that type instead of inventing a new structure.
- The current docs are not the reference. Some pages are inconsistent or too verbose. Fix them toward the guide.

## Where things live

- `src/content/**/*.mdx` — the doc pages.
- `src/content/**/_meta.ts` — sidebar order and titles for each folder. A new page is invisible until it's registered here.
- `src/components/lightpanda/` — site components, including the `Docs*JsonLd` structured-data components.
- `scripts/generate-llms.mjs` — generates llms.txt at build time (runs on `prebuild`).
- Diagrams and other images are not stored in this repo. Upload to `https://cdn.lightpanda.io/website/assets/images/docs/<filename>`, then reference with standard markdown image syntax: `![alt](url)`.

Content sections and their page type:
- `index.mdx` (Introduction) and `quickstart.mdx` — Introduction / tutorial.
- `run-locally/`, `run-on-lightpanda-cloud/`, `usage/`, `guides/` — how-to.
- CLI / API reference pages — reference.
- Core concepts pages (What is Lightpanda, Architecture, local vs cloud, Benchmarks) — explanation.

## MDX conventions

- Frontmatter is required: `title` (title case) and `description` (one sentence, includes the primary keyword, ~150-160 characters).
- Never use an unquoted colon (`: `) inside a frontmatter `description` — plain YAML scalars break on it. Reword the sentence to avoid the colon
- Import Nextra components at the top: `import { Tabs, Callout, FileTree } from 'nextra/components'`.
- Use `<Tabs>` for parallel paths (npm/yarn/pnpm, Puppeteer/Playwright). Keep the tab set consistent across a page.
- Use `<Callout type="info">` for context and `<Callout type="warning">` for things that break if ignored.
- Use `<FileTree>` to show expected directory structure.
- Code blocks specify the language and `copy`: ` ```sh copy `, ` ```js copy `.
- Register every new page in the nearest `_meta.ts`, in the right order.

## Code snippets

Every code example must be complete, copy-paste ready, and tested against the version of Lightpanda, Puppeteer, or Playwright the page targets. Use `puppeteer-core` / `playwright-core` (they don't download Chromium). If you can't verify a snippet runs, don't include it. See the `verify-code-snippets` skill.

## Commands

- `npm run dev` — local dev server on port 1414.
- `npm run typecheck` — TypeScript check (`tsc --noEmit`).
- `npm run lint` — Next lint + Biome.
- `npm run lint-apply` — auto-fix lint and Biome issues.
- `npm run build` — production build (runs `generate-llms` first, pagefind index after).

Before finishing any docs change, run `npm run typecheck` and `npm run lint`, and confirm the page renders in `npm run dev`.

## Staying in sync with the codebase and demo

The docs describe two external sources of truth. Keep pages checked against them. Both repos are public and clonable read-only from the sandbox.

- Codebase: `github.com/lightpanda-io/browser` (Zig). Authoritative for CLI flags, commands, CDP support, and the supported Web APIs. The tool/command list lives in `src/browser/tools.zig`. When checking `run-locally/commands/*`, `usage/*`, and the CLI/API reference, diff them against the code, not against other docs.
- Examples: `github.com/lightpanda-io/demo`. Authoritative for runnable examples. Doc snippets should match the demo. Treat the demo as the source when they disagree.
- Explanation pages too: Core concepts and architecture pages make structural claims (ownership, lifetimes, what is real vs. stubbed). Verify these against the source, not only the CLI surface. Known gotchas: `Page.captureScreenshot` returns a placeholder image, and the arena pool is owned by `App` (shared), not per-Browser.

Version policy. The docs mostly track the nightly build, so `main` is the default ref (the `nightly` tag points at the tip of `main`). But the docs do not declare a single target version and some hardcoded versions go stale (e.g. `one-liner.mdx` once pinned `v0.2.5` while releases had moved to `0.3.x`; note the tag scheme changed from `vX.Y.Z` to `X.Y.Z` at 0.3). So each check must: compare against `main` by default, fetch and check any version a page pins, and separately flag every hardcoded version string that is behind the latest release. Always report the exact ref (commit SHA and tag) compared against.

The `check-docs-vs-code` and `sync-demo-examples` skills automate this. Both produce a drift report and propose edits, never auto-edit. A scheduled weekly run can post the report for review.

## Keeping this file current

When the user states a new documentation guideline during a conversation (a tone rule, a structure decision, a naming convention, a component pattern, or anything that should apply to future pages), offer to record it. Ask for confirmation first, for example: "Want me to add this to CLAUDE.md?" Only write after they confirm.

- Put voice, page-type, structure, and checklist rules in `Tone - Documentation.md`.
- Put repo mechanics, commands, file locations, and skill notes here in CLAUDE.md.
- Match the existing wording and section. Keep it short. Do not duplicate a rule that already exists.
- Never edit these files silently. Always confirm before writing.

## Skills

- `add-guide` — scaffold a new how-to guide page with correct frontmatter, structure, and `_meta.ts` entry.
- `verify-code-snippets` — extract and run the code examples in a page to confirm they work.
- `check-docs-vs-code` — clone the browser repo, extract the interface, and report where docs drift from the code (including stale version strings).
- `sync-demo-examples` — clone the demo repo and report where doc snippets drift from the canonical examples.

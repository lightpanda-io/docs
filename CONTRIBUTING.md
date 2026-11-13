# Contributing

How to write a Lightpanda docs page. The repo layout and commands are in [README.md](README.md).

## Page Types

Every page except the Introduction landing page is one of these. Do not mix types on one page.

- Tutorial (learning-oriented): `quickstarts/`, `run-locally/`, `run-on-lightpanda-cloud/`, `usage/`. A guided path a newcomer follows start to finish, and it works. Optimize for confidence.
- How-to guide (task-oriented): `guides/`. Steps to accomplish one real goal. Optimize for getting the job done.
- Reference (information-oriented): `reference/`. Dry, complete, accurate. Optimize for lookup. No narrative, no opinions. Present parameters/fields as a table (Parameter/Type/Required/Default/Description), except CLI flags, which mirror the binary's own `--help` output in a console block.
- Explanation (understanding-oriented): `core-concepts/`. Background and rationale. Optimize for understanding. Link to these instead of inlining long versions elsewhere.

Pages of the same type share the same shape. Copy the best existing page of that type instead of inventing a new structure.

## Page Structure

- **Title:** under 60 characters when possible, primary keyword near the beginning.
- **Opening:** a short TLDR that explains the subject. Do not describe the page ("This page covers...") or tease its sections.
- **Sections:** few H2s, each with real content, grouped around what the reader needs, not around the source tree. One or two sentences do not make a section: fold them into the section that owns the topic. For short subsections, prefer a bold-led paragraph to an H3.
- **Name the question each section answers,** in one sentence. If you cannot, delete the section. An inventory of what a product offers answers nothing, and it survives review because every sentence in it is correct.
- **Diagrams, tables, code blocks:** one lead-in sentence saying what the reader should take from it, not what it lists. A heading or a bold-led paragraph already counts as a lead-in.
- **Examples:** complete and runnable, so the reader can copy-paste them (a full `curl` command with headers, not a payload fragment).
- **Parallel views:** when a page shows the same system as a list, a diagram, and a table, use the same names and the same order in each.
- **Say each thing once.** When two pages could host it, it belongs on the page the reader is on when the question arises.
- **Web interfaces:** document only what the screen does not show: a hidden default, a silent behavior (edits saved without a Save button), a masked value, an unexplained error, how long data is kept. Never list a screen's fields or columns.

## MDX conventions

- Frontmatter is required: `title` (title case) and `description` (one sentence stating the outcome, includes the primary keyword, ~150-160 characters).
- Never use an unquoted colon (`: `) inside a frontmatter `description`. Plain YAML scalars break on it. Reword the sentence to avoid the colon.
- One H1 per page, matching the frontmatter title and including the primary keyword.
- Import Nextra components at the top, only if needed: `import { Tabs, Callout, FileTree } from 'nextra/components'`.
- Use `<Tabs items={[...]}>` with `<Tabs.Tab>` for parallel paths (npm/yarn/pnpm, Puppeteer/Playwright). Keep the tab set consistent across a page.
- Use `<Callout type="info">` for context and `<Callout type="warning">` for things that break if ignored.
- Use `<FileTree>` to show expected directory structure.
- Code blocks specify the language. Add `copy` to blocks the reader runs or pastes (` ```sh copy `, ` ```js copy `), not to output.
- Register every new page in the nearest `_meta.ts`, in the right order.
- When a page is moved, renamed, split, or merged, update `redirects.mjs`: add, retarget, or repoint old paths to the new page or anchor, including redirects that predate the change and already pointed at the now-stale path.

## Code snippets

Every code example must be tested against the version of Lightpanda, Puppeteer, or Playwright the page targets. Use `puppeteer-core` / `playwright-core` (they don't download Chromium). If you can't verify a snippet runs, don't include it.

Python snippets use snake_case (`wait_for_selector`, not `waitForSelector`) to match each library's real API. Exception: JSON/wire-protocol dictionary keys (WebDriver BiDi commands, WebDriver capabilities like `webSocketUrl`) stay camelCase, since that's what the spec defines, not a Python identifier.

## Links

- Link text names the destination: "see [installation](/run-locally/installation/one-liner)", `[proxies page]`, never "click here" or `[console]`. Link the deepest anchor that answers the question, never the site root.
- Turn a phrase already in the prose into the link. No standalone line or blockquote that only holds a link, and no "See also" or "References" section. If no sentence naturally carries a link, the page does not need it.
- Guide or usage page to reference: link inline, at the point of need. When a new sentence is needed, write: "Find … in the [X reference](/reference/…)."
- Reference page to how-to: one sentence at the top, e.g. "See [how to run the CDP server](/run-locally/commands#serve) for practical documentation." Do not say "guide" in it (it collides with the Guides section), and do not open a reference page with the word "Reference".
- Link primary sources (GitHub, specs, other docs pages), not blog posts.

## Accuracy

- Verify every factual claim against the source before writing it. A sentence that sounds obviously true about your own product is exactly the one to check.
- Prefer a vaguer sentence you can defend to a precise one you inferred.
- Document the sharp edges: where a feature fails, a default surprises, or behavior looks like a bug but isn't.

## Sources of truth

The docs describe external sources of truth. Check pages against them, not against other docs.

- Codebase: [lightpanda-io/browser](https://github.com/lightpanda-io/browser) (Zig). Authoritative for CLI flags, commands, CDP support, and the supported Web APIs.
- Examples: [lightpanda-io/demo](https://github.com/lightpanda-io/demo). Authoritative for runnable examples. Doc snippets should match the demo. Treat the demo as the source when they disagree.
- Python SDK: [lightpanda-io/lightpanda-python](https://github.com/lightpanda-io/lightpanda-python).
- Node.js package `@lightpanda/browser`: [lightpanda-io/node-packages](https://github.com/lightpanda-io/node-packages).
- Agent skill (`quickstarts/skill.mdx`): [lightpanda-io/agent-skill](https://github.com/lightpanda-io/agent-skill).
- Benchmarks (`core-concepts/benchmarks.mdx`): [lightpanda-io/agent-benchmarks](https://github.com/lightpanda-io/agent-benchmarks) and [lightpanda-io/demo](https://github.com/lightpanda-io/demo).
- Docker image (`run-locally/installation/docker.mdx`): [lightpanda/browser](https://hub.docker.com/r/lightpanda/browser) on Docker Hub.

Which source decides which page:

| Pages | Source of truth |
|---|---|
| `reference/cli/*`, `run-locally/commands.mdx` | `src/help.zon` for wording, `src/Config.zig` for whether a flag exists |
| `reference/mcp-tools.mdx`, `usage/mcp.mdx` | `src/browser/tools.zig` (`Tool.definition()`: `.description` and `.input_schema`), `src/mcp/tools.zig` (`extra_tools`) |
| `reference/pandascript.mdx`, `usage/pandascript.mdx` | `src/script/Runtime.zig`, `src/script/Schema.zig`, `src/browser/tools.zig` |
| `usage/agent.mdx`, the agent sections of `reference/cli/agent.mdx` | `src/agent/` (REPL commands in `src/agent/SlashCommand.zig`) |
| `usage/cdp/*`, `usage/bidi/*` | `src/server/cdp/domains/*.zig`, `src/server/bidi/*.zig`, routes in `src/server/http.zig` |
| `guides/markdown-axtree.mdx` | `src/server/cdp/domains/lp.zig` for the `LP` domain, `src/help.zon` for the CLI dumps |
| `reference/browser-tools.mdx`, the tables imported from `src/generated/` | Generated from the browser release. Fix the browser, not the page |
| `reference/python.mdx` | Generated by `scripts/generate-python-reference.py`. Fix the docstring in `lightpanda-python`, not the page |
| `guides/use-python.mdx` | `lightpanda-python`, cross-checked against a live `pip install lightpanda` |
| `guides/interact-with-a-webpage.mdx`, `guides/retrieve-an-html-webpage.mdx`, `guides/use-stagehand.mdx` | `node-packages` (`packages/browser`) and the matching examples in `demo` (`integration/`, `stagehand/`) |
| `quickstarts/*`, the snippets in `usage/cdp/*` | `demo`, and the package versions pinned in `demo/package.json` |
| `run-locally/installation/build-from-sources.mdx` | `build.zig.zon` (Zig version), `Makefile`, `flake.nix`, the build section of the browser `README.md` |
| `run-locally/installation/system-requirements.mdx` | The release binaries: glibc from `strings <binary> \| grep -o 'GLIBC_[0-9.]*'`, macOS from `vtool -show-build <binary>`. The CI runners are in `.github/workflows/release.yml` |
| `run-locally/installation/one-liner.mdx`, the install commands in the quickstarts | `install.sh` in [lightpanda-io/pkg](https://github.com/lightpanda-io/pkg) |
| `run-locally/installation/package-managers.mdx`, `run-locally/installation/nightly-builds.mdx` | The formulas in [lightpanda-io/homebrew-browser](https://github.com/lightpanda-io/homebrew-browser), the AUR packages, `.github/workflows/package-debian.yml` and the GitHub releases |
| The telemetry sections of the installation pages | `src/telemetry/` |
| `guides/use-hermes.mdx` | The third-party agent-browser changelog |

Read each source at the ref the page describes: the latest release tag for the browser, the published version for the Python and npm packages, `main` for repositories without releases (`demo`, `agent-benchmarks`). The Lightpanda Cloud pages are checked against private repositories, which are not listed here.

Known traps:
- Prose can lie, code decides. `help.zon` is hand-written: a flag it prints but `Config.zig` does not parse is not real, and a value `Config.zig` implements but `help.zon` omits is real. Tool `.description` strings and `src/script/skill.zig` go stale too: read the `exec<Name>` function or `Runtime.zig` to confirm behavior and return values.
- Diff MCP tool arguments against `input_schema` (`properties`, `required`), not only against `.description`.
- Check PandaScript claims in `src/script/`, not in the MCP tool code: the script runtime has its own `goto`, argument order and defaults.
- `lightpanda-python`'s `main` can be ahead of the published PyPI release. Document what `pip install lightpanda` gives today, and verify return types with a live call, not from docstrings.
- Compare against source, not against a locally built binary's `--help`, which can be stale.
- Explanation pages (Core concepts, Architecture) make structural claims: ownership, lifetimes, what is real versus stubbed. Verify them against the source.

Version policy. The docs describe the latest release, so compare against its tag by default, not `main` (`nightly` tracks `main`; tags are `X.Y.Z` since 0.3, `vX.Y.Z` before). Also check any version a page pins, and flag every hardcoded version behind the latest release.

## Tone

- Be direct and precise: short sentences, active voice, second person ("you").
- Avoid idioms, slang, buzzwords, exclamation marks, em dashes, and "simply" or "just" (they minimize what the reader may be stuck on).
- Use real names: exact commands, file names, and flags. Do not paraphrase the interface.
- Write for a competent developer who does not know browser internals or automation. Explain each term where it first appears, in one short sentence, then move on.
- Keep it short enough to skim without hitting filler.

## Clarity

- **Don't mix things.** One idea per sentence, one claim per paragraph. A paragraph that bundles unrelated facts (a method's return type, its errors, and one argument's encoding) hides each one from a reader looking for one of them. Split by claim and put each fact next to what it describes.
- **One name per thing.** A tool called `goto` stays `goto` on the whole page. Don't rotate synonyms.
- **Pronouns and references:** a pronoun has exactly one candidate in its sentence, and "this" or "that last point" always gets replaced by the thing's name.
- **Check absolute claims** ("never", "always", "only") against the rest of the page.
- **Plain words.** Pick the verb for what the reader does ("read", not "review"), write "is" instead of "serves as" or "stands as", and cut adjectives that imply a contrast the page doesn't make ("the main API" when there is one).
- **Behavior, not reassurance:** "Returns `null` if the key is missing", not "gracefully handles a missing key".

## Checklist

- Read the whole page as a first-time reader. Could you follow it without getting stuck?
- Every example ran. Every type, default, and behavior was checked in the source, not copied from older prose.
- No em dashes, "simply", or "just".

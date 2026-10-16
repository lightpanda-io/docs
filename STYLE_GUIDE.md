# Style Guide

How to write a Lightpanda docs page. Repo mechanics (MDX conventions, commands, sources of truth) are in [AGENTS.md](AGENTS.md).

## Tone

- Write for a competent developer who does not know browser internals or automation. Explain each term where it first appears, in one short sentence, then move on.
- Be direct and precise: short sentences, active voice, second person ("you").
- Use real names: exact commands, file names, and flags. Do not paraphrase the interface.
- Keep it short enough to skim without hitting filler.
- Avoid idioms, slang, buzzwords, exclamation marks, em dashes, and "simply" or "just" (they minimize what the reader may be stuck on).

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
- **Diagrams, tables, code blocks:** one lead-in sentence saying what the reader should take from it, not what it lists. A heading or a bold-led paragraph already counts as a lead-in.
- **Examples:** complete and runnable, so the reader can copy-paste them (a full `curl` command with headers, not a payload fragment).
- **Parallel views:** when a page shows the same system as a list, a diagram, and a table, use the same names and the same order in each.
- **Say each thing once.** When two pages could host it, it belongs on the page the reader is on when the question arises.
- **Web interfaces:** document only what the screen does not show: a hidden default, a silent behavior (edits saved without a Save button), a masked value, an unexplained error, how long data is kept. Never list a screen's fields or columns.

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

## Checklist

- Read the whole page as a first-time reader. Could you follow it without getting stuck?
- Every example ran. Every type, default, and behavior was checked in the source, not copied from older prose.
- No em dashes, "simply", or "just".

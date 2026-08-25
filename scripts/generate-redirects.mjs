// Emits static redirect stub pages for `output: export`.
//
// next.config.mjs's redirects() only runs on a Node server. For the static
// GitHub Pages build we materialize each redirect as a small HTML file that
// redirects client-side (meta refresh + JS) and tells crawlers the canonical
// target. Run from the docs postbuild, after the export has produced ./out.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { basePath, redirects } from '../redirects.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const outDir = join(root, 'out')

// A target that already carries its own fragment (e.g. `#serve`) must not
// also inherit the visitor's `location.hash`, or the two concatenate into an
// invalid double-fragment URL.
const stub = (href) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${href}" />
    <link rel="canonical" href="${href}" />
    <script>location.replace(${JSON.stringify(href)}${href.includes('#') ? '' : ' + location.hash'})</script>
  </head>
  <body>
    <p>Redirecting to <a href="${href}">${href}</a>…</p>
  </body>
</html>
`

let count = 0
for (const [from, rawTo] of Object.entries(redirects)) {
  const to = rawTo.trim()
  // Destination is basePath-relative, just like next.config redirects.
  const href = `${basePath}${to}`
  // `from` is also basePath-relative; ./out is copied to /docs on deploy, so
  // the stub lives at out/<from>/index.html.
  const file = join(outDir, from.replace(/^\/+/, ''), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, stub(href))
  count++
}

console.log(`Generated ${count} redirect stub page(s) in ${outDir}`)

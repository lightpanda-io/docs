#!/usr/bin/env node
/**
 * generate-llms.mjs — Build-time script to generate llms.txt and llms-full.txt
 * for the Lightpanda docs site.
 *
 * Scans all MDX docs pages, extracts frontmatter and content, and produces:
 *   public/llms.txt      — concise summary with page inventory
 *   public/llms-full.txt — full content of all docs pages concatenated
 *
 * Usage: node scripts/generate-llms.mjs
 * Add to package.json: "prebuild": "node scripts/generate-llms.mjs"
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, relative, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = join(__dirname, '..', 'src', 'content')
const PUBLIC_DIR = join(__dirname, '..', 'public')
const SITE_URL = 'https://lightpanda.io'

/**
 * Parse YAML-like frontmatter from MDX content.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) {
    // Try to extract title from first heading
    const headingMatch = content.match(/^#+\s+(.+)$/m)
    return {
      frontmatter: headingMatch ? { title: headingMatch[1] } : {},
      body: content,
    }
  }

  const raw = match[1]
  const frontmatter = {}

  for (const line of raw.split('\n')) {
    const kvMatch = line.match(/^(\w+):\s*(.+)$/)
    if (!kvMatch) continue
    const [, key, value] = kvMatch
    frontmatter[key] = value.replace(/^["']|["']$/g, '')
  }

  const body = content.slice(match[0].length).trim()

  // Fallback: extract title from first heading if not in frontmatter
  if (!frontmatter.title) {
    const headingMatch = body.match(/^#+\s+(.+)$/m)
    if (headingMatch) frontmatter.title = headingMatch[1]
  }

  return { frontmatter, body }
}

/**
 * Strip MDX-specific syntax (imports, JSX components) from body text.
 */
function stripMdx(body) {
  return body
    .split('\n')
    .filter((line) => !line.startsWith('import '))
    .filter((line) => !line.match(/^<[A-Z]/))
    .filter((line) => !line.match(/^\s*\/>/))
    .filter((line) => !line.match(/^\s+\{ name:/)) // HowToJsonLd step props
    .filter((line) => !line.match(/^\s+steps=\{/))
    .filter((line) => !line.match(/^\s+\]\}/))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Recursively find all .mdx files in a directory.
 */
async function findMdxFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findMdxFiles(fullPath)))
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

// Categorize docs pages by section
const SECTIONS = {
  quickstart: 'Quickstart',
  'open-source': 'Open Source',
  'cloud-offer': 'Cloud',
}

function getSection(relPath) {
  for (const [prefix, label] of Object.entries(SECTIONS)) {
    if (relPath.startsWith(prefix)) return label
  }
  return 'Overview'
}

async function main() {
  const mdxFiles = await findMdxFiles(CONTENT_DIR)
  const pages = []

  for (const file of mdxFiles) {
    const raw = await readFile(file, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(raw)
    const relPath = relative(CONTENT_DIR, file).replace(/\.mdx$/, '').replace(/\/index$/, '')
    const urlPath = relPath === 'index' ? '' : relPath

    pages.push({
      path: urlPath,
      title: frontmatter.title || basename(file, '.mdx'),
      description: frontmatter.description || '',
      section: getSection(relPath),
      body,
    })
  }

  // Sort: Overview first, then by section, then alphabetically
  const sectionOrder = ['Overview', 'Quickstart', 'Open Source', 'Cloud']
  pages.sort((a, b) => {
    const sa = sectionOrder.indexOf(a.section)
    const sb = sectionOrder.indexOf(b.section)
    if (sa !== sb) return sa - sb
    return a.path.localeCompare(b.path)
  })

  // Group by section
  const grouped = {}
  for (const page of pages) {
    if (!grouped[page.section]) grouped[page.section] = []
    grouped[page.section].push(page)
  }

  // ─── llms.txt ───
  const llmsTxt = `# Lightpanda Documentation

> Official documentation for Lightpanda headless browser — installation, quickstart guides, API reference, and cloud deployment.

## About Lightpanda

Lightpanda is a headless browser engine built from scratch in Zig for web automation, web scraping, and AI agents. It delivers 10× faster execution and 10× less memory than Chrome headless.

- [Website](${SITE_URL})
- [Blog](${SITE_URL}/blog)
- [GitHub](https://github.com/lightpanda-io/browser)
- [Discord](https://discord.gg/K63XeymfB5)

## Documentation Pages (${pages.length} pages)

${Object.entries(grouped)
  .map(
    ([section, sectionPages]) => `### ${section}

${sectionPages.map((p) => `- [${p.title}](${SITE_URL}/docs/${p.path})${p.description ? ` — ${p.description}` : ''}`).join('\n')}`
  )
  .join('\n\n')}
`

  // ─── llms-full.txt ───
  const llmsFullTxt = `# Lightpanda Documentation — Full Content

> This file contains the full text of all ${pages.length} Lightpanda docs pages for LLM context.
> Generated at build time. Last updated: ${new Date().toISOString().split('T')[0]}

${pages
  .map(
    (p) => `---

## ${p.title}

**URL:** ${SITE_URL}/docs/${p.path}
**Section:** ${p.section}
${p.description ? `**Description:** ${p.description}` : ''}

${stripMdx(p.body)}`
  )
  .join('\n\n')}
`

  await writeFile(join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf-8')
  await writeFile(join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf-8')

  console.log(`✓ Generated llms.txt (${pages.length} docs pages listed)`)
  console.log(`✓ Generated llms-full.txt (${pages.length} pages, full content)`)
}

main().catch((err) => {
  console.error('Failed to generate llms files:', err)
  process.exit(1)
})

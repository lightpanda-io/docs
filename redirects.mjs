// Single source of truth for docs redirects.
//
// `redirects()` in next.config.mjs only runs on a Node server (next dev / next
// start). With `output: 'export'` the redirects are dropped from the build and
// GitHub Pages has no way to serve them, so scripts/generate-redirects.mjs reads
// this same map at postbuild time and emits static meta-refresh stub pages.
//
// Paths are relative to basePath; Next prepends it automatically for the Node
// redirects, and the static generator prepends it explicitly.
export const basePath = '/docs'

export const redirects = {
  '/python': '/reference/python-api',
  '/reference/python': '/reference/python-api',
  '/quickstart/installation-and-setup': '/quickstart',
  '/quickstart/your-first-test': '/quickstart',
  '/quickstart/build-your-first-extraction-script': '/quickstart',
  '/quickstart/go-to-production-with-lightpanda-cloud': '/quickstart',
  '/open-source/installation': '/run-locally/installation/one-liner',
  '/open-source/usage': '/run-locally/commands#serve',
  '/open-source/systems-requirements': '/run-locally/installation/system-requirements',
  '/open-source/guides/build-from-sources': '/run-locally/installation/build-from-sources',
  '/open-source/guides/configure-a-proxy': '/guides/configure-a-proxy',
  '/run-locally/configure-a-proxy': '/guides/configure-a-proxy',
  '/open-source/guides/markdown-axtree': '/guides/markdown-axtree',
  '/open-source/guides/use-hermes': '/guides/use-hermes',
  '/open-source/guides/use-stagehand': '/guides/use-stagehand',
  '/open-source/guides/mcp-server': '/usage/mcp',
  '/cloud-offer/getting-started': '/run-on-lightpanda-cloud/getting-started',
  '/cloud-offer/tools/cdp': '/usage/cdp/puppeteer',
  '/cloud-offer/tools/mcp': '/usage/mcp',
  '/cloud-offer/tools/api': '/usage/api',
  '/run-locally/commands/fetch': '/run-locally/commands#fetch',
  '/run-locally/commands/serve': '/run-locally/commands#serve',
  '/run-locally/commands/mcp': '/run-locally/commands#mcp',
  '/run-locally/commands/agent': '/run-locally/commands#agent',
}

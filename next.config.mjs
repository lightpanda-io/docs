import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
  basePath: '/docs',
  output: 'export',
  images: { unoptimized: true },
  redirects: () =>
    Object.entries({
      '/quickstart/installation-and-setup': '/quickstart',
      '/quickstart/your-first-test': '/quickstart',
      '/quickstart/build-your-first-extraction-script': '/quickstart',
      '/quickstart/go-to-production-with-lightpanda-cloud': '/quickstart',
      '/open-source/installation': '/run-locally/installation/one-liner ',
      '/open-source/usage': '/run-locally/commands/serve',
      '/open-source/systems-requirements': '/run-locally/installation/system-requirements',
      '/open-source/guides/build-from-sources': '/run-locally/installation/build-from-sources',
      '/open-source/guides/configure-a-proxy': '/run-locally/configure-a-proxy',
      '/open-source/guides/markdown-axtree': '/guides/markdown-axtree',
      '/open-source/guides/use-hermes': '/guides/use-hermes',
      '/open-source/guides/use-stagehand': '/guides/use-stagehand',
      '/open-source/guides/mcp-server': '/usage/mcp',
      '/cloud-offer/getting-started': '/run-on-lightpanda-cloud/getting-started',
      '/cloud-offer/tools/cdp': '/usage/cdp/puppeteer',
      '/cloud-offer/tools/mcp': '/usage/mcp',
      '/cloud-offer/tools/api': '/usage/api',
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
})

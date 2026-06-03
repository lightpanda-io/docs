import nextra from 'nextra'
import { basePath, redirects } from './redirects.mjs'

const withNextra = nextra({})

export default withNextra({
  basePath,
  output: 'export',
  images: { unoptimized: true },
  // Note: redirects() is honored only by the Node server (next dev / next
  // start). With `output: 'export'` Next drops them, so the same `redirects`
  // map is turned into static stub pages by scripts/generate-redirects.mjs.
  redirects: () =>
    Object.entries(redirects).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
})

import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
  basePath: '/docs',
  output: 'export',
  images: { unoptimized: true },
})

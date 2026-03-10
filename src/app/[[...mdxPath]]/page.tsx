import { siteDetails } from '@lightpanda/common/data/siteDetails'
import type { Metadata } from 'next'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { DocsAutoJsonLd } from '@/components/lightpanda/DocsAutoJsonLd'

type PageProps = {
  params: Promise<{
    mdxPath: string[]
  }>
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)

  const title = `${metadata.title} - Documentation | ${siteDetails.siteName}`
  const description = metadata.description ?? siteDetails.metadata.description
  const url = `${siteDetails.siteUrl}/docs/${(metadata.filePath as string).replace('.mdx', '').replace('src/content/', '')}`

  return {
    ...metadata,
    title,
    description,
    generator: siteDetails.siteGenerator,
    keywords: siteDetails.metadata.keywords,
    openGraph: {
      ...siteDetails.metadata.opengraph,
      title,
      description,
      url,
    },
    twitter: { ...siteDetails.metadata.twitter, title, description },
    robots: siteDetails.metadata.robots,
  }
}

const Wrapper = getMDXComponents({}).wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result
  const filePath = (metadata.filePath as string) ?? ''
  return (
    <>
      {filePath && (
        <DocsAutoJsonLd
          title={metadata.title?.toString() ?? ''}
          description={metadata.description?.toString() ?? ''}
          filePath={filePath}
        />
      )}
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    </>
  )
}

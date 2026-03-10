// Renders HowTo JSON-LD for guide/tutorial docs pages.
// Now auto-injected via DocsAutoJsonLd + mdx-components wrapper.
// Kept for direct use if a page needs to override the automatic schema.

interface HowToStep {
  name: string
  text: string
}

interface DocsHowToJsonLdProps {
  title: string
  description: string
  path: string
  steps: HowToStep[]
  dateModified?: string
}

export const DocsHowToJsonLd = ({
  title,
  description,
  path,
  steps,
  dateModified,
}: DocsHowToJsonLdProps) => {
  const url = `https://lightpanda.io/docs/${path}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    ...(dateModified && { dateModified }),
    url: url,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    author: {
      '@type': 'Organization',
      name: 'Lightpanda',
      url: 'https://lightpanda.io',
    },
    about: {
      '@id': 'https://lightpanda.io/#software',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Lightpanda Documentation',
      url: 'https://lightpanda.io/docs',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  )
}

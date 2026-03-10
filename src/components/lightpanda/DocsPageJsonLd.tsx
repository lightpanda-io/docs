// Renders TechArticle JSON-LD for reference/conceptual docs pages.
// Now auto-injected via DocsAutoJsonLd + mdx-components wrapper.
// Kept for direct use if a page needs to override the automatic schema.

interface DocsPageJsonLdProps {
  title: string
  description: string
  path: string
  proficiencyLevel?: 'Beginner' | 'Expert'
  dateModified?: string
}

export const DocsPageJsonLd = ({
  title,
  description,
  path,
  proficiencyLevel = 'Expert',
  dateModified,
}: DocsPageJsonLdProps) => {
  const url = `https://lightpanda.io/docs/${path}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    proficiencyLevel: proficiencyLevel,
    ...(dateModified && { dateModified }),
    url: url,
    author: {
      '@type': 'Organization',
      name: 'Lightpanda',
      url: 'https://lightpanda.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lightpanda',
      url: 'https://lightpanda.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cdn.lightpanda.io/website/assets/images/opengraph/og.png',
      },
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

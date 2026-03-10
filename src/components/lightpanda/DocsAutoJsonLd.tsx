// Automatic JSON-LD schema generation for docs pages.
// Renders TechArticle for reference/conceptual pages, HowTo for guide/tutorial pages.
// Determines type from the file path — no manual per-page import needed.
//
// Guide paths: quickstart/*, guides/*, getting-started*
// Reference paths: everything else

interface DocsAutoJsonLdProps {
  title: string
  description: string
  filePath: string
}

// Paths that indicate a guide/tutorial page (HowTo schema)
const GUIDE_PATTERNS = [
  'quickstart/',
  'guides/',
  'getting-started',
]

function isGuidePage(filePath: string): boolean {
  const normalized = filePath.replace('src/content/', '')
  return GUIDE_PATTERNS.some((pattern) => normalized.includes(pattern))
}

function filePathToDocsPath(filePath: string): string {
  return filePath
    .replace('src/content/', '')
    .replace(/\.mdx$/, '')
    .replace(/\/index$/, '')
}

export const DocsAutoJsonLd = ({ title, description, filePath }: DocsAutoJsonLdProps) => {
  const docsPath = filePathToDocsPath(filePath)
  const url = `https://lightpanda.io/docs/${docsPath}`
  const isGuide = isGuidePage(filePath)

  const baseSchema = {
    '@context': 'https://schema.org' as const,
    url,
    author: {
      '@type': 'Organization' as const,
      name: 'Lightpanda',
      url: 'https://lightpanda.io',
    },
    publisher: {
      '@type': 'Organization' as const,
      name: 'Lightpanda',
      url: 'https://lightpanda.io',
      logo: {
        '@type': 'ImageObject' as const,
        url: 'https://cdn.lightpanda.io/website/assets/images/opengraph/og.png',
      },
    },
    about: {
      '@id': 'https://lightpanda.io/#software',
    },
    isPartOf: {
      '@type': 'WebSite' as const,
      name: 'Lightpanda Documentation',
      url: 'https://lightpanda.io/docs',
    },
    mainEntityOfPage: {
      '@type': 'WebPage' as const,
      '@id': url,
    },
  }

  const schema = isGuide
    ? {
        ...baseSchema,
        '@type': 'HowTo' as const,
        name: title,
        description,
      }
    : {
        ...baseSchema,
        '@type': 'TechArticle' as const,
        headline: title,
        description,
        proficiencyLevel: 'Expert',
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

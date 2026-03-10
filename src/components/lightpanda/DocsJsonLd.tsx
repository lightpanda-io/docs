// Renders WebSite JSON-LD for the docs site — injected once in layout.tsx.
// Links to the master SoftwareApplication entity on the homepage.

export const DocsJsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lightpanda Documentation',
    url: 'https://lightpanda.io/docs',
    description:
      'Official documentation for Lightpanda headless browser — installation, quickstart guides, API reference, and cloud deployment.',
    about: {
      '@id': 'https://lightpanda.io/#software',
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

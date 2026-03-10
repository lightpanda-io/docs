import { Fira_Code, Fira_Sans } from 'next/font/google'
import { Head as NextraHead } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

import { DocsClientLayout } from '@/components/lightpanda/DocsClientLayout'
import { DNSPrefetch } from '@lightpanda/common/components/DNSPrefetch'
import { Favicon } from '@lightpanda/common/components/Favicon'

import 'nextra-theme-docs/style.css'
import '@lightpanda/common/styles/variables.css'
import './globals.css'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['500', '400', '300'],
  style: ['normal', 'italic'],
})
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['500', '300'],
  style: ['normal'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <NextraHead
        backgroundColor={{
          dark: '#1c1c1c',
          light: '#1c1c1c',
        }}
        color={{
          hue: 194,
          saturation: 67,
          lightness: 65,
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --main-font: ${firaSans.style.fontFamily}, sans-serif;
            --code-font: ${firaCode.style.fontFamily}, sans-serif;
          }
        ` }} />
        <Favicon />
        <DNSPrefetch />
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lightpanda Documentation',
              url: 'https://lightpanda.io/docs',
              description: 'Official documentation for Lightpanda headless browser — installation, quickstart guides, API reference, and cloud deployment.',
              about: { '@id': 'https://lightpanda.io/#software' },
              publisher: {
                '@type': 'Organization',
                name: 'Lightpanda',
                url: 'https://lightpanda.io',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://cdn.lightpanda.io/website/assets/images/opengraph/og.png',
                },
              },
            }).replace(/</g, '\\u003c'),
          }}
        />
      </NextraHead>
      <body data-pagefind-body>
        <DocsClientLayout pageMap={pageMap}>
          {children}
        </DocsClientLayout>
      </body>
    </html>
  )
}

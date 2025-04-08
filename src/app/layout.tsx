'use client'

import { Fira_Code, Fira_Sans } from 'next/font/google'
import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

import { Footer } from '@/components/lightpanda/Footer'
import { Navbar } from '@/components/lightpanda/Navbar'
import { DNSPrefetch } from '@lightpanda/common/components/DNSPrefetch'
import { Favicon } from '@lightpanda/common/components/Favicon'
import { Providers } from '@lightpanda/common/components/Providers'
import { SocialIcons } from '@lightpanda/common/components/SocialIcons'
import { Version } from '@lightpanda/common/components/Version'
import { siteDetails } from '@lightpanda/common/data/siteDetails'

import 'nextra-theme-docs/style.css'
import './globals.css'
// import './../styles/nextra.css'
// import './../styles/components.css'

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

// eslint-disable-next-line @next/next/no-async-client-component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
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
        <style jsx global>{`
        :root {
          --main-font: ${firaSans.style.fontFamily}, sans-serif;
          --code-font: ${firaCode.style.fontFamily}, sans-serif;
        }
        `}</style>
        <Favicon />
        <DNSPrefetch />
      </Head>
      <body data-pagefind-body>
        <Providers>
          <Layout
            navbar={<Navbar />}
            pageMap={await getPageMap()}
            docsRepositoryBase={siteDetails.docsRepositoryBase}
            footer={<Footer />}
            feedback={{
              content: 'Question? Send us feedback',
            }}
            toc={{
              extraContent: (
                <>
                  <Version />
                  <SocialIcons
                    socials={siteDetails.socials}
                    classNames="flex flex-row items-center justify-start gap-4 w-1/2 my-4"
                  />
                </>
              ),
            }}
            darkMode={false}
            nextThemes={{
              defaultTheme: 'dark',
            }}
          >
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}

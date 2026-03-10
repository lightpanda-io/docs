'use client'

import { type ReactNode } from 'react'
import { Layout } from 'nextra-theme-docs'

import { Canonical } from '@/components/lightpanda/Canonical'
import { Footer } from '@/components/lightpanda/Footer'
import { Navbar } from '@/components/lightpanda/Navbar'
import { Providers } from '@lightpanda/common/components/Providers'
import { SocialIcons } from '@lightpanda/common/components/SocialIcons'
import { Version } from '@lightpanda/common/components/Version'
import { siteDetails } from '@lightpanda/common/data/siteDetails'

type DocsClientLayoutProps = {
  children: ReactNode
  pageMap: Awaited<ReturnType<typeof import('nextra/page-map').getPageMap>>
}

export const DocsClientLayout = ({ children, pageMap }: DocsClientLayoutProps) => {
  return (
    <Providers>
      <Layout
        navbar={<Navbar />}
        pageMap={pageMap}
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
        <Canonical />
        {children}
      </Layout>
    </Providers>
  )
}

import { createElement, type ReactNode } from 'react'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { DocsAutoJsonLd } from './components/lightpanda/DocsAutoJsonLd'

type MDXComponentsProps = {
  components?: Readonly<unknown>
}

// Get the default MDX components
const themeComponents = getThemeComponents()
const ThemeWrapper = themeComponents.wrapper

// Merge components with a custom wrapper that auto-generates JSON-LD
export function useMDXComponents(props: MDXComponentsProps) {
  return {
    ...themeComponents,
    ...props?.components,
    wrapper({
      children,
      metadata,
      ...rest
    }: {
      children: ReactNode
      metadata?: { title?: string; description?: string; filePath?: string }
      [key: string]: unknown
    }) {
      const title = metadata?.title?.toString() ?? ''
      const description = metadata?.description?.toString() ?? ''
      const filePath = (metadata?.filePath as string) ?? ''

      const jsonLd = filePath
        ? createElement(DocsAutoJsonLd, { title, description, filePath })
        : null

      const content = createElement('div', null, jsonLd, children)

      return ThemeWrapper
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? createElement(ThemeWrapper, { metadata, ...rest } as any, jsonLd, children)
        : content
    },
  }
}

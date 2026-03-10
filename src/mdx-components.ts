import { createElement, type ReactNode } from 'react'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

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
      metadata?: { title?: string; description?: string | null; filePath?: string }
      [key: string]: unknown
    }) {
      return ThemeWrapper
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? createElement(ThemeWrapper, { metadata, ...rest } as any, children)
        : createElement('div', null, children)
    },
  }
}

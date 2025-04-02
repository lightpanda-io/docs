import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

type MDXComponentsProps = {
  components?: Readonly<unknown>
}

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(props: MDXComponentsProps) {
  return {
    ...themeComponents,
    ...props?.components,
  }
}

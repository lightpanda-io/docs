import { Footer as Nextra_Footer } from 'nextra-theme-docs'

export const Footer = () => {
  return (
    <Nextra_Footer className="flex items-center justify-around py-4">
      <p>
        Built with{' '}
        <a
          className="hover:text-foreground"
          href="https://nextra.site"
          target="_blank"
          rel="noreferrer nofollower"
        >
          Nextra
        </a>
      </p>
    </Nextra_Footer>
  )
}

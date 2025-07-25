import { Logo } from '@lightpanda/common/components/Logo'
import { siteDetails } from '@lightpanda/common/data/siteDetails'
import { Navbar as Nextra_Navbar } from 'nextra-theme-docs'
// import { useScrolledHeader } from '@lightpanda/common/hooks/useScrolledHeader'
import { useEffect } from 'react'

export const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = window.document.getElementsByTagName('header')

      if (elements.length > 0) {
        const element = elements[0]
        if (window.scrollY > 0) {
          if (!element.classList.contains('scrolled-header')) {
            element.classList.add('scrolled-header')
          }
        } else {
          element.classList.remove('scrolled-header')
        }
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const domElements = document.querySelectorAll(
      `a[href='${siteDetails.siteUrl}']`,
    ) as NodeListOf<HTMLLinkElement>
    for (const de of domElements) {
      if (de.innerText.includes('Back to website')) {
        if (de.lastChild) {
          de.removeChild(de.lastChild)
        }
        de.setAttribute('target', '_self')
        de.classList.add('menuLink')
        return
      }
    }
  }, [])

  return (
    <>
      <Nextra_Navbar
        className="relative w-full max-w-7xl mx-auto z-10 py-2 px-5 md:py-5"
        logo={<Logo className="" />}
        logoLink=""
      />
    </>
  )
}

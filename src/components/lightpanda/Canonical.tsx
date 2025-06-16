import { siteDetails } from '@lightpanda/common/data/siteDetails'
import { useConfig } from 'nextra-theme-docs'
import { useEffect } from 'react'

export const Canonical = () => {
  const nextraConfig = useConfig()

  useEffect(() => {
    if (nextraConfig.normalizePagesResult) {
      /* Old school way because Next's Head component was not working */
      const { activeIndex, activePath } = nextraConfig.normalizePagesResult
      const href = `${siteDetails.siteUrl}/docs${activePath[activeIndex].route}`
      const ogTitle = document.createElement('link')

      ogTitle.setAttribute('rel', 'canonical')
      ogTitle.setAttribute('href', href)

      document.head.appendChild(ogTitle)
      console.log(nextraConfig, nextraConfig.normalizePagesResult.activePath)
    }
  }, [nextraConfig])

  return <></>
}

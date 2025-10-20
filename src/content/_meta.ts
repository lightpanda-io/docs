import { siteDetails } from '@lightpanda/common/data/siteDetails'
import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  'back-to-website': {
    title: 'Back to website',
    type: 'page',
    href: siteDetails.siteUrl,
  },
  index: {
    title: 'Introduction',
    theme: {
      breadcrumb: false,
    },
  },
  quickstart: {
    title: 'Quickstart',
    theme: {
      breadcrumb: false,
    },
  },
  'open-source': 'Open source edition',
  'cloud-offer': 'Cloud offer',
}

export default meta

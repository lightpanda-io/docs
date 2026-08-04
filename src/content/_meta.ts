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
    theme: {},
  },
  'run-locally': 'Run locally',
  'run-on-lightpanda-cloud': 'Run on Lightpanda Cloud',
  usage: 'Usage',
  guides: 'Guides',
  reference: 'Reference',
}

export default meta

import type { MetaRecord } from 'nextra'

/**
 * type MetaRecordValue =
 *  | TitleSchema
 *  | PageItemSchema
 *  | SeparatorSchema
 *  | MenuSchema
 *
 * type MetaRecord = Record<string, MetaRecordValue>
 **/
const meta: MetaRecord = {
  'back-to-website': {
    title: 'Back to website',
    type: 'page',
    href: '/',
  },
  index: {
    title: 'Introduction',
    theme: {
      breadcrumb: false,
    },
  },
  'getting-started': 'Getting Started',
  guides: 'Guides',
  'systems-requirements': {
    title: 'Systems Requirements',
    theme: {
      breadcrumb: false,
    },
  },
}

export default meta

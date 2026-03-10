'use client'
import dynamic from 'next/dynamic'

const EmbedCalcom = dynamic(() => import('@calcom/embed-react'), { ssr: false })

export const Calcom = () => <EmbedCalcom calLink="team/lightpanda/technical-support" />

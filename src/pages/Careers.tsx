import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks'
import { CareersHero } from '@/components/careers/CareersHero'
import { CareersIntro } from '@/components/careers/CareersIntro'
import { CareersWorkMatters } from '@/components/careers/CareersWorkMatters'
import { CareersVision } from '@/components/careers/CareersVision'
import { CareersGrowth } from '@/components/careers/CareersGrowth'
import { CareersQualities } from '@/components/careers/CareersQualities'
import { CareersCommunity } from '@/components/careers/CareersCommunity'
import { CareersOpportunities } from '@/components/careers/CareersOpportunities'
import { CareersTalent } from '@/components/careers/CareersTalent'
import { CareersFinale } from '@/components/careers/CareersFinale'

export default function Careers() {
    useDocumentTitle('Careers | The Aster School')
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <main className="bg-[#fbfaf8] min-h-screen">
            <CareersHero />
            <CareersIntro />
            <CareersWorkMatters />
            <CareersVision />
            <CareersGrowth />
            <CareersQualities />
            <CareersCommunity />
            <CareersOpportunities />
            <CareersTalent />
            <CareersFinale />
        </main>
    )
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks'
import { SafeguardingHero } from '@/components/safeguarding/SafeguardingHero'
import { SafeguardingIntro } from '@/components/safeguarding/SafeguardingIntro'
import { SafeguardingCommitment } from '@/components/safeguarding/SafeguardingCommitment'
import { SafeguardingPhysical } from '@/components/safeguarding/SafeguardingPhysical'
import { SafeguardingWellbeing } from '@/components/safeguarding/SafeguardingWellbeing'
import { SafeguardingStaff } from '@/components/safeguarding/SafeguardingStaff'
import { SafeguardingFamilies } from '@/components/safeguarding/SafeguardingFamilies'
import { SafeguardingFinale } from '@/components/safeguarding/SafeguardingFinale'

export default function Safeguarding() {
    useDocumentTitle('Safeguarding | The Aster School')
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <main className="bg-[#fbfaf8] min-h-screen">
            <SafeguardingHero />
            <SafeguardingIntro />
            <SafeguardingCommitment />
            <SafeguardingPhysical />
            <SafeguardingWellbeing />
            <SafeguardingStaff />
            <SafeguardingFamilies />
            <SafeguardingFinale />
        </main>
    )
}

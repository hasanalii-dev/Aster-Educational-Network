import { useDocumentTitle, useScrollToTop } from '@/hooks'
import { SeniorHero } from '@/components/senior/SeniorHero'
import { SeniorIntro } from '@/components/senior/SeniorIntro'
import { SeniorCambridge } from '@/components/senior/SeniorCambridge'
import { SeniorInnovation } from '@/components/senior/SeniorInnovation'
import { SeniorCommunication } from '@/components/senior/SeniorCommunication'
import { SeniorLeadership } from '@/components/senior/SeniorLeadership'
import { SeniorBeyond } from '@/components/senior/SeniorBeyond'
import { SeniorFaculty } from '@/components/senior/SeniorFaculty'
import { SeniorFinale } from '@/components/senior/SeniorFinale'

export default function SeniorSchool() {
    useDocumentTitle('Senior School | The Aster School')
    useScrollToTop()

    return (
        <main className="w-full bg-[#FAFAFA] relative">
            <SeniorHero />
            <SeniorIntro />
            <SeniorCambridge />
            <SeniorInnovation />
            <SeniorCommunication />
            <SeniorLeadership />
            <SeniorBeyond />
            <SeniorFaculty />
            <SeniorFinale />
        </main>
    )
}

import { SEO } from '@/components/seo/SEO'
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

    return (
        <main className="w-full bg-[#FAFAFA] relative">
            <SEO 
                title="Senior School" 
                keywords="senior school karachi, O levels karachi, A levels karachi, igcse karachi, high school karachi, best senior school in karachi, aster senior school"
                description="The Aster Senior School prepares students for global success through rigorous O Level and A Level programs in Karachi, fostering independence and leadership."
            />
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

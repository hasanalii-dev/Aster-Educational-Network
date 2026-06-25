import { useDocumentTitle } from '@/hooks'
import { CustomCursor } from '@/components/ui/CustomCursor'

import { DifferenceHero } from '@/components/aster-difference/DifferenceHero'
import { DifferenceIntro } from '@/components/aster-difference/DifferenceIntro'
import { DifferenceFutureReady } from '@/components/aster-difference/DifferenceFutureReady'
import { DifferenceLeadership } from '@/components/aster-difference/DifferenceLeadership'
import { DifferenceCulture } from '@/components/aster-difference/DifferenceCulture'
import { DifferenceSports } from '@/components/aster-difference/DifferenceSports'
import { DifferenceCharacter } from '@/components/aster-difference/DifferenceCharacter'
import { DifferenceSustainability } from '@/components/aster-difference/DifferenceSustainability'
import { DifferenceCommunity } from '@/components/aster-difference/DifferenceCommunity'
import { DifferenceWhyAster } from '@/components/aster-difference/DifferenceWhyAster'
import { DifferenceCTA } from '@/components/aster-difference/DifferenceCTA'

export default function AsterDifference() {
    useDocumentTitle('The Aster Difference')

    return (
        <div id="page-aster-difference" className="bg-[#FAFAFA] min-h-screen">
            <CustomCursor />
            <DifferenceHero />
            <DifferenceIntro />
            <DifferenceFutureReady />
            <DifferenceLeadership />
            <DifferenceCulture />
            <DifferenceSports />
            <DifferenceCharacter />
            <DifferenceSustainability />
            <DifferenceCommunity />
            <DifferenceWhyAster />
            <DifferenceCTA />
        </div>
    )
}

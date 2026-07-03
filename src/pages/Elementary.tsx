import { useDocumentTitle, useScrollToTop } from '@/hooks'
import { ElementaryHero } from '@/components/elementary/ElementaryHero'
import { ElementaryIntro } from '@/components/elementary/ElementaryIntro'
import { ElementaryCuriosity } from '@/components/elementary/ElementaryCuriosity'
import { ElementaryFoundations } from '@/components/elementary/ElementaryFoundations'
import { ElementaryResources } from '@/components/elementary/ElementaryResources'
import { ElementaryDigital } from '@/components/elementary/ElementaryDigital'
import { ElementaryLiteracy } from '@/components/elementary/ElementaryLiteracy'
import { ElementarySEL } from '@/components/elementary/ElementarySEL'
import { ElementaryExperience } from '@/components/elementary/ElementaryExperience'
import { ElementarySustainability } from '@/components/elementary/ElementarySustainability'
import { ElementaryLanguages } from '@/components/elementary/ElementaryLanguages'
import { ElementarySports } from '@/components/elementary/ElementarySports'
import { ElementaryIslamic } from '@/components/elementary/ElementaryIslamic'
import { ElementaryFinale } from '@/components/elementary/ElementaryFinale'

export default function Elementary() {
    useDocumentTitle('Elementary School | The Aster School')
    useScrollToTop()

    return (
        <main className="w-full bg-white relative">
            <ElementaryHero />
            <ElementaryIntro />
            <ElementaryCuriosity />
            <ElementaryFoundations />
            <ElementaryResources />
            <ElementaryDigital />
            <ElementaryLiteracy />
            <ElementarySEL />
            <ElementaryExperience />
            <ElementarySustainability />
            <ElementaryLanguages />
            <ElementarySports />
            <ElementaryIslamic />
            <ElementaryFinale />
        </main>
    )
}

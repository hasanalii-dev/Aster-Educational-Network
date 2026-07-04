import { SEO } from '@/components/seo/SEO'
import { ApproachHero } from '@/components/approach/ApproachHero'
import { ApproachChildCentered } from '@/components/approach/ApproachChildCentered'
import { ApproachHandsOn } from '@/components/approach/ApproachHandsOn'
import { ApproachFutureReady } from '@/components/approach/ApproachFutureReady'
import { ApproachSocialEmotional } from '@/components/approach/ApproachSocialEmotional'
import { ApproachBeyondClassroom } from '@/components/approach/ApproachBeyondClassroom'
import { ApproachValues } from '@/components/approach/ApproachValues'
import { ApproachPartnership } from '@/components/approach/ApproachPartnership'
import { ApproachFinale } from '@/components/approach/ApproachFinale'

/**
 * Our Approach Page — Aster Pakistan
 * 
 * Content: Teaching Methodology, Learning Framework,
 * Student Development Model, Educational Principles
 */
export default function OurApproach() {

  return (
    <main id="page-our-approach" className="bg-white selection:bg-[#FBBB21] selection:text-[#334a89]">
            <SEO title="Our Approach | The Aster School" />
      <ApproachHero />
      <ApproachChildCentered />
      <ApproachHandsOn />
      <ApproachFutureReady />
      <ApproachSocialEmotional />
      <ApproachBeyondClassroom />
      <ApproachValues />
      <ApproachPartnership />
      <ApproachFinale />
    </main>
  )
}

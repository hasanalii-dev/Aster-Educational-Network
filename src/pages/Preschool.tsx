import { SEO } from '@/components/seo/SEO'
import { PreschoolHero } from '@/components/preschool/PreschoolHero'
import { PreschoolJourney } from '@/components/preschool/PreschoolJourney'
import { PreschoolMaterials } from '@/components/preschool/PreschoolMaterials'
import { PreschoolPace } from '@/components/preschool/PreschoolPace'
import { PreschoolPracticalLife } from '@/components/preschool/PreschoolPracticalLife'
import { PreschoolLanguage } from '@/components/preschool/PreschoolLanguage'
import { PreschoolMath } from '@/components/preschool/PreschoolMath'
import { PreschoolWorld } from '@/components/preschool/PreschoolWorld'
import { PreschoolSocialEmotional } from '@/components/preschool/PreschoolSocialEmotional'
import { PreschoolDifference } from '@/components/preschool/PreschoolDifference'
import { PreschoolFinale } from '@/components/preschool/PreschoolFinale'

/**
 * Preschool (Early Years) Page — Aster Pakistan
 * 
 * Content: Montessori-inspired program overview, CASA stages,
 * learning areas, practical life, language, mathematics,
 * world understanding, social-emotional & Islamic development
 */
export default function Preschool() {

  return (
    <div id="page-preschool">
      <SEO title="Preschool (Early Years)" />
      <PreschoolHero />
      <PreschoolJourney />
      <PreschoolMaterials />
      <PreschoolPace />
      <PreschoolPracticalLife />
      <PreschoolLanguage />
      <PreschoolMath />
      <PreschoolWorld />
      <PreschoolSocialEmotional />
      <PreschoolDifference />
      <PreschoolFinale />
    </div>
  )
}

import { useDocumentTitle } from '@/hooks'
import { CommunityHero } from '@/components/community/CommunityHero'
import { CommunityIntro } from '@/components/community/CommunityIntro'
import { CommunityAmbassadors } from '@/components/community/CommunityAmbassadors'
import { CommunityWorkshops } from '@/components/community/CommunityWorkshops'
import { CommunityWellbeing } from '@/components/community/CommunityWellbeing'
import { CommunityEvents } from '@/components/community/CommunityEvents'
import { CommunityValues } from '@/components/community/CommunityValues'
import { CommunityCtaSection } from '@/components/sections/CommunityCtaSection'

export default function Community() {
  useDocumentTitle('Community | The Aster School')

  return (
    <div id="page-community" className="bg-[#fbfaf8]">
      <CommunityHero />
      <CommunityIntro />
      <CommunityAmbassadors />
      <CommunityWorkshops />
      <CommunityWellbeing />
      <CommunityEvents />
      <CommunityValues />
      <CommunityCtaSection />
    </div>
  )
}

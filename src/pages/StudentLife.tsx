import { useDocumentTitle } from '@/hooks'
import { StudentLifeHero } from '@/components/student-life/StudentLifeHero'
import { StudentLifeIntro } from '@/components/student-life/StudentLifeIntro'
import { StudentLifeBelonging } from '@/components/student-life/StudentLifeBelonging'
import { StudentLifeExperiences } from '@/components/student-life/StudentLifeExperiences'
import { StudentLifeTraditions } from '@/components/student-life/StudentLifeTraditions'
import { StudentLifeGrowth } from '@/components/student-life/StudentLifeGrowth'
import { StudentLifeOutro } from '@/components/student-life/StudentLifeOutro'
import { CommunityCtaSection } from '@/components/sections/CommunityCtaSection'

export default function StudentLife() {
  useDocumentTitle('Student Life | The Aster School')

  return (
    <div id="page-student-life" className="bg-[#fbfaf8]">
      <StudentLifeHero />
      <StudentLifeIntro />
      <StudentLifeBelonging />
      <StudentLifeExperiences />
      <StudentLifeTraditions />
      <StudentLifeGrowth />
      <StudentLifeOutro />
      <CommunityCtaSection />
    </div>
  )
}

import { SEO } from '@/components/seo/SEO'
import { CampusesHero } from '@/components/campuses/CampusesHero'
import { CampusesIntro } from '@/components/campuses/CampusesIntro'
import { CampusShowcase } from '@/components/campuses/CampusShowcase'
import { CampusesInternational } from '@/components/campuses/CampusesInternational'
import { CampusesExperience } from '@/components/campuses/CampusesExperience'
import { CampusesFinale } from '@/components/campuses/CampusesFinale'

/**
 * Our Campuses Page — Aster Pakistan
 * 
 * Showcases the different campuses, facilities,
 * location information, and global expansion.
 */
export default function Campuses() {

  return (
    <div id="page-campuses" className="bg-white">
            <SEO title="Our Campuses" />
      <CampusesHero />
      <CampusesIntro />
      <CampusShowcase />
      <CampusesInternational />
      <CampusesExperience />
      <CampusesFinale />
    </div>
  )
}

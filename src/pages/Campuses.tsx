import { useDocumentTitle } from '@/hooks'

/**
 * Our Campuses Page — Aster Pakistan
 * 
 * Content: Campus Information, Facilities,
 * Location Information, Campus Highlights
 */
export default function Campuses() {
  useDocumentTitle('Our Campuses')

  return (
    <div id="page-campuses">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Our Campuses</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Campus information, facilities, location information, and campus highlights.
          </p>
        </div>
      </section>
    </div>
  )
}

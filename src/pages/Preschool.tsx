import { useDocumentTitle } from '@/hooks'

/**
 * Preschool Page — Aster Pakistan
 * 
 * Content: Curriculum Overview, Learning Environment,
 * Development Focus, Activities, Facilities
 */
export default function Preschool() {
  useDocumentTitle('Preschool')

  return (
    <div id="page-preschool">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Preschool</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Curriculum overview, learning environment, development focus, activities, and facilities.
          </p>
        </div>
      </section>
    </div>
  )
}

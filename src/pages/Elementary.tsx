import { useDocumentTitle } from '@/hooks'

/**
 * Elementary Page — Aster Pakistan
 * 
 * Content: Curriculum, Academic Journey,
 * Learning Outcomes, Student Development
 */
export default function Elementary() {
  useDocumentTitle('Elementary')

  return (
    <div id="page-elementary">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Elementary</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Curriculum, academic journey, learning outcomes, and student development.
          </p>
        </div>
      </section>
    </div>
  )
}

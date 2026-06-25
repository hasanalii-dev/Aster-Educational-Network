import { useDocumentTitle } from '@/hooks'

/**
 * Our Approach Page — Aster Pakistan
 * 
 * Content: Teaching Methodology, Learning Framework,
 * Student Development Model, Educational Principles
 */
export default function OurApproach() {
  useDocumentTitle('Our Approach')

  return (
    <div id="page-our-approach">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Our Approach</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Teaching methodology, learning framework, student development model, and educational principles.
          </p>
        </div>
      </section>
    </div>
  )
}

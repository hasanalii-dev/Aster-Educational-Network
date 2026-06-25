import { useDocumentTitle } from '@/hooks'

/**
 * The Aster Journal — Blog Listing Page
 * 
 * Phase 1: Frontend blog structure only.
 * Architected to support future CMS integration.
 */
export default function Journal() {
  useDocumentTitle('The Aster Journal')

  return (
    <div id="page-journal">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">The Aster Journal</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Insights, stories, and updates from the Aster Pakistan community.
          </p>
        </div>
      </section>
    </div>
  )
}

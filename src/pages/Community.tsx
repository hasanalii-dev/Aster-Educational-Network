import { useDocumentTitle } from '@/hooks'

/**
 * Community Page — Aster Pakistan
 * 
 * Content: Parent Engagement, Community Programs,
 * Partnerships, Social Impact
 */
export default function Community() {
  useDocumentTitle('Community')

  return (
    <div id="page-community">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Community</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Parent engagement, community programs, partnerships, and social impact.
          </p>
        </div>
      </section>
    </div>
  )
}

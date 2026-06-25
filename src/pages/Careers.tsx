import { useDocumentTitle } from '@/hooks'

/**
 * Careers Page — Aster Pakistan
 * 
 * Phase 1: Informational page with application contact details.
 * No job portal required.
 */
export default function Careers() {
  useDocumentTitle('Careers')

  return (
    <div id="page-careers">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Careers</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Join the Aster Pakistan team. Application contact details and career opportunities.
          </p>
        </div>
      </section>
    </div>
  )
}

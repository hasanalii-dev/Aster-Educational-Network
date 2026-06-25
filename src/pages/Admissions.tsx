import { useDocumentTitle } from '@/hooks'

/**
 * Admissions Page — Aster Pakistan
 * 
 * Phase 1: Informational page only.
 * Content: Admission Process, Requirements,
 * Application Steps, Enrollment Information
 */
export default function Admissions() {
  useDocumentTitle('Admissions')

  return (
    <div id="page-admissions">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Admissions</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Admission process, requirements, application steps, and enrollment information.
          </p>
        </div>
      </section>
    </div>
  )
}

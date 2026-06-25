import { useDocumentTitle } from '@/hooks'

/**
 * Safeguarding Page — Aster Pakistan
 * 
 * Content: Student Safety Policies, Child Protection Measures,
 * Welfare Information
 */
export default function Safeguarding() {
  useDocumentTitle('Safeguarding')

  return (
    <div id="page-safeguarding">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Safeguarding</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Student safety policies, child protection measures, and welfare information.
          </p>
        </div>
      </section>
    </div>
  )
}

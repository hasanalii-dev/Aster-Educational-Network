import { useDocumentTitle } from '@/hooks'

/**
 * Senior School Page — Aster Pakistan
 * 
 * Content: Academic Programs, Examination Pathways,
 * University Preparation, Leadership Development
 */
export default function SeniorSchool() {
  useDocumentTitle('Senior School')

  return (
    <div id="page-senior-school">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Senior School</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Academic programs, examination pathways, university preparation, and leadership development.
          </p>
        </div>
      </section>
    </div>
  )
}

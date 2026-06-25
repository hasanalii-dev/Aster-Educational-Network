import { useDocumentTitle } from '@/hooks'

/**
 * FAQs Page — Aster Pakistan
 * 
 * Content: Admissions Questions, Academic Questions,
 * General Information
 */
export default function FAQs() {
  useDocumentTitle('FAQs')

  return (
    <div id="page-faqs">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Admissions questions, academic questions, and general information.
          </p>
        </div>
      </section>
    </div>
  )
}

import { useDocumentTitle } from '@/hooks'

/**
 * Parent Stories Page — Aster Pakistan
 * 
 * Content: Testimonials, Success Stories, Parent Experiences
 */
export default function ParentStories() {
  useDocumentTitle('Parent Stories')

  return (
    <div id="page-parent-stories">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Parent Stories</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Testimonials, success stories, and parent experiences.
          </p>
        </div>
      </section>
    </div>
  )
}

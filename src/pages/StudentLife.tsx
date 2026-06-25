import { useDocumentTitle } from '@/hooks'

/**
 * Student Life Page — Aster Pakistan
 * 
 * Content: Student Activities, Clubs, Events,
 * Sports, Creative Programs, Student Experience
 */
export default function StudentLife() {
  useDocumentTitle('Student Life')

  return (
    <div id="page-student-life">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Student Life</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Student activities, clubs, events, sports, creative programs, and student experience.
          </p>
        </div>
      </section>
    </div>
  )
}

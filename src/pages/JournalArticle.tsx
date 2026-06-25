import { useParams } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks'

/**
 * Journal Article Template — Aster Pakistan
 * 
 * Phase 1: Static article template.
 * Architected to support future CMS-driven content.
 */
export default function JournalArticle() {
  const { slug } = useParams<{ slug: string }>()
  useDocumentTitle('Article')

  return (
    <div id="page-journal-article">
      <article className="section-padding">
        <div className="container-narrow">
          <h1 className="text-4xl md:text-5xl font-bold">Article: {slug}</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
            Individual article template. Content will be loaded dynamically in Phase 2.
          </p>
        </div>
      </article>
    </div>
  )
}

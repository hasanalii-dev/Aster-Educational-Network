import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks'

/**
 * 404 Not Found Page — Aster Pakistan
 */
export default function NotFound() {
  useDocumentTitle('Page Not Found')

  return (
    <div id="page-not-found" className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-8xl font-bold text-[var(--color-brand-primary)] font-[var(--font-family-heading)]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold">Page Not Found</h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--color-brand-primary)] text-white rounded-[var(--radius-button)] hover:bg-[var(--color-brand-secondary)] transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

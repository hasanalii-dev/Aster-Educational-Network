import { useEffect } from 'react'
import { siteConfig } from '@/config/site'

/**
 * Sets the document title with the site name template.
 * @param title - Page-specific title. If empty, uses default site title.
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = siteConfig.seo.titleTemplate.replace('%s', title)
    } else {
      document.title = siteConfig.seo.defaultTitle
    }
  }, [title])
}

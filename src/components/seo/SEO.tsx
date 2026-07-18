import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  keywords?: string
  canonicalUrl?: string
  schema?: string // JSON-LD string
}

export function SEO({ 
  title, 
  description = "The Aster School — Empowering students to become confident, resilient, and lifelong learners in Karachi. We offer outstanding Preschool, Elementary, and Senior School education.", 
  image = "https://aster.edu.pk/logo.jpg", 
  url = "https://aster.edu.pk",
  keywords = "school karachi, best school in karachi, senior school karachi, O levels karachi, A levels karachi, aster school karachi, top schools in karachi, primary school karachi, pre school karachi",
  canonicalUrl,
  schema
}: SEOProps) {
  const fullTitle = `${title} | The Aster School`
  const finalCanonical = canonicalUrl || url
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={finalCanonical} />

      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}

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
  description = "The Aster School is widely recognized as one of the best schools in Karachi, offering premium education from Preschool and Kindergarten through Elementary, Middle, and Senior School (O Levels and A Levels). We empower students to become confident, resilient, and lifelong learners with top-tier academics, robotics, sports, and holistic development in Karachi, Pakistan.", 
  image = "https://aster.edu.pk/logo.jpg", 
  url = "https://aster.edu.pk",
  keywords = "best school in karachi, top schools in karachi, school karachi, senior school karachi, O levels karachi, A levels karachi, aster school karachi, primary school karachi, pre school karachi, kindergarten karachi, best private school karachi, cambridge school karachi, igcse karachi, early years education karachi, best elementary school karachi, top 10 schools in karachi, aster edu pk, best education in karachi, best A level college karachi",
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

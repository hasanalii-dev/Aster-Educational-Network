// ============================================
// Aster Pakistan — Site Configuration
// ============================================
// Global site metadata and configuration constants.
// This will be the single source of truth for site-wide settings.

export const siteConfig = {
  name: 'Aster Pakistan',
  tagline: 'Nurturing Excellence, Inspiring Futures',
  description:
    'Aster Pakistan is a leading educational network serving students across Preschool, Elementary, and Senior School with a commitment to academic excellence and holistic development.',
  url: 'https://aster.edu.pk/',
  locale: 'en_PK',
  
  // Contact Information
  contact: {
    email: 'info@asterpakistan.com',
    phone: '+92 XXX XXX XXXX',
    address: 'Lahore, Pakistan',
  },

  // Social Media Links
  social: {
    facebook: 'https://facebook.com/asterpakistan',
    instagram: 'https://instagram.com/asterpakistan',
    linkedin: 'https://linkedin.com/company/asterpakistan',
    youtube: 'https://youtube.com/@asterpakistan',
  },

  // SEO Defaults
  seo: {
    titleTemplate: '%s | Aster Pakistan',
    defaultTitle: 'Aster Pakistan — Nurturing Excellence, Inspiring Futures',
    defaultDescription:
      'Discover Aster Pakistan — a premier educational network offering Preschool, Elementary, and Senior School programs designed to inspire academic excellence and holistic growth.',
    defaultImage: '/og-image.jpg',
  },
} as const

export type SiteConfig = typeof siteConfig

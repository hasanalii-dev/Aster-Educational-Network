const fs = require('fs')
const path = require('path')

const DOMAIN = 'https://aster.edu.pk'

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/our-approach', priority: '0.8', changefreq: 'monthly' },
  { path: '/preschool', priority: '0.9', changefreq: 'monthly' },
  { path: '/elementary', priority: '0.9', changefreq: 'monthly' },
  { path: '/senior-school', priority: '0.9', changefreq: 'monthly' },
  { path: '/aster-difference', priority: '0.8', changefreq: 'monthly' },
  { path: '/admissions', priority: '0.9', changefreq: 'monthly' },
  { path: '/student-life', priority: '0.7', changefreq: 'monthly' },
  { path: '/campuses', priority: '0.8', changefreq: 'monthly' },
  { path: '/community', priority: '0.7', changefreq: 'monthly' },
  { path: '/safeguarding', priority: '0.6', changefreq: 'monthly' },
  { path: '/parent-stories', priority: '0.7', changefreq: 'weekly' },
  { path: '/faqs', priority: '0.6', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'weekly' },
  { path: '/open-roles', priority: '0.7', changefreq: 'weekly' },
  { path: '/journal', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/apply', priority: '0.9', changefreq: 'monthly' },
  { path: '/book-tour', priority: '0.9', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
]

function generateSitemap() {
  const date = new Date().toISOString()
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  const publicDir = path.join(__dirname, 'public')
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir)
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8')
  console.log('✅ Generated sitemap.xml')
}

function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /profile/

Sitemap: ${DOMAIN}/sitemap.xml`

  const publicDir = path.join(__dirname, 'public')
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf8')
  console.log('✅ Generated robots.txt')
}

generateSitemap()
generateRobotsTxt()

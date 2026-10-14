const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const baseUrl = 'https://www.waazrealty.com';

async function generateSitemap() {
  try {
    const listings = await client.fetch(
      `*[_type == "listing" && status == "active"] { slug, _updatedAt }`
    );

    const staticPages = [
      { slug: '', priority: 1.0 },
      { slug: 'listings', priority: 0.9 },
      { slug: 'sale', priority: 0.8 },
      { slug: 'rent', priority: 0.8 },
      { slug: 'about', priority: 0.7 },
      { slug: 'contact', priority: 0.7 },
      { slug: 'faq', priority: 0.6 },
      { slug: 'blog', priority: 0.7 },
      { slug: 'list-your-property', priority: 0.8 },
    ];

    const urls = [
      ...staticPages.map(({ slug, priority }) => ({
        url: slug ? `${baseUrl}/${slug}` : baseUrl,
        lastmod: new Date().toISOString().split('T')[0],
        priority,
        changefreq: 'weekly',
      })),
      ...listings.map(({ slug, _updatedAt }) => ({
        url: `${baseUrl}/listings/${slug.current}`,
        lastmod: _updatedAt.split('T')[0],
        priority: 0.8,
        changefreq: 'monthly',
      })),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, lastmod, priority, changefreq }) =>
      `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemap);
    console.log('✓ Sitemap generated at public/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();

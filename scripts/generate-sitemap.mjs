import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://diadanhnghean.vercel.app';

const placesPath = path.resolve('src/data/places.json');
const outputPath = path.resolve('public/sitemap.xml');

const places = JSON.parse(fs.readFileSync(placesPath, 'utf8'));

const today = new Date().toISOString().split('T')[0];

const urls = [
  {
    loc: `${SITE_URL}/`,
    priority: '1.0',
    changefreq: 'weekly'
  },
  ...places
    .filter((place) => place.slug)
    .map((place) => ({
      loc: `${SITE_URL}/dia-danh/${place.slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    }))
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(outputPath, xml, 'utf8');

console.log(`Generated sitemap with ${urls.length} URLs: ${outputPath}`);
import { getCollection } from 'astro:content';
import { getPublishedPosts } from '../utils/posts';

export async function GET() {
  const posts = await getPublishedPosts();
  const site = 'https://markhzz.com';

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/articles', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
  ];

  const postPages = posts.map(post => ({
    url: `/posts/${post.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: post.data.pubDate.toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...postPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

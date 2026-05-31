import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getBasePath } from '../../utils/path';

/**
 * ブログ（英語）のRSSフィードを生成する
 * @param context - Astro APIコンテキスト（site情報を含む）
 */
export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => post.data.lang === 'en')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'KURO COFFEE Journal',
    description: 'Brewing guides, notes on beans, and everyday columns from KURO COFFEE.',
    site: new URL(getBasePath('/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.category],
      author: post.data.author,
      link: getBasePath(`/en/blog/${post.id.replace(/^en-/, '')}/`),
    })),
    customData: '<language>en</language>',
  });
}

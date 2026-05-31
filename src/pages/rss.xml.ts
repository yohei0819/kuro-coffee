import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getBasePath } from '../utils/path';

/**
 * ブログ（日本語）のRSSフィードを生成する
 * @param context - Astro APIコンテキスト（site情報を含む）
 */
export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => post.data.lang === 'ja')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'KURO COFFEE Journal',
    description: 'こだわりの自家焙煎コーヒーにまつわるコラム・抽出ガイド・豆のはなし。',
    site: new URL(getBasePath('/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.category],
      author: post.data.author,
      link: getBasePath(`/blog/${post.id}/`),
    })),
    customData: '<language>ja</language>',
  });
}

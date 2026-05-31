import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** ブログ（ジャーナル）コレクションのスキーマ定義 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    /** 記事タイトル */
    title: z.string(),
    /** 記事の概要（一覧・meta description で使用） */
    description: z.string(),
    /** 公開日 */
    pubDate: z.coerce.date(),
    /** カテゴリ（任意） */
    category: z.string().default('コラム'),
    /** 著者名 */
    author: z.string().default('KURO COFFEE 編集部'),
    /** 記事のロケール（'ja' | 'en'） */
    lang: z.enum(['ja', 'en']).default('ja'),
  }),
});

export const collections = { blog };

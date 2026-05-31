/**
 * i18n — 多言語対応の辞書とヘルパー
 * デフォルトロケールは日本語（ja）、英語（en）を追加サポート。
 */
import { getBasePath } from '../utils/path';

/** サポートするロケール */
export const languages = {
  ja: '日本語',
  en: 'English',
} as const;

/** ロケールのキー型 */
export type Lang = keyof typeof languages;

/** デフォルトロケール */
export const defaultLang: Lang = 'ja';

/** UI翻訳辞書 */
export const ui = {
  ja: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.blog': 'Blog',
    'nav.access': 'Access',
    'nav.contact': 'Contact',
    'lang.switch': '言語を切り替え',
    'home.tagline': '一杯の、深い時間。',
    'home.lead': 'こだわりの自家焙煎コーヒーをお届けします。',
    'home.cta': '商品を見る',
    'common.backHome': 'ホームに戻る',
    'blog.backToList': '記事一覧に戻る',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.blog': 'Blog',
    'nav.access': 'Access',
    'nav.contact': 'Contact',
    'lang.switch': 'Switch language',
    'home.tagline': 'A cup. A deeper moment.',
    'home.lead': 'Carefully roasted specialty coffee, delivered with care.',
    'home.cta': 'View products',
    'common.backHome': 'Back to home',
    'blog.backToList': 'Back to all posts',
  },
} as const satisfies Record<Lang, Record<string, string>>;

/** 翻訳キーの型 */
export type UIKey = keyof (typeof ui)['ja'];

/**
 * URLパスから現在のロケールを判定する
 * @param url - 現在のURL
 * @returns ロケール（'ja' | 'en'）
 */
export function getLangFromUrl(url: URL): Lang {
  const [, base, maybeLang] = url.pathname.split('/');
  // base パス（/kuro-coffee）を考慮し、その次のセグメントを確認
  if (base in languages) return base as Lang;
  if (maybeLang in languages) return maybeLang as Lang;
  return defaultLang;
}

/**
 * 指定ロケール用の翻訳関数を返す
 * @param lang - ロケール
 * @returns キーから訳文を取得する関数
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * ロケールを考慮したパスを生成する
 * @param path - ルートからのパス（例: '/products'）
 * @param lang - ロケール
 * @returns base パス + ロケールプレフィックスを含むパス
 */
export function localizedPath(path: string, lang: Lang): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return getBasePath(normalized);
  return getBasePath(`/${lang}${normalized === '/' ? '' : normalized}`);
}

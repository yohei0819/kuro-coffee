import { getBasePath } from '../utils/path';
import { localizedPath, type Lang } from '../i18n/ui';
import type { NavLink } from '../types';

/** メインナビゲーションのリンク一覧 */
export const navLinks: NavLink[] = [
  { label: 'Home', href: getBasePath('/') },
  { label: 'About', href: getBasePath('/about') },
  { label: 'Products', href: getBasePath('/products') },
  { label: 'Blog', href: getBasePath('/blog') },
  { label: 'Access', href: getBasePath('/access') },
  { label: 'Contact', href: getBasePath('/contact') },
];

/** ナビゲーション項目の定義（ロケール非依存のルート） */
const navRoutes: { label: string; path: string; localized: boolean }[] = [
  { label: 'Home', path: '/', localized: true },
  { label: 'About', path: '/about', localized: true },
  { label: 'Products', path: '/products', localized: true },
  { label: 'Blog', path: '/blog', localized: true },
  { label: 'Access', path: '/access', localized: true },
  // Contact は英語版が無いため常に日本語ページへ
  { label: 'Contact', path: '/contact', localized: false },
];

/**
 * 指定ロケール向けのナビゲーションリンクを生成する
 * @param lang - ロケール
 * @returns ロケールに応じた href を持つリンク配列
 */
export function getNavLinks(lang: Lang): NavLink[] {
  return navRoutes.map((route) => ({
    label: route.label,
    href: route.localized ? localizedPath(route.path, lang) : getBasePath(route.path),
  }));
}

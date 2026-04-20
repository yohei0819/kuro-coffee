import { getBasePath } from '../utils/path';
import type { NavLink } from '../types';

/** メインナビゲーションのリンク一覧 */
export const navLinks: NavLink[] = [
  { label: 'Home', href: getBasePath('/') },
  { label: 'About', href: getBasePath('/about') },
  { label: 'Products', href: getBasePath('/products') },
  { label: 'Contact', href: getBasePath('/contact') },
];

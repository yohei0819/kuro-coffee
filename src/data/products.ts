/** 商品カテゴリの型 */
export type ProductCategory = 'blend' | 'single-origin' | 'decaf';

/** 商品データの型 */
export type Product = {
  id: string; name: string; nameEn: string;
  price: number; category: ProductCategory;
  description: string; image: string;
};

/** カテゴリのラベル定義 */
export const categoryLabels: Record<ProductCategory | 'all', string> = {
  all: 'すべて', blend: 'ブレンド', 'single-origin': 'シングルオリジン', decaf: 'デカフェ',
};

/** 商品一覧データ */
export const products: Product[] = [
  { id: 'kuro-blend', name: '黒ブレンド', nameEn: 'KURO Blend', price: 1200, category: 'blend', description: '深煎りのコクと甘みが調和した、看板ブレンド。', image: 'kuro-blend.webp' },
  { id: 'morning-light', name: '朝の光', nameEn: 'Morning Light', price: 1400, category: 'single-origin', description: 'エチオピア産の華やかな酸味とフルーティーな香り。', image: 'morning-light.webp' },
  { id: 'tsuki-blend', name: '月ブレンド', nameEn: 'Tsuki Blend', price: 1300, category: 'blend', description: '夜のリラックスタイムに。まろやかな口当たり。', image: 'tsuki-blend.webp' },
  { id: 'colombia-huila', name: 'コロンビア ウイラ', nameEn: 'Colombia Huila', price: 1500, category: 'single-origin', description: 'ナッツのような甘みとチョコレートの余韻。', image: 'colombia-huila.webp' },
  { id: 'yoru-decaf', name: '夜カフェインレス', nameEn: 'Yoru Decaf', price: 1400, category: 'decaf', description: 'カフェインレスでも妥協しない、深い味わい。', image: 'yoru-decaf.webp' },
  { id: 'brazil-santos', name: 'ブラジル サントス', nameEn: 'Brazil Santos', price: 1100, category: 'single-origin', description: 'バランスの取れた定番。毎日飲んでも飽きない一杯。', image: 'brazil-santos.webp' },
];

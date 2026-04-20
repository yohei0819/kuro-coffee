/**
 * ProductFilter — カテゴリフィルター付き商品一覧コンポーネント
 */
import { useState, useRef, useCallback } from 'react';
import { products, categoryLabels } from '../../data/products';
import type { ProductCategory } from '../../data/products';
import ProductCard from './ProductCard';
import styles from './ProductFilter.module.css';

/** ProductFilterのprops型 */
interface ProductFilterProps {
  imageMap: Record<string, string>;
}

/** フィルターに使用するカテゴリキーの配列 */
const categories = Object.keys(categoryLabels) as (ProductCategory | 'all')[];

/**
 * カテゴリフィルター付き商品一覧を表示するReactコンポーネント
 * @param props - 画像URLマップ
 */
export default function ProductFilter({ imageMap }: ProductFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const tablistRef = useRef<HTMLDivElement>(null);

  /** フィルタリングされた商品一覧 */
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  /** タブ間のキーボードナビゲーション（ArrowLeft/Right） */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    e.preventDefault();
    const currentIndex = categories.indexOf(activeCategory);
    let nextIndex: number;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % categories.length;
    } else {
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    }

    const nextCategory = categories[nextIndex];
    setActiveCategory(nextCategory);

    // 次のタブにフォーカスを移動
    const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[nextIndex]?.focus();
  }, [activeCategory]);

  return (
    <section className={styles.filterSection}>
      <div className={styles.filterInner}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.lead}>こだわりの豆をお届けします</p>

        <div
          className={styles.tablist}
          role="tablist"
          aria-label="商品カテゴリ"
          ref={tablistRef}
          onKeyDown={handleKeyDown}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`tab-${cat}`}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls="product-tabpanel"
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(cat)}
              tabIndex={activeCategory === cat ? 0 : -1}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div id="product-tabpanel" role="tabpanel" aria-labelledby={`tab-${activeCategory}`} aria-live="polite">
          <h2 className={styles.srOnly}>商品一覧</h2>
          <p className={styles.srOnly}>
            {filteredProducts.length}件の商品が表示されています
          </p>
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                imageSrc={imageMap[product.image]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

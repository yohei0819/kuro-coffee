/**
 * ProductFilter — カテゴリフィルター付き商品一覧コンポーネント
 */
import { useState, useRef, useCallback, useMemo, useId } from 'react';
import { products, categoryLabels } from '../../data/products';
import type { ProductCategory } from '../../data/products';
import ProductCard from './ProductCard';
import { getBasePath } from '../../utils/path';
import styles from './ProductFilter.module.css';

/** ProductFilterのprops型 */
interface ProductFilterProps {
  imageMap: Record<string, string>;
}

/** フィルターに使用するカテゴリキーの配列 */
const categories = Object.keys(categoryLabels) as (ProductCategory | 'all')[];

/** 並び替えの種類 */
type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

/** 並び替えオプションのラベル定義 */
const sortLabels: Record<SortOrder, string> = {
  default: 'おすすめ順',
  'price-asc': '価格が安い順',
  'price-desc': '価格が高い順',
  'name-asc': '名前順',
};

/**
 * カテゴリフィルター付き商品一覧を表示するReactコンポーネント
 * @param props - 画像URLマップ
 */
export default function ProductFilter({ imageMap }: ProductFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');
  const tablistRef = useRef<HTMLDivElement>(null);
  const searchId = useId();
  const sortId = useId();

  /** カテゴリ・検索・並び替えを適用した商品一覧 */
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesQuery =
        query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.taste.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        categoryLabels[p.category].toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    switch (sortOrder) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortOrder]);

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

        <div className={styles.controls}>
          <div className={styles.searchField}>
            <label htmlFor={searchId} className={styles.controlLabel}>
              キーワード検索
            </label>
            <input
              id={searchId}
              type="search"
              className={styles.searchInput}
              placeholder="名前・味わいで探す"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className={styles.sortField}>
            <label htmlFor={sortId} className={styles.controlLabel}>
              並び替え
            </label>
            <select
              id={sortId}
              className={styles.sortSelect}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              {(Object.keys(sortLabels) as SortOrder[]).map((order) => (
                <option key={order} value={order}>
                  {sortLabels[order]}
                </option>
              ))}
            </select>
          </div>
        </div>

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
          <p className={styles.resultCount} aria-live="polite">
            {filteredProducts.length}件の商品が表示されています
          </p>
          {filteredProducts.length === 0 ? (
            <p className={styles.emptyState}>
              該当する商品が見つかりませんでした。検索条件を変更してお試しください。
            </p>
          ) : (
            <div className={styles.grid}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageSrc={imageMap[product.image]}
                  detailHref={getBasePath('/products/' + product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

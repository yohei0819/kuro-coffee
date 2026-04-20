/**
 * ProductCard — 商品カードコンポーネント（3D傾斜エフェクト + 光沢付き）
 */
import type { Product } from '../../data/products';
import { getReducedMotion } from '../../utils/a11y';
import styles from './ProductCard.module.css';

/** ProductCardのprops型 */
interface ProductCardProps {
  product: Product;
  imageSrc: string;
  detailHref?: string;
}

/**
 * 商品カードを表示するReactコンポーネント
 * @param props - 商品データと画像URL
 */
export default function ProductCard({ product, imageSrc, detailHref }: ProductCardProps) {
  /** マウス移動時の3D傾斜エフェクト [R14] */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (getReducedMotion()) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    e.currentTarget.style.transform =
      'perspective(1000px) rotateX(' + (-y * 10) + 'deg) rotateY(' + (x * 10) + 'deg)';

    // 光沢エフェクト連動
    const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', mouseXPercent + '%');
    e.currentTarget.style.setProperty('--mouse-y', mouseYPercent + '%');
  };

  /** マウスが離れた時に傾斜をリセット */
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <article
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={`${product.name}のパッケージ`}
          loading="lazy"
          width={300}
          height={400}
          className={styles.image}
          style={{ viewTransitionName: 'product-' + product.id }}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.nameEn}>{product.nameEn}</p>
        <p className={styles.price}>&yen;{product.price.toLocaleString()}</p>
        <p className={styles.description}>{product.description}</p>
        {detailHref && (
          <a href={detailHref} className={styles.detailLink}>詳細を見る →</a>
        )}
      </div>
    </article>
  );
}

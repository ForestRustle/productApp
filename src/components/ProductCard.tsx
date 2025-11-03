import React from 'react';
import { ProductWithLikes } from '../types/product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: ProductWithLikes;
  onToggleLike: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleLike,
  onDelete,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Предотвращаем переход при клике на кнопки
    if ((e.target as HTMLElement).closest(`.${styles.actionButton}`)) {
      return;
    }

    // Для статического экспорта используем обычную навигацию
    const basePath = process.env.NODE_ENV === 'production' ? '/productApp' : '';
    window.location.href = `${basePath}/products/${product.id}/`;
  };

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{truncateText(product.title, 50)}</h3>

        <p className={styles.description}>
          {truncateText(product.description)}
        </p>

        <div className={styles.priceSection}>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.rating}>
            {product.rating.rate} ⭐ ({product.rating.count})
          </span>
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${
              product.isLiked ? styles.likeButtonLiked : styles.likeButton
            }`}
            onClick={(e) =>
              handleButtonClick(e, () => onToggleLike(product.id))
            }
            aria-label={product.isLiked ? 'Убрать лайк' : 'Добавить лайк'}
          >
            {product.isLiked ? '❤️' : '🤍'}
          </button>

          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={(e) => handleButtonClick(e, () => onDelete(product.id))}
            aria-label="Удалить продукт"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

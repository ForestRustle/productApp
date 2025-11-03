import React from 'react';
import styles from './ProductFilters.module.css';

interface ProductFiltersProps {
  filter: 'all' | 'favorites';
  searchQuery: string;
  onFilterChange: (filter: 'all' | 'favorites') => void;
  onSearchChange: (query: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filter,
  searchQuery,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterButtons}>
        <button
          onClick={() => onFilterChange('all')}
          className={`${styles.filterButton} ${
            filter === 'all' ? styles.filterButtonActive : ''
          }`}
        >
          Все товары
        </button>
        <button
          onClick={() => onFilterChange('favorites')}
          className={`${styles.filterButton} ${
            filter === 'favorites' ? styles.filterButtonActive : ''
          }`}
        >
          Избранные
        </button>
      </div>

      <input
        type="text"
        placeholder="Поиск товаров..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default ProductFilters;

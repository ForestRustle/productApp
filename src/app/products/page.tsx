'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setFilter,
  setSearchQuery,
  toggleLike,
  deleteProduct,
} from '../../store/slices/productSlice';
import { fetchProducts } from '../../store/thunks/productThunks';
import {
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
  selectProductsFilter,
  selectSearchQuery,
} from '../../store/selectors/productSelectors';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters';

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectFilteredProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const filter = useAppSelector(selectProductsFilter);
  const searchQuery = useAppSelector(selectSearchQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleToggleLike = (productId: number) => {
    dispatch(toggleLike(productId));
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const handleFilterChange = (newFilter: 'all' | 'favorites') => {
    dispatch(setFilter(newFilter));
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="loading">Загрузка продуктов...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <div>Ошибка: {error}</div>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="btn btnPrimary"
          style={{ marginTop: '10px' }}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingTop: '20px',
        }}
      >
        <h1>Список продуктов</h1>
        <Link href="/create-product" className="btn btnPrimary">
          + Создать продукт
        </Link>
      </div>

      <ProductFilters
        filter={filter}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleLike={handleToggleLike}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          {searchQuery || filter === 'favorites'
            ? 'Продукты не найдены'
            : 'Нет продуктов для отображения'}
        </div>
      )}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            gap: '8px',
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn"
            style={{
              backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Назад
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className="btn"
              style={{
                backgroundColor: currentPage === page ? '#2c5aa0' : 'white',
                color: currentPage === page ? 'white' : '#333',
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn"
            style={{
              backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}

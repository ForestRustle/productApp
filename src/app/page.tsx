'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Добавляем basePath для редиректа
    window.location.href = '/productApp/products/';
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <p>Перенаправление на страницу продуктов...</p>
      <a
        href="/productApp/products/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#2c5aa0',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        Перейти сразу
      </a>
    </div>
  );
}

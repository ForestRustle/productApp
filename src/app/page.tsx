'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Только на клиенте делаем редирект
    window.location.href = '/products/';
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
      <Link
        href="/products"
        style={{
          padding: '12px 24px',
          backgroundColor: '#2c5aa0',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        Перейти сразу
      </Link>
    </div>
  );
}

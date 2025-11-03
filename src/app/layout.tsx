import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product SPA',
  description: 'Single Page Application for product management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const basePath = process.env.NODE_ENV === 'production' ? '/productApp' : '';

  return (
    <html lang="en">
      <head>
        <base href={basePath} />
      </head>
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

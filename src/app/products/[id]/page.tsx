import { productApi } from '../../../utils/api';
import ProductDetailClient from './ProductDetailClient';
import Link from 'next/link';

export async function generateStaticParams() {
  try {
    const products = await productApi.getProducts();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface ProductDetailPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const productId = Number(params.id);

  let product;

  try {
    product = await productApi.getProductById(productId);
    if (!product.rating) {
      product = {
        ...product,
        rating: {
          rate: 0,
          count: 0,
        },
      };
    }
  } catch (error) {
    return (
      <div className="container">
        <div className="error" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ marginBottom: '20px' }}>Продукт не найден</div>
          <Link href="/products" className="btn btnPrimary">
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient initialProduct={product} />;
}

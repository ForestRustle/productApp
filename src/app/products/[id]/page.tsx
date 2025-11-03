import { productApi } from '../../../utils/api';
import ProductDetailClient from './ProductDetailClient';

// Генерируем статические параметры
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

export const dynamicParams = true;

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
  } catch (error) {
    // Если ошибка, возвращаем страницу ошибки
    return (
      <div className="container">
        <div className="error" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ marginBottom: '20px' }}>Продукт не найден</div>
          <a href="/products" className="btn btnPrimary">
            Вернуться к списку
          </a>
        </div>
      </div>
    );
  }

  // Если продукт найден, возвращаем клиентский компонент
  return <ProductDetailClient initialProduct={product} />;
}

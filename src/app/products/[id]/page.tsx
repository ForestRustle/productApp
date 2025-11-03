'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateProduct } from '../../../store/slices/productSlice';
import { selectProductById } from '../../../store/selectors/productSelectors';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const productId = Number(params.id);
  const product = useAppSelector(selectProductById(productId));

  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState(() => ({
    title: product?.title || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || '',
  }));

  const handleSave = () => {
    if (product) {
      dispatch(
        updateProduct({
          id: product.id,
          updates: editForm,
        })
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (product) {
      setEditForm({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    }
    setIsEditing(false);
  };

  if (!product) {
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

  return (
    <div className="container">
      <div style={{ marginBottom: '20px', paddingTop: '20px' }}>
        <Link
          href="/products"
          className="btn"
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            marginRight: '10px',
          }}
        >
          ← Назад к списку
        </Link>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`btn ${isEditing ? 'btnSecondary' : 'btnPrimary'}`}
        >
          {isEditing ? 'Отменить' : 'Редактировать'}
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '30px',
          alignItems: 'start',
        }}
      >
        <div>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'contain',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          />
        </div>

        <div>
          {isEditing ? (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div className="formGroup">
                <label className="formLabel">Название:</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="formInput"
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Цена:</label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: Number(e.target.value) })
                  }
                  className="formInput"
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Категория:</label>
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="formInput"
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Описание:</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  rows={6}
                  className="formInput"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleSave} className="btn btnSuccess">
                  Сохранить
                </button>
                <button onClick={handleCancel} className="btn btnSecondary">
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>
                {product.title}
              </h1>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#2c5aa0',
                  }}
                >
                  ${product.price}
                </span>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span style={{ fontSize: '18px' }}>
                    ⭐ {product.rating.rate}
                  </span>
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    ({product.rating.count} отзывов)
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#e9ecef',
                    color: '#495057',
                    borderRadius: '20px',
                    fontSize: '14px',
                    textTransform: 'capitalize',
                  }}
                >
                  {product.category}
                </span>
              </div>

              <div>
                <h3 style={{ margin: '0 0 8px 0' }}>Описание:</h3>
                <p
                  style={{
                    lineHeight: '1.6',
                    fontSize: '16px',
                    color: '#333',
                  }}
                >
                  {product.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

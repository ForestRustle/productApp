'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '../../../store/hooks';
import { updateProduct } from '../../../store/slices/productSlice';
import { Product } from '../../../types/product';

interface ProductDetailClientProps {
  initialProduct: Product;
}

export default function ProductDetailClient({
  initialProduct,
}: ProductDetailClientProps) {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: initialProduct.title,
    price: initialProduct.price,
    description: initialProduct.description,
    category: initialProduct.category,
  });

  const handleSave = () => {
    dispatch(
      updateProduct({
        id: initialProduct.id,
        updates: editForm,
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: initialProduct.title,
      price: initialProduct.price,
      description: initialProduct.description,
      category: initialProduct.category,
    });
    setIsEditing(false);
  };

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
            src={initialProduct.image}
            alt={initialProduct.title}
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
                {initialProduct.title}
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
                  ${initialProduct.price}
                </span>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span style={{ fontSize: '18px' }}>
                    ⭐ {initialProduct.rating.rate}
                  </span>
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    ({initialProduct.rating.count} отзывов)
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
                  {initialProduct.category}
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
                  {initialProduct.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

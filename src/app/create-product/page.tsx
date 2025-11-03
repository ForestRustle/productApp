'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '../../store/hooks';
import { addProduct } from '../../store/slices/productSlice';
import { CreateProductForm } from '../../types/product';

export default function CreateProductPage() {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<CreateProductForm>({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const [errors, setErrors] = useState<Partial<CreateProductForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateProductForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название должно быть не менее 3 символов';
    }

    const priceValue = Number(formData.price);
    if (!formData.price.trim()) {
      newErrors.price = 'Цена обязательна';
    } else if (priceValue <= 0 || isNaN(priceValue)) {
      newErrors.price = 'Цена должна быть числом больше 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Описание должно быть не менее 10 символов';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Категория обязательна';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'URL изображения обязателен';
    } else if (!/^https?:\/\/.+\..+/.test(formData.image)) {
      newErrors.image = 'Введите корректный URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        rating: { rate: 0, count: 0 },
      };

      dispatch(addProduct(newProduct));

      // Используем window.location для навигации
      const basePath =
        process.env.NODE_ENV === 'production' ? '/productApp' : '';
      window.location.href = `${basePath}/products/`;
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof CreateProductForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px', paddingTop: '20px' }}>
        <Link
          href="/products"
          className="btn"
          style={{ backgroundColor: '#f0f0f0', color: '#333' }}
        >
          ← Назад к списку
        </Link>
      </div>

      <h1 style={{ marginBottom: '30px' }}>Создать новый продукт</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '600px',
        }}
      >
        {/* Остальная часть формы без изменений */}
        <div className="formGroup">
          <label htmlFor="title" className="formLabel">
            Название продукта *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`formInput ${errors.title ? 'formInputError' : ''}`}
            placeholder="Введите название продукта"
          />
          {errors.title && <span className="errorText">{errors.title}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="price" className="formLabel">
            Цена *
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`formInput ${errors.price ? 'formInputError' : ''}`}
            placeholder="0.00"
          />
          {errors.price && <span className="errorText">{errors.price}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="category" className="formLabel">
            Категория *
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`formInput ${errors.category ? 'formInputError' : ''}`}
            placeholder="Введите категорию"
          />
          {errors.category && (
            <span className="errorText">{errors.category}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="image" className="formLabel">
            URL изображения *
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`formInput ${errors.image ? 'formInputError' : ''}`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && <span className="errorText">{errors.image}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="description" className="formLabel">
            Описание *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className={`formInput ${
              errors.description ? 'formInputError' : ''
            }`}
            placeholder="Подробное описание продукта"
            style={{ resize: 'vertical' }}
          />
          {errors.description && (
            <span className="errorText">{errors.description}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btnSecondary' : 'btnPrimary'}`}
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Создание...' : 'Создать продукт'}
        </button>
      </form>
    </div>
  );
}

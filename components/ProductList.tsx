"use client";

import React, { useState, useMemo } from 'react';
import { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export interface ProductListProps {
  products: Product[];
}

/**
 * Client component that renders a grid of products with filter and sort
 * controls. Users can filter by type or category and sort by price.
 */
export default function ProductList({ products }: ProductListProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const types = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.type) set.add(p.type);
    });
    return Array.from(set).sort();
  }, [products]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedType) {
      result = result.filter((p) => p.type === selectedType);
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    result = [...result].sort((a, b) => {
      return sortOrder === 'asc' ? a.priceCents - b.priceCents : b.priceCents - a.priceCents;
    });
    return result;
  }, [products, selectedType, selectedCategory, sortOrder]);

  const handleReset = () => {
    setSelectedType('');
    setSelectedCategory('');
    setSortOrder('asc');
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white py-1.5 pl-2 pr-8 text-sm shadow-sm focus:border-green-400 focus:ring-green-300"
          >
            <option value="">All</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white py-1.5 pl-2 pr-8 text-sm shadow-sm focus:border-green-400 focus:ring-green-300"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
            Sort by price
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white py-1.5 pl-2 pr-8 text-sm shadow-sm focus:border-green-400 focus:ring-green-300"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <a key={product.id} href={`/p/${product.id}`}>
              <ProductCard product={product} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
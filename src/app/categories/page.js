
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );

        setCategories(response.data);

        if (response.data.length > 0) {
          setSelectedCategory(response.data[0]);
        }
      } catch (error) {
        setError("Categories load nahi ho payi. Please try again.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products whenever selected category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProducts = async () => {
      setLoadingProducts(true);
      setError("");
      setProducts([]);

      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(
            selectedCategory
          )}`
        );

        setProducts(response.data);
      } catch (error) {
        setError("Products load nahi ho paye. Please try again.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const formatCategory = (category) =>
    category.replace(/'/g, "").replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-950 px-5 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
            Find Your Favorites
          </p>

          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Shop by Category
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Explore our collection and discover products
            that match your style and everyday needs.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              Explore Categories
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              Quality Products
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
        {/* Category Selection */}
        <div className="mb-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                EXPLORE OUR COLLECTION
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Choose a Category
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              {categories.length} categories available
            </p>
          </div>

          {loadingCategories ? (
            <p className="rounded-xl bg-white p-6 text-slate-500 shadow-sm">
              Loading categories...
            </p>
          ) : error && categories.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-red-600 shadow-sm">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold capitalize transition duration-200 hover:-translate-y-0.5 ${
                    selectedCategory === category
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  {formatCategory(category)}
                  {selectedCategory === category && (
                    <span className="ml-2">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Heading */}
        {selectedCategory && (
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                OUR PRODUCTS
              </p>

              <h2 className="mt-2 text-2xl font-bold capitalize sm:text-3xl">
                {formatCategory(selectedCategory)}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {loadingProducts
                  ? "Finding products for you..."
                  : `${products.length} products found`}
              </p>
            </div>

            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              Selected Category
            </span>
          </div>
        )}

        {/* Products Grid */}
        {loadingProducts ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="h-40 rounded-xl bg-slate-100" />
                <div className="mt-5 h-4 w-3/4 rounded bg-slate-100" />
                <div className="mt-3 h-4 w-1/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() =>
                setSelectedCategory((current) => current)
              }
              className="mt-4 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Retry
            </button>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold">
              No products found
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Please select another category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

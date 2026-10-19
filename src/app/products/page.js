
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import Icon from "@/app/components/icons/icons";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromUrl);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsPerPage = 8;

  // Fetch products and categories using Axios
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, categoriesResponse] =
          await Promise.all([
            axios.get("https://fakestoreapi.com/products"),
            axios.get(
              "https://fakestoreapi.com/products/categories"
            ),
          ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Products load nahi ho paaye. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Update category when URL query changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Reset page when search, sort, or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, selectedCategory]);

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "title-az") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* Page Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-6 sm:py-16">
            <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">
              Our Collection
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Discover Our Products
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore our collection, find your favourites,
              and choose the products that suit you best.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12">

          {/* Search and Sort Toolbar */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end">

              {/* Search */}
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="product-search"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Search products
                </label>

                <div className="flex h-14 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                  <span className="shrink-0 text-slate-400">
                    <Icon name="search" size={21} />
                  </span>

                  <input
                    id="product-search"
                    type="search"
                    placeholder="Search by product name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="shrink-0 rounded-lg px-2 py-1.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Find your favourite products quickly
                </p>
              </div>

              {/* Sort */}
              <div className="w-full lg:w-72">
                <label
                  htmlFor="product-sort"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Sort products
                </label>

                <div className="relative">
                  <select
                    id="product-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm font-semibold text-slate-700 outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="default">Recommended</option>
                    <option value="price-low">
                      Price: Low to High
                    </option>
                    <option value="price-high">
                      Price: High to Low
                    </option>
                    <option value="title-az">
                      Name: A to Z
                    </option>
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Icon name="right" size={16} />
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Arrange products your way
                </p>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">
              Browse Categories
            </h2>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === "all"
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                All Products
              </button>

              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold capitalize transition ${
                    selectedCategory === category
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Heading */}
          {!loading && !error && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Explore Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Showing{" "}
                  {sortedProducts.length === 0
                    ? 0
                    : startIndex + 1}
                  {"–"}
                  {Math.min(
                    startIndex + productsPerPage,
                    sortedProducts.length
                  )}
                  {" of "}
                  {sortedProducts.length} products
                </p>
              </div>

              <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
                {sortedProducts.length} products found
              </span>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

              <p className="font-medium text-slate-700">
                Loading products...
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Please wait a moment
              </p>
            </div>
          )}

          {/* API Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-white px-5 py-16 text-center">
              <h2 className="text-xl font-bold text-red-600">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Product Grid */}
          {!loading &&
            !error &&
            currentProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}

          {/* No Products Found */}
          {!loading &&
            !error &&
            sortedProducts.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon name="search" size={28} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try a different search term or select another category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("all");
                    setSortBy("default");
                  }}
                  className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-current={
                    currentPage === page ? "page" : undefined
                  }
                  className={`h-11 min-w-11 rounded-xl border px-3 text-sm font-bold transition ${
                    currentPage === page
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                disabled={currentPage === totalPages}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import Icon from "@/app/components/icons/icons";
import { useEffect, useState } from "react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/images/electonics.jfif",
    description: "Latest gadgets & devices",
  },
  {
    id: 2,
    name: "Fashion",
    image: "/images/fashion.jfif",
    description: "Style for every occasion",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "/images/Home & Kitchen.jfif",
    description: "Make your home better",
  },
  {
    id: 4,
    name: "Beauty",
    image: "/images/beauty.jfif",
    description: "Feel good, look great",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics",
    image: "/images/laptop.jfif",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 20000,
    category: "Electronics",
    image: "/images/mobile.jfif",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Headphones",
    price: 2000,
    category: "Electronics",
    image: "/images/headphones.jfif",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 4999,
    category: "Accessories",
    image: "/images/Smart Watch.jfif",
    rating: 4.4,
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    "/images/banner5.jfif",
    "/images/banner4.jpg",
    "/images/banner6.jfif",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Header />

      <main className="bg-gray-50">

        {/* ================= HERO BANNER ================= */}
        {/* ================= HERO CAROUSEL ================= */}
            <section className="mx-auto max-w-7xl px-6 pt-6">
              <div className="relative overflow-hidden rounded-3xl">

                {/* Banners */}
                <div className="relative aspect-[16/6] overflow-hidden rounded-3x">
                  {banners.map((banner, index) => (
                    <img
                        key={banner}
                        src={banner}
                        alt={`Mini Shop Banner ${index + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                          currentSlide === index
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                  ))}
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Banner Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-xl px-12 text-white">

                    <p className="text-sm font-semibold uppercase tracking-[0.25em]">
                      Welcome to Mini Shop
                    </p>

                    <h1 className="mt-4 text-5xl font-bold leading-tight">
                      Everything You Need
                      <br />
                      In One Place
                    </h1>

                    <p className="mt-5 max-w-md text-base text-white/90">
                      Explore quality products at affordable prices
                      and discover something you will love.
                    </p>

                    <a
                      href="/products"
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                    >
                      Shop Now
                      <Icon name="arrow-right" size={18} />
                    </a>

                  </div>
                </div>

                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (currentSlide - 1 + banners.length) % banners.length
                    )
                  }
                  className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow transition hover:bg-white"
                >
                  <Icon name="left"/>
                </button>

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (currentSlide + 1) % banners.length
                    )
                  }
                  className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow transition hover:bg-white"
                >
                  <Icon name="right"/>
                </button>

                {/* Dots */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlide === index
                          ? "w-7 bg-white"
                          : "w-2.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>

              </div>
            </section>

        {/* ================= CATEGORIES ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Shop By Category
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Popular Categories
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Explore our popular categories and find products that
              match your needs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-6">
            {categories.map((category) => (
              <a
                key={category.id}
                href="/products"
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {category.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    Explore
                    <Icon name="right" size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </section>

        {/* ================= FEATURED PRODUCTS ================= */}
        <section className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-16">

    {/* Heading */}
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
        Our Selection
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900">
        Featured Products
      </h2>

      <p className="mt-3 text-gray-600">
        Check out some of our popular products.
      </p>

      <a
        href="/products"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:underline"
      >
        View All
        <Icon name="right" size={17} />
      </a>
    </div>

    {/* Products */}
    <div className="mt-10 grid grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>

  </div>
</section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Why Mini Shop
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Shopping Made Simple
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6">

            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Icon name="truck" size={25} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Get your favorite products delivered quickly
                and conveniently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Icon name="lock" size={25} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Secure Shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Shop with confidence with a safe and secure
                shopping experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Icon name="return" size={25} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Easy Returns
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Simple and hassle-free returns for a better
                shopping experience.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
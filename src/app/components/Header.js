import Icon from "@/app/components/icons/icons";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const totalItems = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );

      setCartCount(totalItems);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900">
          Mini Shop
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Home
          </a>

          <a
            href="/products"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Products
          </a>

          <a
            href="/categories"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Categories
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="flex items-center rounded-full border border-gray-300 px-4 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-44 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Wishlist */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg transition hover:bg-gray-100"
          >
            <Icon name="heart"/>
          </button>

          {/* Cart */}
          <Link
          href="/cart"
          aria-label={`Shopping cart, ${cartCount} items`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg transition hover:bg-gray-100"
        >
          <Icon name="cart" size={20} />

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
          </Link>
          {/* Register */}
          <a
            href="/register"
            className="rounded-full border border-gray-900 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            Register
          </a>
          {/* Login */}
          <a
            href="/login"
            className="rounded-full border border-gray-900 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            Login
          </a>

        </div>
      </div>
    </header>
  );
}
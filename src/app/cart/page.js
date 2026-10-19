
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Icon from "@/app/components/icons/icons";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        const parsedCart = savedCart
          ? JSON.parse(savedCart)
          : [];

        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Cart loading error:", error);
        setCart([]);
      }

      setIsLoaded(true);
    };

    loadCart();

    // Listen for cart updates from ProductCard
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // Save cart and notify other components
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase or decrease quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id !== id) return item;

      const currentQuantity = Number(item.quantity) || 1;
      const newQuantity = currentQuantity + change;

      return {
        ...item,
        quantity: Math.max(1, newQuantity),
      };
    });

    saveCart(updatedCart);
  };

  // Remove product
  const removeProduct = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    saveCart(updatedCart);
    toast.success("Product removed from cart");
  };

  // Calculate totals
  const totalItems = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * (Number(item.quantity) || 1),
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* Page Heading */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Your Shopping Bag
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-3 text-slate-500">
              Review your products and manage your order.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12">
          {!isLoaded ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500">
              Loading your cart...
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Icon name="shopping-cart" size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Looks like you haven't added any products yet.
                Explore our collection and find something you love.
              </p>

              <Link
                href="/products"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                <Icon name="shopping-cart" size={17} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              {/* Cart Products */}
              <div className="space-y-4 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Cart Items
                  </h2>

                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                    {totalItems} items
                  </span>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:p-5"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.id}`}
                      className="flex h-32 w-full shrink-0 items-center justify-center rounded-xl bg-slate-50 p-3 sm:h-28 sm:w-28"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                        {item.category}
                      </p>

                      <Link
                        href={`/products/${item.id}`}
                        className="mt-1 block line-clamp-2 font-bold leading-6 text-slate-800 transition hover:text-indigo-600"
                      >
                        {item.title}
                      </Link>

                      <p className="mt-2 text-lg font-extrabold text-slate-900">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={Number(item.quantity) <= 1}
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                            className="flex h-9 w-10 items-center justify-center rounded-l-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            −
                          </button>

                          <span className="min-w-9 text-center text-sm font-bold text-slate-900">
                            {item.quantity || 1}
                          </span>

                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                            className="flex h-9 w-10 items-center justify-center rounded-r-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeProduct(item.id)}
                          className="rounded-full px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="border-t border-slate-100 pt-3 sm:border-0 sm:pt-0 sm:text-right">
                      <p className="text-xs text-slate-500">
                        Item total
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-slate-900">
                        {formatPrice(
                          Number(item.price) *
                            (Number(item.quantity) || 1)
                        )}
                      </p>
                    </div>
                  </div>
                ))}

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                  <span aria-hidden="true">←</span>
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-slate-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">
                      Subtotal ({totalItems} items)
                    </span>

                    <span className="font-semibold text-slate-800">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">
                      Shipping
                    </span>

                    <span className="font-semibold text-emerald-600">
                      Free
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-slate-900">
                        Total
                      </span>

                      <span className="text-2xl font-extrabold text-indigo-600">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    toast("Checkout functionality is coming next!")
                  }
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.99]"
                >
                  Proceed to Checkout
                  <span aria-hidden="true">→</span>
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Your cart items are saved in this browser.
                </p>
              </aside>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

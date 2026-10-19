
"use client";

import Link from "next/link";
import Icon from "@/app/components/icons/icons";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      const cart = savedCart ? JSON.parse(savedCart) : [];

      const existingProduct = cart.find(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          { ...product, quantity: 1 },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Notify the Header and other components
      window.dispatchEvent(new Event("cartUpdated"));

     toast.success("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Product cart mein add nahi ho paaya.");
    }
  };

  return (
    
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">

      {/* Product Image */}
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-slate-50 p-5">
        <img
          src={product.image}
          alt={product.title}
          
          className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
        />

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-600 shadow-sm transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
        >
          <Icon name="heart" size={18} />
        </button>

        {/* Rating Badge */}
        {product.rating?.rate != null && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="text-amber-500">
              <Icon name="star" size={14} />
            </span>

            {product.rating.rate}

            {product.rating.count != null && (
              <span className="text-slate-400">
                ({product.rating.count})
              </span>
            )}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          {product.category}
        </p>

        <h3 className="mt-2 min-h-12 line-clamp-2 text-base font-semibold leading-6 text-slate-800 transition group-hover:text-indigo-700">
          {product.title}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-extrabold text-slate-900">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            In Stock
          </span>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          <Icon name="shopping-cart" size={17} />
          Add to Cart
        </button>

        {/* View Product */}
        <Link
          href={`/products/${product.id}`}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-600 hover:text-indigo-600"
        >
          View Product
          <Icon name="right" size={16} />
        </Link>
        
      </div>
    </div>
  );
}

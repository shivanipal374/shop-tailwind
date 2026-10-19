"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => {
        setError("Product load nahi hua.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Link href="/products" className="text-blue-600">
        ← Back to Products
      </Link>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 w-full object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="mt-4 text-2xl font-semibold">
            ${product.price}
          </p>

          <p className="mt-3 text-gray-600">
            Category: {product.category}
          </p>

          <p className="mt-4">{product.description}</p>

          <p className="mt-4">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>
        </div>
      </div>
    </main>
  );
}
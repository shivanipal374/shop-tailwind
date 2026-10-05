import Icon from "@/app/components/icons/icons";

export default function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <div className="relative flex h-60 items-center justify-center bg-gray-100">

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-gray-900 hover:text-white"
        >
          <Icon name="heart" size={18} />
        </button>

      </div>

      {/* Product Info */}
      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-2 text-base font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">

          <p className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Icon name="star" size={15} />
            <span>{product.rating}</span>
          </div>

        </div>

        {/* View Product */}
        <a
          href={`/product/${product.id}`}
          className="mt-4 block rounded-full border border-gray-900 py-2.5 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
        >
          View Product
        </a>

      </div>
    </div>
  );
}
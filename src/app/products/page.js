import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";

const products = [
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
  {
    id: 5,
    name: "Running Shoes",
    price: 2999,
    category: "Fashion",
    image: "/images/Running Shoes.jfif",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Perfume",
    price: 299,
    category: "Fashion",
    image: "/images/Perfume.jfif",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 2999,
    category: "Electronics",
    image: "/images/Coffee Maker.jfif",
    rating: 4.7,
  },
];


export default function ProductsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">

        {/* Page Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-12 text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Our Collection
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-gray-900">
                    All Products
                    </h1>

                    <p className="mt-3 text-gray-600">
                    Explore our collection of quality products.
                    </p>

                </div>
            </section>


        {/* Products */}
        <section className="mx-auto max-w-7xl px-6 py-12">

          <div className="grid grid-cols-4 gap-6">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
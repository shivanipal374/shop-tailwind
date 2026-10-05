import Icon from "@/app/components/icons/icons";
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Mini Shop
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Find everything you need in one place.
              Quality products at affordable prices.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:bg-white hover:text-gray-900"
              >
                F
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:bg-white hover:text-gray-900"
              >
                I
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:bg-white hover:text-gray-900"
              >
                {/* < Icon name="twitter" size={17} /> */}
                T
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <a
                href="/"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Home
              </a>

              <a
                href="/products"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Products
              </a>

              <a
                href="/categories"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Categories
              </a>

              <a
                href="/cart"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Cart
              </a>

            </div>
          </div>


          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Customer Service
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <a
                href="#"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Contact Us
              </a>

              <a
                href="#"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Shipping Information
              </a>

              <a
                href="#"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Returns & Refunds
              </a>

              <a
                href="#"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                FAQs
              </a>

            </div>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>

            <div className="mt-5 flex flex-col gap-4">

              <div className="flex items-start gap-3">
                < Icon name="location" size={17} />

                <p className="text-sm leading-6 text-gray-400">
                  New Delhi, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                < Icon name="contact" size={17} />

                <p className="text-sm text-gray-400">
                  +91 98765 43210
                </p>
              </div>

              <div className="flex items-center gap-3">
                < Icon name="mail" size={17} />

                <p className="text-sm text-gray-400">
                  support@minishop.com
                </p>
              </div>

            </div>
          </div>

        </div>


        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6">

          <p className="text-center text-sm text-gray-500">
            © 2026 Mini Shop. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}
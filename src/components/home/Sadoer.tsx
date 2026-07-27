import { sadoerProduct } from "../../data/sadoer";
import { ShoppingBag } from "lucide-react";
import LazyImage from "./LazyImage";

const Sadoer = () => {
  return (
    <section id="sadoer" className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
          SADOER Collection
        </p>
        <h2 className="mt-4 font-serif text-4xl font-normal text-[#2E2E2E]">
          Complete Your Skincare Routine
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          From nourishing creams to collagen serums, discover SADOER products designed to hydrate, brighten and support healthier-looking skin every day.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sadoerProduct.map((product) => (
          <article
            key={product.id}
            className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 hover:border-[#C9A227]/30 transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-square w-full overflow-hidden bg-[#FAF8F4]">
              <LazyImage
                src={product.image}
                alt={product.name}
                className="w-full h-full p-6"
                imgClassName="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  {product.brand}
                </span>
                {product.brand && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-[#C9A227] px-2 py-0.5 rounded-full">
                    {product.brand}
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-semibold text-gray-800 text-lg line-clamp-1">
                {product.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm line-clamp-3 flex-grow">
                {product.description}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                <span className="font-bold text-xl text-[#2E2E2E]">
                  ₦{product.price.toLocaleString()}
                </span>
                <a
                  href="#order"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A227] hover:text-white hover:bg-[#C9A227] border border-[#C9A227] px-4 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  Order Now
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Sadoer;
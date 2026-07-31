import { sadoerProduct } from "../../data/sadoer";
import { ShoppingBag } from "lucide-react";
import LazyImage from "./LazyImage";

interface SadoerProps {
  onSelectProduct?: (id: string) => void;
}

const Sadoer = ({ onSelectProduct }: SadoerProps) => {
  return (
    <section id="sadoer" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
          SADOER Collection
        </p>
        <h2 className="mt-4 font-serif text-4xl font-normal text-[#2E2E2E]">
          Complete Your Skincare Routine
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          From nourishing creams to collagen serums, discover SADOER products
          designed to hydrate, brighten and support healthier-looking skin every
          day.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sadoerProduct.map((product) => {
          const isOutOfStock = product.inStock === false;

          return (
            <article
              key={product.id}
              className={`group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 ${
                isOutOfStock
                  ? "opacity-80"
                  : "hover:shadow-2xl hover:-translate-y-2 hover:border-[#C9A227]/30"
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F4]">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full p-6"
                  imgClassName={`object-contain transition-transform duration-500 ${
                    isOutOfStock ? "grayscale" : "group-hover:scale-105"
                  }`}
                />
                {isOutOfStock && (
                  <div className="absolute top-3 left-3 bg-gray-800 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {isOutOfStock ? (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-gray-500 px-2 py-0.5 rounded-full">
                      Out of Stock
                    </span>
                  ) : (
                    product.brand && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-[#C9A227] px-2 py-0.5 rounded-full">
                        {product.brand}
                      </span>
                    )
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
                  {isOutOfStock ? (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      type="button"
 onClick={() => onSelectProduct?.(`sadoer-${product.id}`)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A227] hover:text-white hover:bg-[#C9A227] border border-[#C9A227] px-4 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      Shop On WhatsApp
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Sadoer;
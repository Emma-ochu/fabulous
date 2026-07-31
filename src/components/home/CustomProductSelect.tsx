import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock?: boolean;
}

interface CustomProductSelectProps {
  products: CatalogProduct[];
  selectedId: string;
  onSelect: (id: string) => void;
  error?: string;
}

export const CustomProductSelect = ({
  products,
  selectedId,
  onSelect,
  error,
}: CustomProductSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedProduct =
    products.find((p) => p.id === selectedId) || products[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Select Product <span className="text-red-500">*</span>
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border bg-white transition-all text-left shadow-sm ${
          error
            ? "border-red-400 bg-red-50/20"
            : isOpen
            ? "border-[#C9A227] ring-2 ring-[#C9A227]/20"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center gap-2 truncate pr-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF8F4] text-[#C9A227] border border-[#C9A227]/30 shrink-0">
            {selectedProduct?.category}
          </span>
          <span className="font-semibold text-gray-800 text-sm truncate">
            {selectedProduct?.name}
          </span>
          {selectedProduct?.inStock === false && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-600 shrink-0">
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-bold text-xs text-gray-900 bg-gray-100 px-2 py-1 rounded-lg">
            ₦{selectedProduct?.price.toLocaleString()}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#C9A227]" : ""
            }`}
          />
        </div>
      </button>

      {/* Menu Options Popover */}
      {isOpen && (
        <div className="absolute z-40 left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 space-y-1">
          {products.map((product) => {
            const isSelected = product.id === selectedId;
            const isOutOfStock = product.inStock === false;

            return (
              <button
                key={product.id}
                type="button"
                disabled={isOutOfStock}
                onClick={() => {
                  if (!isOutOfStock) {
                    onSelect(product.id);
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                  isOutOfStock
                    ? "opacity-50 cursor-not-allowed bg-gray-50/60 text-gray-400"
                    : isSelected
                    ? "bg-[#FAF8F4] text-gray-900 font-semibold"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex flex-col gap-0.5 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium line-clamp-1">
                      {product.name}
                    </span>
                    {isOutOfStock && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-600 shrink-0">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#C9A227]">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-gray-900">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {isSelected && !isOutOfStock ? (
                    <Check className="w-4 h-4 text-[#C9A227]" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
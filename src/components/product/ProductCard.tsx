import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { ProductDetail } from "../../data/catalog";
import { useCart } from "../../hooks/useCart";
import LazyImage from "../home/LazyImage";

interface ProductCardProps {
  product: ProductDetail;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const isOutOfStock = product.inStock === false;

  return (
    <article className='group flex flex-col overflow-hidden rounded-2xl border border-[#EDE7DF] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-luxury-card'>
      <Link to={`/products/${product.slug}`} className='block'>
        <div className='relative aspect-square overflow-hidden bg-[#FAF8F4]'>
          {product.badge && (
            <span className='absolute left-4 top-4 z-10 rounded-full bg-[#C9A227] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white'>
              {product.badge}
            </span>
          )}
          {isOutOfStock && (
            <span className='absolute right-4 top-4 z-10 rounded-full bg-[#2E2E2E] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white'>
              Out of stock
            </span>
          )}
          <LazyImage
            src={product.image}
            alt={product.name}
            className='h-full w-full p-6'
            imgClassName={`object-contain transition-transform duration-700 ${isOutOfStock ? "grayscale opacity-70" : "group-hover:scale-105"}`}
          />
        </div>
      </Link>

      <div className='flex flex-1 flex-col p-5 sm:p-6'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B89218]'>
          {product.brand}
        </p>
        <Link to={`/products/${product.slug}`} className='mt-2'>
          <h2 className='font-serif text-xl leading-tight text-stone-900 transition-colors group-hover:text-[#8A6A0D]'>
            {product.name}
          </h2>
        </Link>
        <p className='mt-3 line-clamp-3 flex-1 text-sm leading-6 text-stone-600'>
          {product.description}
        </p>
        <div className='mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4'>
          <span className='font-semibold text-stone-900'>
            ₦{product.price.toLocaleString()}
          </span>
          {isOutOfStock ?
            <span className='text-xs font-semibold uppercase tracking-wide text-stone-400'>
              Unavailable
            </span>
          : <button
              type='button'
              onClick={() => {
                addItem(product.id);
                setIsAdded(true);
              }}
              className='inline-flex items-center gap-2 rounded-xl border border-[#C9A227] px-3 py-2 text-xs font-semibold text-stone-900 transition-colors hover:bg-[#C9A227] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2'
            >
              <ShoppingBag className='h-3.5 w-3.5' aria-hidden='true' />
              {isAdded ? "Added" : "Add to order"}
            </button>
          }
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

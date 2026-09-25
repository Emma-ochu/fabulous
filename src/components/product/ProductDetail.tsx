import { Link, useNavigate } from "react-router-dom";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import type { ProductDetail as Product } from "../../data/catalog";
import { getRelatedProducts } from "../../data/catalog";
import { useCart } from "../../hooks/useCart";
import ProductCard from "./ProductCard";
import LazyImage from "../home/LazyImage";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const isOutOfStock = product.inStock === false;

  const addToOrder = () => {
    addItem(product.id, quantity);
    setIsAdded(true);
  };

  const goToCheckout = () => {
    addItem(product.id, quantity);
    navigate("/checkout");
  };

  return (
    <main className='bg-[#FAF8F4]'>
      <section className='mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-10 md:pb-24 md:pt-12'>
        <nav className='mb-8 text-xs text-stone-500' aria-label='Breadcrumb'>
          <Link to='/' className='hover:text-[#8A6A0D]'>
            Home
          </Link>
          <span className='mx-2'>/</span>
          <Link to='/products' className='hover:text-[#8A6A0D]'>
            Collection
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-stone-800'>{product.name}</span>
        </nav>

        <div className='grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20'>
          <div className='relative aspect-square overflow-hidden rounded-3xl border border-[#E7DED2] bg-white p-5 md:p-10'>
            {product.badge && (
              <span className='absolute left-6 top-6 z-10 rounded-full bg-[#C9A227] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white'>
                {product.badge}
              </span>
            )}
            <LazyImage
              src={product.image}
              alt={product.name}
              className='h-full w-full'
              imgClassName='object-contain'
            />
          </div>

          <div className='lg:pt-8'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89218]'>
              {product.brand} · {product.category}
            </p>
            <h1 className='mt-4 max-w-xl font-serif text-4xl leading-[1.05] text-stone-900 sm:text-5xl'>
              {product.name}
            </h1>
            <p className='mt-5 font-serif text-2xl text-stone-900'>
              ₦{product.price.toLocaleString()}
            </p>
            <p
              className={`mt-3 text-sm font-semibold ${isOutOfStock ? "text-stone-500" : "text-emerald-700"}`}
            >
              {isOutOfStock ?
                "Currently unavailable"
              : "In stock · Ready for concierge order"}
            </p>
            <p className='mt-6 text-base leading-8 text-stone-600'>
              {product.description}
            </p>

            <div className='mt-8 border-y border-[#E7DED2] py-6'>
              <p className='text-xs font-semibold uppercase tracking-[0.16em] text-stone-700'>
                Quantity
              </p>
              <div className='mt-3 flex items-center gap-3'>
                <div className='inline-flex items-center rounded-xl border border-[#D8CDBE] bg-white'>
                  <button
                    type='button'
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    disabled={isOutOfStock}
                    aria-label='Decrease quantity'
                    className='px-4 py-3 text-stone-500 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    −
                  </button>
                  <span className='min-w-10 text-center text-sm font-semibold'>
                    {quantity}
                  </span>
                  <button
                    type='button'
                    onClick={() => setQuantity((current) => current + 1)}
                    disabled={isOutOfStock}
                    aria-label='Increase quantity'
                    className='px-4 py-3 text-stone-500 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    +
                  </button>
                </div>
                <button
                  type='button'
                  onClick={addToOrder}
                  disabled={isOutOfStock}
                  className='inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1C1C1C] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#C9A227] disabled:cursor-not-allowed disabled:bg-stone-300'
                >
                  <ShoppingBag className='h-4 w-4' />
                  {isAdded ? "Added to bag" : "Add to order"}
                </button>
              </div>
              <button
                type='button'
                onClick={goToCheckout}
                disabled={isOutOfStock}
                className='mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8A6A0D] hover:text-stone-900'
              >
                <MessageCircle className='h-4 w-4' /> Order via WhatsApp
                concierge
              </button>
            </div>

            <div className='mt-7 grid gap-3 sm:grid-cols-2'>
              {[
                "Authenticity checked",
                "Delivery across Nigeria",
                "Personal order support",
                "Clear product guidance",
              ].map((item) => (
                <div
                  key={item}
                  className='flex items-center gap-2 text-sm text-stone-600'
                >
                  <Check className='h-4 w-4 text-[#B89218]' />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='border-y border-[#E7DED2] bg-white/60'>
        <div className='mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:px-10 md:py-20'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B89218]'>
              Why it belongs
            </p>
            <h2 className='mt-3 font-serif text-3xl text-stone-900'>
              A considered step in your ritual.
            </h2>
          </div>
          <div>
            <h3 className='font-semibold text-stone-900'>Benefits</h3>
            <ul className='mt-4 space-y-3 text-sm leading-6 text-stone-600'>
              {product.benefits.map((benefit) => (
                <li key={benefit} className='flex gap-2'>
                  <Check className='mt-1 h-4 w-4 shrink-0 text-[#B89218]' />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-stone-900'>How to use</h3>
            <ol className='mt-4 space-y-3 text-sm leading-6 text-stone-600'>
              {product.howToUse.map((step, index) => (
                <li key={step}>
                  <span className='mr-2 font-semibold text-[#B89218]'>
                    0{index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className='mt-5 text-sm text-stone-600'>
              <strong className='font-semibold text-stone-900'>
                Suitable for:
              </strong>{" "}
              {product.suitableFor}
            </p>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B89218]'>
              Continue exploring
            </p>
            <h2 className='mt-3 font-serif text-3xl text-stone-900'>
              You may also like
            </h2>
          </div>
          <Link
            to='/products'
            className='text-sm font-semibold text-[#8A6A0D] hover:text-stone-900'
          >
            View collection
          </Link>
        </div>
        <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {getRelatedProducts(product).map((related) => (
            <ProductCard key={related.id} product={related} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;

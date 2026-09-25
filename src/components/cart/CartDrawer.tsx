import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Minus, Plus, X } from "lucide-react";
import { getProductById } from "../../data/catalog";
import { useCart } from "../../hooks/useCart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[70] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type='button'
        aria-label='Close shopping bag'
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-black/35 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        ref={drawerRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby='shopping-bag-title'
        aria-hidden={!isOpen}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#FFFDF9] shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className='flex items-center justify-between border-b border-stone-200 px-6 py-5'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B89218]'>
              Your selection
            </p>
            <h2
              id='shopping-bag-title'
              className='mt-1 font-serif text-2xl text-stone-900'
            >
              Shopping bag
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type='button'
            onClick={onClose}
            aria-label='Close shopping bag'
            className='rounded-full p-2 text-stone-500 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto px-6 py-5'>
          {items.length === 0 ?
            <div className='flex h-full flex-col items-center justify-center text-center'>
              <p className='font-serif text-2xl text-stone-900'>
                Your bag is quiet.
              </p>
              <p className='mt-2 max-w-xs text-sm leading-6 text-stone-500'>
                Explore the collection and add something considered to your
                routine.
              </p>
              <Link
                to='/products'
                onClick={onClose}
                className='mt-6 rounded-xl bg-[#1C1C1C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#C9A227]'
              >
                Explore collection
              </Link>
            </div>
          : <div className='space-y-5'>
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                return (
                  <div
                    key={item.productId}
                    className='flex gap-4 border-b border-stone-100 pb-5'
                  >
                    <img
                      src={product.image}
                      alt=''
                      className='h-20 w-20 rounded-xl bg-[#FAF8F4] object-contain p-2'
                    />
                    <div className='min-w-0 flex-1'>
                      <Link
                        to={`/products/${product.slug}`}
                        onClick={onClose}
                        className='font-serif text-base leading-tight text-stone-900 hover:text-[#8A6A0D]'
                      >
                        {product.name}
                      </Link>
                      <p className='mt-1 text-sm text-stone-600'>
                        ₦{product.price.toLocaleString()}
                      </p>
                      <div className='mt-3 flex items-center justify-between gap-3'>
                        <div className='inline-flex items-center rounded-lg border border-stone-200'>
                          <button
                            type='button'
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            aria-label={`Decrease ${product.name} quantity`}
                            className='p-1.5 text-stone-500 hover:text-stone-900'
                          >
                            <Minus className='h-3.5 w-3.5' />
                          </button>
                          <span className='min-w-7 text-center text-xs font-semibold text-stone-800'>
                            {item.quantity}
                          </span>
                          <button
                            type='button'
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            aria-label={`Increase ${product.name} quantity`}
                            className='p-1.5 text-stone-500 hover:text-stone-900'
                          >
                            <Plus className='h-3.5 w-3.5' />
                          </button>
                        </div>
                        <button
                          type='button'
                          onClick={() => removeItem(item.productId)}
                          className='text-xs text-stone-400 underline-offset-2 hover:text-stone-900 hover:underline'
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>

        {items.length > 0 && (
          <div className='border-t border-stone-200 px-6 py-5'>
            <div className='flex items-center justify-between text-sm text-stone-600'>
              <span>Subtotal</span>
              <strong className='font-serif text-xl text-stone-900'>
                ₦{subtotal.toLocaleString()}
              </strong>
            </div>
            <p className='mt-2 text-xs leading-5 text-stone-500'>
              Delivery details and confirmation happen with our WhatsApp
              concierge.
            </p>
            <Link
              to='/checkout'
              onClick={onClose}
              className='mt-4 flex w-full items-center justify-center rounded-xl bg-[#1C1C1C] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#C9A227]'
            >
              Continue to checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;

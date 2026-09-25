import { ShoppingBag } from "lucide-react";
import { useCart } from "../../hooks/useCart";

interface CartButtonProps {
  onClick: () => void;
  compact?: boolean;
}

const CartButton = ({ onClick, compact = false }: CartButtonProps) => {
  const { itemCount } = useCart();

  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      className={`relative inline-flex items-center gap-2 rounded-full border border-[#C9A227]/50 text-stone-800 transition-colors hover:bg-[#C9A227]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] ${compact ? "p-2.5" : "px-4 py-2.5 text-sm"}`}
    >
      <ShoppingBag className='h-4 w-4' aria-hidden='true' />
      {!compact && <span>Bag</span>}
      {itemCount > 0 && (
        <span className='inline-flex min-w-5 items-center justify-center rounded-full bg-[#1C1C1C] px-1.5 py-0.5 text-[10px] font-bold text-white'>
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;

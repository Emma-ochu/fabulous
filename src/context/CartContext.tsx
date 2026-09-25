import { useEffect, useState, type PropsWithChildren } from "react";
import { getProductById } from "../data/catalog";
import { CartContext, type CartItem } from "./cart";
const storageKey = "fabulouss-cart";

const readStoredCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).productId === "string" &&
        typeof (item as CartItem).quantity === "number" &&
        (item as CartItem).quantity > 0 &&
        Boolean(getProductById((item as CartItem).productId)),
    );
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, quantity = 1) => {
    const product = getProductById(productId);
    if (!product || product.inStock === false) return;

    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId ?
            { ...item, quantity: item.quantity + Math.max(1, quantity) }
          : item,
        );
      }
      return [...current, { productId, quantity: Math.max(1, quantity) }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setItems([]);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

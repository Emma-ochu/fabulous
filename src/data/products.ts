import blue from "../assets/blue.png";
import sudocrem from "../assets/sudocrem.png";
import kormesic from "../assets/kormesic.png";
import turmericFace from "../assets/turmeric-face.png";

export interface Product {
  id: number | string;
  name: string;
  brand?: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  inStock?: boolean;
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Kormesic 99% Vitamin C Underarm Cream",
    brand: "Kormesic",
    price: 5000,
    image: kormesic,
    description:
      "Brightens dark underarms, fades stubborn dark spots, moisturizes and nourishes the skin. Leaves your underarms feeling soft and smooth. Suitable for consistent daily use. Wear sleeveless outfits with confidence again!",
    badge: "Hot",
    inStock: true,
  },
  {
    id: 2,
    name: "Sudocrem Antiseptic Healing Cream (60g)",
    brand: "Sudocrem",
    price: 6000,
    image: sudocrem,
    description:
      "Multi-purpose healing cream for the whole family. Soothes and protects irritated skin. Effective for diaper rash, acne, eczema, minor burns, cuts, grazes, sunburn, and pressure sores. Contains zinc oxide for a protective barrier. Gentle enough for babies.",
    badge: "Essential",
    inStock: true,
  },
  {
    id: 3,
    name: "SADOER Scar Removal Cream",
    brand: "SADOER",
    price: 8000,
    image: blue,
    description:
      "Helps reduce the appearance of all types of scars with consistent use. Fades acne scars and dark spots. Smooths and nourishes the skin. Suitable for daily use.",
    badge: "Best Seller",
    inStock: false, // Marked out of stock
  },
  {
    id: 4,
    name: "Turmeric Dark Spots Remover Toner",
    brand: "Turmeric",
    price: 15000,
    image: turmericFace,
    description:
      "Helps reduce the appearance of dark spots and acne marks. Brightens and evens skin tone. Removes excess oil and impurities. Refreshes and hydrates the skin. Leaves skin feeling smooth, soft, and glowing. Suitable for daily use and most skin types.",
    badge: "Premium",
    inStock: true,
  },
];
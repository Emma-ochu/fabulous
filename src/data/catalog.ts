import { medicube, medicubeBenefit } from "./medicube";
import { featuredProducts, type Product } from "./products";
import { sadoerProduct } from "./sadoer";
import medicubeImage from "../assets/medicube-night-mask.png";

export interface ProductDetail extends Omit<Product, "id" | "brand"> {
  id: string;
  slug: string;
  brand: string;
  category: string;
  benefits: string[];
  howToUse: string[];
  skinConcerns: string[];
  suitableFor: string;
  gallery?: string[];
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const featuredDetails: ProductDetail[] = featuredProducts.map((product) => ({
  ...product,
  id: `featured-${product.id}`,
  slug: toSlug(product.name),
  brand: product.brand || "FABULOUSS",
  category: "Featured skincare",
  benefits: [
    "Supports a simple, consistent skincare routine",
    "Leaves skin feeling soft and cared for",
    "Made for everyday self-care",
  ],
  howToUse: [
    "Patch test before first use.",
    "Apply a small amount to clean, dry skin.",
    "Use consistently as directed on the product packaging.",
  ],
  skinConcerns: ["Dull-looking skin", "Dryness", "Uneven-looking tone"],
  suitableFor: "Suitable for adults who want a straightforward daily routine.",
}));

const sadoerDetails: ProductDetail[] = sadoerProduct.map((product) => ({
  ...product,
  id: `sadoer-${product.id}`,
  slug: toSlug(product.name),
  brand: product.brand || "SADOER",
  category: "SADOER collection",
  benefits: [
    "Adds a nourishing step to your routine",
    "Helps skin feel smoother and more comfortable",
    "Designed for consistent personal care",
  ],
  howToUse: [
    "Patch test before first use.",
    "Apply to clean skin and massage gently.",
    "Follow the product packaging for best use instructions.",
  ],
  skinConcerns: ["Dryness", "Dull-looking skin", "Uneven texture"],
  suitableFor:
    "Suitable for adults looking to support a nourished skincare routine.",
}));

const medicubeDetail: ProductDetail = {
  id: medicube.id,
  slug: "medicube-kojic-acid-night-wrapping-mask",
  name: "Medicube Kojic Acid Night Wrapping Mask",
  brand: "Medicube",
  category: "Overnight treatment",
  price: 25000,
  image: medicubeImage,
  description: medicube.description,
  inStock: true,
  benefits: medicubeBenefit,
  howToUse: [
    "Apply a thin, even layer as the final step of your evening routine.",
    "Leave on overnight while the product forms a light wrapping layer.",
    "Rinse gently the next morning and continue with your usual routine.",
  ],
  skinConcerns: ["Dark spots", "Dull-looking skin", "Dryness"],
  suitableFor: medicube.p,
  gallery: [medicubeImage],
};

export const productCatalog: ProductDetail[] = [
  medicubeDetail,
  ...featuredDetails,
  ...sadoerDetails,
];

export const getProductBySlug = (slug: string) =>
  productCatalog.find((product) => product.slug === slug);

export const getProductById = (id: string | number) =>
  productCatalog.find((product) => product.id === String(id));

export const getRelatedProducts = (product: ProductDetail, limit = 3) =>
  productCatalog
    .filter(
      (candidate) => candidate.id !== product.id && candidate.inStock !== false,
    )
    .sort(
      (a, b) =>
        Number(b.brand === product.brand) - Number(a.brand === product.brand),
    )
    .slice(0, limit);

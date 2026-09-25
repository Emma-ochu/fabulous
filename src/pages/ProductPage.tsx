import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/product/ProductDetail";
import { getProductBySlug } from "../data/catalog";
import NotFound from "./NotFound";

const ProductPage = () => {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);

  useEffect(() => {
    if (!product) return;
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    const origin = window.location.origin;
    let canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href");
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const previousOpenGraph = new Map<string, string | null>();
    const openGraph = {
      "og:title": product.name,
      "og:description": product.description,
      "og:type": "product",
      "og:url": `${origin}/products/${product.slug}`,
      "og:image": new URL(product.image, origin).href,
    };
    Object.entries(openGraph).forEach(([property, content]) => {
      const meta = document.querySelector(`meta[property="${property}"]`);
      previousOpenGraph.set(property, meta?.getAttribute("content") ?? null);
      if (meta) meta.setAttribute("content", content);
      else {
        const nextMeta = document.createElement("meta");
        nextMeta.setAttribute("property", property);
        nextMeta.setAttribute("content", content);
        document.head.appendChild(nextMeta);
      }
    });
    document.title = `${product.name} | FABULOUSS`;
    description?.setAttribute("content", product.description);
    canonical?.setAttribute("href", `${origin}/products/${product.slug}`);
    const structuredData = document.createElement("script");
    structuredData.id = "product-structured-data";
    structuredData.type = "application/ld+json";
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: [new URL(product.image, origin).href],
      brand: { "@type": "Brand", name: product.brand },
      offers: {
        "@type": "Offer",
        priceCurrency: "NGN",
        price: product.price,
        availability:
          product.inStock === false ?
            "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
        url: `${origin}/products/${product.slug}`,
      },
    });
    document.head.appendChild(structuredData);
    return () => {
      document.title = previousTitle;
      if (description && previousDescription)
        description.setAttribute("content", previousDescription);
      if (canonical && previousCanonical)
        canonical.setAttribute("href", previousCanonical);
      if (createdCanonical) canonical?.remove();
      structuredData.remove();
      Object.entries(openGraph).forEach(([property]) => {
        const meta = document.querySelector(`meta[property="${property}"]`);
        const previous = previousOpenGraph.get(property);
        if (meta && previous) meta.setAttribute("content", previous);
        else meta?.remove();
      });
    };
  }, [product]);

  if (!product) return <NotFound />;

  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
};

export default ProductPage;

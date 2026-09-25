import { useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import ProductCard from "../components/product/ProductCard";
import { productCatalog } from "../data/catalog";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(productCatalog.map((product) => product.brand)),
  ];
  const visibleProducts = useMemo(
    () =>
      activeCategory === "All" ? productCatalog : (
        productCatalog.filter((product) => product.brand === activeCategory)
      ),
    [activeCategory],
  );

  return (
    <Layout>
      <main className='bg-[#FAF8F4]'>
        <section className='mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B89218]'>
            The collection
          </p>
          <div className='mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end'>
            <div className='max-w-2xl'>
              <h1 className='font-serif text-5xl leading-none text-stone-900 sm:text-6xl'>
                Skincare, chosen with intention.
              </h1>
              <p className='mt-6 max-w-xl text-base leading-8 text-stone-600'>
                Explore everyday essentials, focused treatments, and thoughtful
                additions to your personal ritual.
              </p>
            </div>
            <p className='text-sm text-stone-500'>
              {visibleProducts.length} pieces
            </p>
          </div>
        </section>
        <section className='border-y border-[#E7DED2] bg-white/50'>
          <div
            className='mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 md:px-10'
            aria-label='Filter products'
          >
            {categories.map((category) => (
              <button
                key={category}
                type='button'
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${activeCategory === category ? "border-[#1C1C1C] bg-[#1C1C1C] text-white" : "border-[#D8CDBE] text-stone-600 hover:border-[#C9A227] hover:text-stone-900"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        <section className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Products;

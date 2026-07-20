import { featuredProducts } from "../../data/products";

const FeaturedProducts = () => {
  return (
    <section 
      id="products"
      className="max-w-7xl mx-auto px-6 py-20"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
          Our Collection
        </p>
        <h2 className="mt-4 font-serif text-4xl font-normal text-[#2E2E2E]">
          Featured Products
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Discover our carefully selected MEDICUBE & SADOER products, designed to enhance your skincare routine and bring out your natural beauty.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.slice(0, 4).map((product) => (
          <article
            key={product.id}
            className="group bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
          >
            {/* Image */}
            <div className="aspect-square w-full overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <h3 className="mt-1 font-semibold text-gray-800 text-lg line-clamp-1">
                {product.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                {product.description}
              </p>
              <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                <span className="font-bold text-gray-900">
                  ₦{product.price}
                </span>
                <a
                  href={`https://wa.me/+2347048603741?text=${encodeURIComponent(
                    `Hi! I'm interested in ordering ${product.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-[#C9A227] hover:text-[#b08d1f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 rounded px-3 py-1.5 -mr-3"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
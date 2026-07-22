import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import beforeAfter1 from "../../assets/new-pretty.png";
import after2 from "../../assets/new2pretty.png";
import beforeAfter3 from "../../assets/two-face.png";

const testimonials = [
  {
    id: 1,
    name: "Amara O.",
    location: "Lagos",
    rating: 5,
    text: "I was dealing with dark spots and uneven skin tone for months. After using the Medicube Night Mask consistently, my skin is so much clearer and brighter. The difference is honestly unbelievable!",
    image: beforeAfter1,
    product: "Medicube Night Wrapping Mask",
    isBeforeAfter: true,
  },
  {
    id: 2,
    name: "Chioma N.",
    location: "Abuja",
    rating: 5,
    text: "My skin has never looked this good. The glow is real! I get compliments everywhere I go now. This is my holy grail product and I'll never stop using it.",
    image: after2,
    product: "Sadoer Collagen Set",
    isBeforeAfter: false,
  },
  {
    id: 3,
    name: "Tolu A.",
    location: "Port Harcourt",
    rating: 5,
    text: "I had terrible acne scars and textured skin. I was so insecure about it. After 4 weeks of using these products, my skin texture has improved dramatically and my scars are fading. I'm so grateful!",
    image: beforeAfter3,
    product: "Medicube Kojic Acid Mask",
    isBeforeAfter: true,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="bg-[#FAF8F4] py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
            Real Results
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal text-[#2E2E2E]">
            Reviews From Customers
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            See the transformations our customers are experiencing with authentic Korean skincare.
          </p>
        </div>

        {/* Main Card */}
        <div
          className="max-w-4xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            aria-live="polite"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square md:aspect-auto md:min-h-[400px] bg-gray-50 overflow-hidden">
                <img
                  src={active.image}
                  alt={`${active.name}'s skin transformation using ${active.product}`}
                  className="w-full h-full object-contain"
                />
                {active.isBeforeAfter && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Before & After
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-[#2E2E2E]/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white">
                  {active.product}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <Quote className="w-8 h-8 text-[#C9A227]/30 mb-4" aria-hidden="true" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                  {active.text}
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-sm font-bold text-[#C9A227]">
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2E2E2E]">{active.name}</p>
                    <p className="text-sm text-gray-500">{active.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "bg-[#C9A227] w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === activeIndex}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-serif text-[#2E2E2E]">500+</p>
            <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <p className="text-3xl font-serif text-[#2E2E2E]">4.9</p>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <p className="text-3xl font-serif text-[#2E2E2E]">100%</p>
            <p className="text-sm text-gray-500 mt-1">Authentic Products</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
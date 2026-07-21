import { useState } from "react";
import { ChevronDown, ShoppingBag } from "lucide-react";
import faqImage from "../../assets/image.webp";

const faqs = [
  {
    question: "How soon will I see results?",
    answer: "Most users get noticeable changes within 12 hours. For best results, use consistently for 2–4 weeks.",
  },
  {
    question: "Is it safe for sensitive skin?",
    answer: "Yes — all our products are formulated to be gentle yet effective. We recommend doing a patch test before full application.",
  },
  {
    question: "Can I pay on delivery?",
    answer: "Absolutely. You only pay when the product reaches you. We also accept bank transfer and mobile payment options.",
  },
  {
    question: "How do I use the Night Wrapping Mask?",
    answer: "Apply a thin, even layer to clean, dry skin before bed. Leave it on overnight and rinse with lukewarm water in the morning. Use 2–3 times per week.",
  },
  {
    question: "Are these products authentic?",
    answer: "100% authentic. We source directly from authorized Korean distributors. Every product comes with original packaging and verification codes where applicable.",
  },
  {
    question: "Do you deliver nationwide?",
    answer: "Yes, we deliver to all states in Nigeria. Delivery typically takes 2–5 business days depending on your location.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#FAF8F4] py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: FAQ Accordion */}
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
              Got Questions?
            </p>
            <h2 className="mt-3 font-serif text-4xl font-normal text-[#2E2E2E]">
              Frequently Asked Questions
            </h2>

            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 rounded-2xl"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-medium text-[#2E2E2E] text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9A227] flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-50">
                <img
                  src={faqImage}
                  alt="Happy customer with Medicube product"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 text-center">
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#2E2E2E] leading-tight">
                  Ready for Clear,<br />Confident Skin?
                </h3>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Join thousands of ladies who already trust Fabulouss to look younger and fresher.
                </p>
                <a
                  href="#order"
                  className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-[#C9A227] text-white px-6 py-4 rounded-xl hover:bg-[#b08d1f] active:scale-[0.98] transition-all duration-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  ORDER NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
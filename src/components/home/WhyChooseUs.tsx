import { Shield, Truck, MessageCircle, Sparkles, Lock, Star } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "100% Authentic Products",
    description: "We source genuine Medicube and Sadoer products from trusted Korean suppliers. No fakes, no compromises.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "We deliver safely to all 36 states and the FCT. Your skincare routine doesn't have to wait.",
  },
  {
    icon: MessageCircle,
    title: "Fast WhatsApp Support",
    description: "Have questions? Get a direct response on WhatsApp before you order. We're here to help.",
  },
  {
    icon: Sparkles,
    title: "Carefully Selected",
    description: "Every product in our store is chosen for quality, effectiveness, and real results.",
  },
  {
    icon: Lock,
    title: "Secure Ordering",
    description: "Your details are only used to process your order. We never share your information.",
  },
];

const trustBadges = [
  "Authentic Products",
  "Nationwide Delivery",
  "Fast Response",
  "Happy Customers",
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#FAF8F4] py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
            Why Trust Us
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal text-[#2E2E2E]">
            Why Customers Choose Fabulouss
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A227]/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="font-semibold text-[#2E2E2E] text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-14 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map((badge, index) => (
              <div key={badge} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#C9A227] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-[#2E2E2E]">{badge}</span>
                {index < trustBadges.length - 1 && (
                  <span className="hidden md:block w-px h-4 bg-gray-200 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance Box */}
        <div className="mt-10 max-w-2xl mx-auto bg-[#2E2E2E] rounded-3xl p-8 md:p-10 text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#C9A227] fill-[#C9A227]" />
            ))}
          </div>

          <p className="text-white text-lg font-medium mb-2">
            Join hundreds of happy customers across Nigeria
          </p>
          <p className="text-gray-400 text-sm">
            Fill in the form below and we'll confirm your order on WhatsApp
          </p>

          <a
            href="#order"
            className="mt-6 inline-flex items-center gap-2 bg-[#C9A227] text-white px-8 py-3.5 rounded-xl hover:bg-[#b08d1f] active:scale-[0.98] transition-all duration-200 font-semibold text-sm"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
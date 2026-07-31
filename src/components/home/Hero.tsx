import { heroContent, heroBenefits } from "../../data/hero";
import { CheckCircle2 } from "lucide-react";
import heroImage from "../../assets/Woman.png";

const Hero = () => {
  return (
    <section 
    id="hero"
    className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#FAF8F4] flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pt-6 pb-16 md:pt-14 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        
        {/* Left Column (Content) */}
        <div className="flex flex-col justify-center order-2 lg:order-1">

          {/* Eyebrow with animated gold underline signature */}
          <div className="relative inline-block w-fit">
            <p className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#C9A227]">
              {heroContent.eyebrow}
            </p>
            <svg
              className="absolute -bottom-1 left-0 w-full h-2 overflow-visible"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M1 5.5 C 20 2, 40 7, 60 4 S 90 2, 99 5"
                fill="none"
                stroke="#C9A227"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength="1"
                className="animate-draw-underline motion-reduce:[stroke-dashoffset:0]"
              />
            </svg>
          </div>

          {/* Serif display headline */}
          <h1 className="mt-5 sm:mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#2E2E2E] leading-[1.1] tracking-tight">
            {heroContent.title}
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-gray-600">
            {heroContent.description}
          </p>

          {/* Benefits List */}
          <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4" role="list">
            {heroBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-[#C9A227]/5 transition-colors">
                <CheckCircle2
                  className="w-5 h-5 text-[#C9A227] flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-gray-700 text-sm sm:text-base font-medium">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
          
          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://wa.me/2347048603741"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center bg-[#2E2E2E] text-white px-6 py-3.5 rounded-xl hover:bg-[#C9A227] active:scale-[0.98] transition-all duration-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
            >
              {heroContent.primaryButton}
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center px-6 py-3.5 bg-transparent text-[#C9A227] border-2 border-[#C9A227] rounded-xl hover:bg-[#C9A227] hover:text-white active:scale-[0.98] transition-all duration-300 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
            >
              {heroContent.secondaryButton}
            </a>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="flex justify-center lg:justify-end w-full order-1 lg:order-2">
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[520px] aspect-square group">
            <div className="absolute inset-0 bg-[#C9A227]/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:scale-110" />
            <img 
              src={heroImage} 
              alt="Medicube Night Mask"
              loading="eager"
              className="relative w-full h-full object-cover rounded-3xl border-4 border-white shadow-lg transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl active:scale-95"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
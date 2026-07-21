import { medicube, medicubeBenefit } from "../../data/medicube";
import nightMask from "../../assets/medicube-night-mask.png";
import medicubeVideo from "../../assets/medicube-video.mp4";
import beforeAfter from "../../assets/before-after.png";

const Medicube = () => {
  return (
    <>
      {/* SECTION 1: Product Spotlight */}
      <section
        id="medicube"
        className="relative overflow-hidden bg-[#FAF8F4]"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* Left Column (Content) */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h2 className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#C9A227]">
              {medicube.title}
            </h2>

            <p className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#2E2E2E] leading-[1.1] tracking-tight">
              {medicube.description}
            </p>

            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-gray-600">
              {medicube.body}
            </p>

            {/* Benefits List */}
            <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4" role="list">
              {medicubeBenefit.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-[#C9A227]/5 transition-colors">
                  <svg
                    className="h-5 w-5 text-[#C9A227] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm sm:text-base font-medium">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="mt-6">
              <a
                href="#order"
                className="inline-flex text-center bg-[#2E2E2E] text-white px-6 py-3.5 rounded-xl hover:bg-[#C9A227] active:scale-[0.98] transition-all duration-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
              >
                {medicube.button}
              </a>
            </div>
          </div>

          {/* Right Column (Image Showcase) */}
          <div className="flex justify-center lg:justify-end w-full order-1 lg:order-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[520px] aspect-square group">
              <div className="absolute inset-0 bg-[#C9A227]/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:scale-110" />
              <img
                src={nightMask}
                alt="Medicube Kojic Acid Night Wrapping Mask"
                loading="eager"
                className="relative w-full h-full object-contain rounded-3xl border-4 border-white shadow-lg transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl active:scale-95"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Real Results Gallery & Application Tutorial */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-16 py-20">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
            Real Results
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal text-[#2E2E2E]">
            See The Difference
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Discover how Medicube Night Wrapping Mask transforms your nighttime skincare routine with visible results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* Card 1: Before / After */}
          <article className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-full aspect-video overflow-hidden flex items-center justify-center bg-[#FAF8F4]">
              <img
                src={beforeAfter}
                alt="Before and after using Medicube Night Mask"
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-[#2E2E2E]">
                Visible Results
              </h3>
              <p className="mt-3 text-gray-600">
                Wake up to smoother, brighter and healthier-looking skin with consistent overnight use.
              </p>
            </div>
          </article>

          {/* Card 2: Video Instructions */}
          <article className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-full aspect-video overflow-hidden flex items-center justify-center bg-[#2E2E2E]/[0.03]">
              <video
                controls
                className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-500"
                poster={nightMask}
              >
                <source src={medicubeVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6 border-t border-gray-50 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-[#2E2E2E]">
                Application Guide
              </h3>
              <p className="mt-3 text-gray-600">
                Apply a thin layer before bed, leave it overnight, and rinse gently the next morning. 
              </p>
            </div>
          </article>

        </div>
      </section>
    </>
  );
};

export default Medicube;
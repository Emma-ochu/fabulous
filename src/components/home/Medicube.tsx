import { medicube, medicubeBenefit } from "../../data/medicube";
import nightMask from "../../assets/medicube-night-mask.png";
import medicubeVideo from "../../assets/medicube-video.mp4";
import beforeAfter from "../../assets/before-after.png";

const Medicube = () => {
  return (
    <>
      {/* SECTION 1: Product Spotlight Hero Section */}
      <section
        id="medicube"
        className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#FAF8F4] flex items-center"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 pt-6 pb-16 md:pt-14 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* Left Column (Content) */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h2 className="uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold text-[#C9A227]">
              {medicube.title}
            </h2>

            {/* Serif display headline */}
            <p className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#2E2E2E] leading-[1.1] tracking-tight">
              {medicube.description}
            </p>

            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-gray-600">
              {medicube.body}
            </p>

            {/* Benefits List */}
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {medicubeBenefit.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-[#C9A227] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 text-sm sm:text-base font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                className="flex-1 sm:flex-initial text-center bg-[#2E2E2E] text-white px-6 py-3.5 rounded-xl hover:bg-[#C9A227] active:scale-[0.98] transition-all duration-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
              >
                {medicube.button}
              </button>
            </div>
          </div>

          {/* Right Column (Image Showcase) */}
          <div className="flex justify-center lg:justify-end w-full order-1 lg:order-2 -mt-4 lg:-mt-16">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[520px] aspect-square group">
              <div className="absolute inset-0 bg-[#C9A227]/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:scale-110" />
              <img
                src={nightMask}
                alt="Medicube Kojic Acid Night Wrapping Mask"
                loading="lazy"
                className="relative w-full h-full object-contain rounded-3xl border-4 border-white shadow-lg transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl active:scale-95"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Real Results Gallery & Application Tutorial */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 bg-white lg:bg-transparent">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
            Real Results
          </p>
          <h2 className="mt-4 text-4xl font-bold text-[#2E2E2E]">
            See The Difference
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Discover how Medicube Night Wrapping Mask transforms your nighttime skincare routine with visible results.
          </p>
        </div>

        {/* Reverted to Side-by-Side 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Card 1: Before / After Transformations */}
          <div className="bg-[#FAF8F4] lg:bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
            <div className="w-full aspect-video overflow-hidden">
              <img
                src={beforeAfter}
                alt="Before and after using Medicube Night Mask"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#2E2E2E]">
                Visible Results
              </h3>
              <p className="mt-3 text-gray-600">
                Healthier-looking, brighter skin with consistent overnight use.
              </p>
            </div>
          </div>

          {/* Card 2: Video Instructions (No-Crop Fix) */}
          <div className="bg-[#FAF8F4] lg:bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
            {/* 
              FIX: Removed 'aspect-video' and 'bg-black' wrappers that force a shape.
              The container wrapper will now adapt to your video's actual native height.
            */}
            <div className="w-full overflow-hidden flex items-center justify-center bg-[#FAF8F4] lg:bg-white">
              <video
                controls
                className="w-full h-auto block object-contain"
                poster={nightMask}
              >
                <source src={medicubeVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6 border-t border-gray-50 bg-white">
              <h3 className="text-2xl font-semibold text-[#2E2E2E]">
                Watch How To Apply
              </h3>
              <p className="mt-3 text-gray-600">
                Apply a thin layer before bed and let the mask work overnight while you sleep.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Medicube;
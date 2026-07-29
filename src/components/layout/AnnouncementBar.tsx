import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Tag, Sparkles, Truck } from "lucide-react";

interface Announcement {
  id: number;
  icon: React.ReactNode;
  text: string;
  highlight?: string;
  ctaText?: string;
  ctaLink?: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    icon: <Truck className="w-3.5 h-3.5 text-[#C9A227]" />,
    text: "Free Express Shipping on all Lagos orders over ₦30,000!",
    highlight: "LIMITED TIME",
    ctaText: "Shop Now",
    ctaLink: "#order",
  },
  {
    id: 2,
    icon: <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />,
    text: "100% Authentic Korean Skincare — Direct from Seoul to Nigeria.",
    highlight: "AUTHENTIC GUARANTEE",
  },
  {
    id: 3,
    icon: <Tag className="w-3.5 h-3.5 text-[#C9A227]" />,
    text: "Buy 2 Medicube Night Masks & Get Free Delivery Nationwide!",
    highlight: "FLASH DEAL",
    ctaText: "Claim Offer",
    ctaLink: "#order",
  },
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, link?: string) => {
    if (link?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(link);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-[#1F1F1F] text-white text-xs py-2 px-4 border-b border-[#C9A227]/20 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Previous Button (Desktop) */}
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="hidden md:flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Message Content */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
          {current.highlight && (
            <span className="hidden sm:inline-block bg-[#C9A227]/20 text-[#C9A227] font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#C9A227]/30">
              {current.highlight}
            </span>
          )}

          <div className="flex items-center gap-1.5 justify-center truncate">
            {current.icon}
            <span className="font-medium text-gray-200 truncate">
              {current.text}
            </span>
          </div>

          {current.ctaText && current.ctaLink && (
            <a
              href={current.ctaLink}
              onClick={(e) => handleCtaClick(e, current.ctaLink)}
              className="underline underline-offset-2 font-semibold text-[#C9A227] hover:text-white transition-colors whitespace-nowrap ml-1"
            >
              {current.ctaText} →
            </a>
          )}
        </div>

        {/* Next & Close Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="hidden md:flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close announcement bar"
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
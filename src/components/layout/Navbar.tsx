import { useState, useEffect } from "react";
import { navLinks } from "../../data/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openMenu = () => {
    setIsAnimating(true);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 400);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    closeMenu();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="font-serif text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-[#2E2E2E] shrink-0"
          >
            <span className="md:hidden">Fabulouss</span>
            <span className="hidden md:inline">Fabulouss Skin Care Mart</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-sm font-medium text-gray-700 hover:text-[#C9A227] transition-colors"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden relative p-2 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
            onClick={() => (isOpen ? closeMenu() : openMenu())}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className="relative w-5 h-5">
              <Menu
                className={`w-5 h-5 text-gray-700 absolute inset-0 transition-all duration-300 ${
                  isOpen ? "rotate-90 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
                }`}
              />
              <X
                className={`w-5 h-5 text-gray-700 absolute inset-0 transition-all duration-300 ${
                  isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-75"
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40" aria-hidden={!isOpen}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-[400ms] ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          {/* Drawer Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-[240px] max-w-[80vw] bg-[#FAF8F4] shadow-2xl transition-transform duration-[400ms] ease-out ${
              isAnimating ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer Header - Logo */}
            <div className="flex flex-col items-center justify-center px-6 pt-20 pb-6 border-b border-[#C9A227]/20">
              <span className="font-serif text-xl font-normal text-[#2E2E2E] tracking-tight">
                Fabulouss
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227] mt-1 font-medium">
                Authentic Korean Skincare
              </span>
            </div>

            {/* Nav Links */}
            <nav className="px-4 py-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map(({ name, href }, index) => (
                  <li
                    key={name}
                    className={`transition-all duration-300 ${
                      isAnimating
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isAnimating ? `${150 + index * 60}ms` : "0ms",
                    }}
                  >
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-[#2E2E2E] hover:text-[#C9A227] hover:bg-white transition-colors"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
import { useState } from "react";
import { navLinks } from "../../data/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
{/* Logo — serif wordmark, the one deliberate brand moment in the nav */}
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 h-16 flex items-center justify-between gap-4">
        <a
          href="/"
          className="font-serif text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-[#2E2E2E] shrink-0"
        >
          Fabulouss Skin Care Mart
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ name, href }) => (
            <li key={name}>
              <a
                href={href}
                className="text-sm font-medium text-gray-700 hover:text-[#C9A227] transition-colors"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 shrink-0">
          <button
            type="button"
            aria-label="Search"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
     
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4">
          <ul className="flex flex-col gap-4">
            
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  className="block text-base font-medium text-gray-700 hover:text-[#C9A227] py-2 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
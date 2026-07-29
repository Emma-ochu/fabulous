import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

interface CustomStateSelectProps {
  options?: string[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export const CustomStateSelect = ({
  options = [],
  value = "",
  onChange,
  error,
  placeholder = "Select your state",
  label = "Your State",
  required = true,
}: CustomStateSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const safeOptions = Array.isArray(options) ? options : [];
  const filteredOptions = safeOptions.filter((state) =>
    state.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (!prev) setSearchQuery("");
      return !prev;
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white transition-all text-left shadow-sm ${
          error
            ? "border-red-400 bg-red-50/20"
            : isOpen
            ? "border-[#C9A227] ring-1 ring-[#C9A227]"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span
          className={`text-sm font-medium truncate ${
            value ? "text-gray-800" : "text-gray-400"
          }`}
        >
          {value || placeholder}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#C9A227]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 space-y-1">
          <div className="relative mb-1">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search state..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A227]"
            />
          </div>

          <div className="max-h-52 overflow-y-auto space-y-0.5">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((state) => {
                const isSelected = state === value;
                return (
                  <button
                    key={state}
                    type="button"
                    onClick={() => {
                      onChange(state);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl transition-all text-left text-sm ${
                      isSelected
                        ? "bg-[#FAF8F4] text-gray-900 font-semibold"
                        : "hover:bg-gray-50 text-gray-700 font-medium"
                    }`}
                  >
                    <span>{state}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#C9A227]" />}
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-gray-400 text-center py-3">
                No state found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
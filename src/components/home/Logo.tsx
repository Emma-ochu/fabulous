type LogoProps = {
  tagline?: boolean;
  light?: boolean;
  className?: string;
};

const Logo = ({ tagline = false, light = false, className = "" }: LogoProps) => (
  <span className={`inline-flex flex-col ${className}`}>
    <span
      className={`inline-flex items-baseline gap-1.5 font-logo font-semibold uppercase tracking-[0.1em] leading-none ${
        light ? "text-white" : "text-[#2E2E2E]"
      }`}
    >
      Fabulouss
      <span
        className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A227]"
        aria-hidden="true"
      />
    </span>
    {tagline && (
      <span className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C9A227] font-medium whitespace-nowrap">
        Authentic Korean Skincare
      </span>
    )}
  </span>
);

export default Logo;

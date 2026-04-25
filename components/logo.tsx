const Logo = () => {
  return (
    <a href="#" className="flex items-center gap-2.5 group">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" className="fill-[#1E3A8A] dark:fill-blue-600" />
        <path d="M8 24V12L13 20L18 12L23 20L28 12V24" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="12" r="2" fill="#F97316"/>
      </svg>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-[#1E3A8A] dark:text-blue-400">MAGNIFIC</span>
        <span className="text-[#F97316]"> DIGITAL</span>
      </span>
    </a>
  );
};

export default Logo;

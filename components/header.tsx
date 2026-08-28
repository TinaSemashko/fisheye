import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-[#e7ded3] bg-white">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <Link
          href="/"
          aria-label="Fisheye Home page"
          className="inline-flex items-center gap-2 no-underline"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="11" fill="#901C1C" />
            <circle cx="12" cy="12" r="5.5" fill="#fff" />
            <circle cx="12" cy="12" r="2.4" fill="#901C1C" />
          </svg>
          <span className="font-serif text-2xl font-bold text-[#901C1C] tracking-wide">
            Fisheye
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
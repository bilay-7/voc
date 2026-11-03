import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, site } from '../data/content';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#about');

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));
    const onScroll = () => {
      const offset = 120;
      let current = `#${ids[0]}`;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = `#${id}`;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-50 h-[68px] sm:h-[72px] border-b border-[#AD974F]/30 bg-[#231F20] text-white">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand logo & name on left — uses the real uniform logo with arched text */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            go('#about');
          }}
          className="flex items-center gap-2.5 sm:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD974F]"
        >
          <img
            src="/assets/logo.png"
            alt="Voice of Children"
            className="object-contain shrink-0"
            style={{ height: '42px', width: 'auto', maxHeight: '44px' }}
            width="44"
            height="48"
          />
          <span
            className="font-medium text-[#F5D36B] text-[18px] sm:text-[21px] tracking-normal"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            {site.name}
          </span>
        </a>

        {/* Center navigation menu on desktop (>=980px) */}
        <nav
          className="hidden items-center gap-7 lg:gap-8 text-[15px] font-normal text-gray-300 min-[980px]:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={`transition-colors duration-200 hover:text-[#F5D36B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD974F] ${
                  isActive ? 'text-[#F5D36B]' : 'text-gray-300'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right action:
            - Desktop (>=980px): Register button
            - Mobile (<980px): ONLY the hamburger icon (NO external Register button, exactly matching reference Image 3)
        */}
        <div className="flex items-center">
          <a
            href="#young-gardeners"
            onClick={(e) => {
              e.preventDefault();
              go('#young-gardeners');
            }}
            className="btn-primary header-register-btn hidden min-[980px]:inline-flex !h-10 !px-5 text-[14px]"
          >
            Register
          </a>

          <button
            type="button"
            className="p-1.5 text-[#F5D36B] hover:text-white min-[980px]:hidden focus:outline-none"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="mobile-menu"
          className="border-b border-[#AD974F]/40 bg-[#1A1718] px-6 py-5 space-y-3 text-gray-200 shadow-2xl min-[980px]:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#231F20] hover:text-[#F5D36B] ${
                active === item.href ? 'text-[#F5D36B]' : 'text-gray-200'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#young-gardeners"
              onClick={(e) => {
                e.preventDefault();
                go('#young-gardeners');
              }}
              className="btn-primary block w-full text-center"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

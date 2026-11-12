import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navItems } from '../data/content';
import { useContent } from '../context/ContentContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { site } = useContent();

  const isCurrentActive = (href) => {
    if (href === '/') {
      return location.pathname === '/' || location.pathname === '/about';
    }
    return location.pathname === href;
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#AD974F]/30 bg-[#231F20]/95 backdrop-blur-md shadow-md text-white transition-all">
      <div className="mx-auto flex h-[68px] sm:h-[72px] max-w-[1360px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand logo & name on left */}
        <Link
          to="/"
          onClick={closeMenu}
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
        </Link>

        {/* Center navigation menu on desktop (>=980px) */}
        <nav
          className="hidden items-center gap-7 lg:gap-8 text-[15px] font-normal text-gray-300 min-[980px]:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = isCurrentActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors duration-200 hover:text-[#F5D36B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD974F] ${
                  isActive ? 'text-[#F5D36B]' : 'text-gray-300'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right action */}
        <div className="flex items-center">
          <Link
            to="/young-gardeners"
            onClick={closeMenu}
            className="btn-primary header-register-btn hidden min-[980px]:inline-flex !h-10 !px-5 text-[14px]"
          >
            Register
          </Link>

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
          className="border-b border-[#AD974F]/40 bg-[#1A1718] px-6 py-5 space-y-3 text-gray-200 shadow-2xl max-h-[calc(100vh-68px)] overflow-y-auto min-[980px]:hidden"
        >
          {navItems.map((item) => {
            const isActive = isCurrentActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#231F20] hover:text-[#F5D36B] ${
                  isActive ? 'text-[#F5D36B]' : 'text-gray-200'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/young-gardeners"
              onClick={closeMenu}
              className="btn-primary block w-full text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { InstagramIcon, FacebookIcon } from '../lib/icons';

export default function Footer({ onOpenPrivacy }) {
  const { site } = useContent();
  return (
    <footer className="border-t border-[#AD974F]/30 bg-[#1A1718] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Voice of Children"
                className="h-10 w-auto object-contain"
                width="40"
                height="44"
              />
              <p
                className="text-[20px] sm:text-[22px] font-medium text-[#F5D36B]"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                {site.name}
              </p>
            </Link>
            <p
              className="mt-4 max-w-sm text-[14.5px] sm:text-[15px] font-light leading-relaxed text-gray-300"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {site.shortDescription}
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 lg:col-span-4">
            <p
              className="text-[12px] font-medium tracking-[0.16em] text-[#AD974F] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Contact
            </p>
            <ul
              className="mt-4 space-y-2.5 text-[14.5px] sm:text-[15px] text-gray-300 font-light"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="hover:text-[#F5D36B] transition-colors inline-block"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="break-all hover:text-[#F5D36B] transition-colors inline-block"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://${site.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5D36B] transition-colors inline-block text-gray-400"
                >
                  {site.domain}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow & Privacy Notice */}
          <div className="md:col-span-3 lg:col-span-3">
            <p
              className="text-[12px] font-medium tracking-[0.16em] text-[#AD974F] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Follow
            </p>
            
            {/* Real Instagram & Facebook vector icons */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#AD974F]/50 text-[#AD974F] hover:bg-[#AD974F] hover:text-[#231F20] hover:border-[#AD974F] transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Instagram @voiceofchildrenofficial"
                title="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#AD974F]/50 text-[#AD974F] hover:bg-[#AD974F] hover:text-[#231F20] hover:border-[#AD974F] transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Facebook @voiceofchildrenofficial"
                title="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>

            <button
              type="button"
              onClick={onOpenPrivacy}
              className="mt-6 text-[14px] font-medium text-[#AD974F] underline underline-offset-4 hover:text-[#F5D36B] transition-colors block cursor-pointer"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Privacy notice
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-white/10 bg-[#141213]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-gray-500 font-light">
          <p style={{ fontFamily: "'Outfit', sans-serif" }}>
            © {new Date().getFullYear()} Voice of Children. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <p style={{ fontFamily: "'Outfit', sans-serif" }} className="text-gray-500">
              Objective-based STEM &amp; Life Skills Education
            </p>
            <span className="text-gray-700">|</span>
            <Link
              to="/admin"
              className="text-gray-500 hover:text-[#AD974F] transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

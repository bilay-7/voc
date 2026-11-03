import React from 'react';
import { mission, organizationStatement, vision } from '../data/content';

export default function HeroGrid() {
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#231F20] text-white min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-72px)] flex flex-col justify-between py-6 sm:py-8 lg:py-10"
    >
      {/* Background Soft Golden Glow / Radial Shine Effect behind center badge */}
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] lg:w-[680px] lg:h-[680px] rounded-full opacity-25 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #F5D36B 0%, #AD974F 25%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1360px] w-full px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-between">
        {/* 3-Column Grid Layout matching Reference Figure 6 & Image 2:
            Desktop: Left (Our vision) | Center (Emblem) | Right (Our mission)
            Mobile: Center (Emblem) -> Our vision -> Our mission
        */}
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12 my-auto py-2">
          
          {/* Left Column: Our vision */}
          <div className="order-2 text-center lg:order-1 lg:col-span-3 lg:text-left space-y-2.5 sm:space-y-3">
            <span
              className="text-[#AD974F] font-normal text-[11px] sm:text-[12px] tracking-wider block"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Our vision
            </span>
            <h1
              className="text-[21px] sm:text-[24px] lg:text-[26px] xl:text-[29px] italic text-gray-100 leading-[1.35] font-normal mx-auto lg:mx-0 max-w-[28ch] lg:max-w-none"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
            >
              {vision}
            </h1>
          </div>

          {/* Center Column: Circular Badge with Crisp Official Logo */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-6 my-2 sm:my-3 lg:my-0">
            <div className="relative flex items-center justify-center w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] lg:w-[390px] lg:h-[390px] xl:w-[420px] xl:h-[420px]">
              {/* Outer faint gold boundary circle */}
              <div
                className="absolute inset-0 rounded-full border border-[#AD974F]/35 pointer-events-none"
                aria-hidden="true"
              />
              {/* Inner subtle concentric ring */}
              <div
                className="absolute inset-4 sm:inset-5 rounded-full border border-[#AD974F]/18 pointer-events-none"
                aria-hidden="true"
              />

              {/* Crisp Official Logo */}
              <img
                src="/assets/logo.png"
                alt="Voice of Children Logo"
                className="relative z-10 w-[200px] sm:w-[260px] lg:w-[300px] xl:w-[330px] object-contain drop-shadow-[0_4px_24px_rgba(245,211,107,0.3)]"
                width="330"
                height="375"
              />
            </div>
          </div>

          {/* Right Column: Our mission */}
          <div className="order-3 text-left lg:order-3 lg:col-span-3 space-y-2.5 sm:space-y-3">
            <span
              className="text-[#AD974F] font-normal text-[11px] sm:text-[12px] tracking-wider block text-center lg:text-left"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Our mission
            </span>
            <ul className="space-y-2.5 sm:space-y-3 text-[12px] sm:text-[12.5px] lg:text-[13px] text-gray-300 leading-[1.58] font-light">
              {mission.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span
                    className="text-[#AD974F] text-[9px] mt-[3.5px] shrink-0 leading-none"
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Paragraph & CTA Buttons (Anchored near bottom of first view) */}
        <div className="mt-4 sm:mt-6 lg:mt-4 text-center max-w-4xl mx-auto space-y-4 sm:space-y-5 pb-2">
          <p
            className="text-[13.5px] sm:text-[15px] lg:text-[16px] text-gray-200 leading-[1.62] font-light tracking-wide px-2 max-w-[760px] mx-auto"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {organizationStatement}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-1">
            <button
              type="button"
              onClick={() => go('programs')}
              className="btn-primary w-full sm:w-auto"
            >
              Explore programs
            </button>
            <button
              type="button"
              onClick={() => go('contact')}
              className="btn-secondary w-full sm:w-auto"
            >
              Get in touch
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

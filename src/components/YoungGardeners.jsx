import React from 'react';
import { useContent } from '../context/ContentContext';

/**
 * Mobile botanical plant illustration matching design reference mockup.
 * Scaled into the reference yellow panel (346×273).
 * Circle junction @ (170, 92) with bottom T-junction ground line.
 */
function PlantArtMobile({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 346 273"
      fill="none"
      stroke="#8E793E"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Ground line + stem (reference: T-junction at bottom) */}
      <line x1="28" y1="272" x2="315" y2="272" className="plant-draw" pathLength="1" style={{ "--d": "0s", "--t": "0.8s" }} />
      <line x1="170" y1="272" x2="170" y2="92" className="plant-draw" pathLength="1" style={{ "--d": "0.6s", "--t": "1.4s" }} />

      {/* Upper left */}
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.3s", "--t": "1.1s" }} d="M170 68.6 C147.6 6.2, 96.4 -13.3, 45.2 6.2 C51.6 56.9, 99.6 72.5, 170 68.6 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.8s", "--t": "1.1s" }} d="M170 68.6 C128.4 41.3, 90 21.8, 45.2 6.2" strokeWidth="1.25" />

      {/* Upper right */}
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.3s", "--t": "1.1s" }} d="M170 68.6 C192.4 6.2, 243.6 -13.3, 294.8 6.2 C288.4 56.9, 240.4 72.5, 170 68.6 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.8s", "--t": "1.1s" }} d="M170 68.6 C211.6 41.3, 250 21.8, 294.8 6.2" strokeWidth="1.25" />

      {/* Lower left */}
      <path className="plant-draw" pathLength="1" style={{ "--d": "1.7s", "--t": "1.1s" }} d="M170 138.8 C147.6 92, 99.6 60.8, 54.8 84.2 C61.2 127.1, 106 142.7, 170 138.8 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.2s", "--t": "1.1s" }} d="M170 138.8 C128.4 111.5, 93.2 92, 54.8 84.2" strokeWidth="1.25" />

      {/* Lower right */}
      <path className="plant-draw" pathLength="1" style={{ "--d": "1.7s", "--t": "1.1s" }} d="M170 138.8 C192.4 92, 240.4 60.8, 285.2 84.2 C278.8 127.1, 234 142.7, 170 138.8 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.2s", "--t": "1.1s" }} d="M170 138.8 C211.6 111.5, 246.8 92, 285.2 84.2" strokeWidth="1.25" />
    </svg>
  );
}

function PlantArtDesktop({ className = '' }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 500 500"
      stroke="#8E793E"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="40" y1="430" x2="460" y2="430" className="plant-draw" pathLength="1" style={{ "--d": "0s", "--t": "0.8s" }} />
      <line x1="250" y1="430" x2="250" y2="120" className="plant-draw" pathLength="1" style={{ "--d": "0.6s", "--t": "1.4s" }} />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.3s", "--t": "1.1s" }} d="M 250 120 C 215 40, 135 15, 55 40 C 65 105, 140 125, 250 120 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.8s", "--t": "1.1s" }} d="M 250 120 C 185 85, 125 60, 55 40" strokeWidth="1.6" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.3s", "--t": "1.1s" }} d="M 250 120 C 285 40, 365 15, 445 40 C 435 105, 360 125, 250 120 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.8s", "--t": "1.1s" }} d="M 250 120 C 315 85, 375 60, 445 40" strokeWidth="1.6" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "1.7s", "--t": "1.1s" }} d="M 250 210 C 215 150, 140 110, 70 140 C 80 195, 150 215, 250 210 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.2s", "--t": "1.1s" }} d="M 250 210 C 185 175, 130 150, 70 140" strokeWidth="1.6" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "1.7s", "--t": "1.1s" }} d="M 250 210 C 285 150, 360 110, 430 140 C 420 195, 350 215, 250 210 Z" />
      <path className="plant-draw" pathLength="1" style={{ "--d": "2.2s", "--t": "1.1s" }} d="M 250 210 C 315 175, 370 150, 430 140" strokeWidth="1.6" />
    </svg>
  );
}

function CircleBadge({ className = '', textClassName = '' }) {
  return (
    <div
      className={`rounded-full bg-[#231F20] border-2 border-[#AD974F] flex flex-col items-center justify-center text-center ${className}`}
      style={{ boxShadow: '0 6px 16px rgba(35, 31, 32, 0.28)' }}
    >
      <span
        className={`text-[#AD974F] font-normal leading-[1.08] ${textClassName}`}
        style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
      >
        Young
        <br />
        Gardeners
      </span>
    </div>
  );
}

export default function YoungGardeners() {
  const { site, youngGardeners } = useContent();
  const half = Math.ceil(youngGardeners.topics.length / 2);
  const learningTopicsLeft = youngGardeners.topics.slice(0, half);
  const learningTopicsRight = youngGardeners.topics.slice(half);

  return (
    <section
      id="young-gardeners"
      className="bg-[#FFFFFF] text-[#231F20] w-full max-w-full overflow-x-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 lg:pt-5 pb-12 sm:pb-16 lg:pb-20 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-full border border-[#E5E5E5] rounded-[2px] overflow-hidden box-border">
          {/* MOBILE — pixel-matched to reference image-bab6058f
              panel 346×273 · circle ⌀102 @ (170,92) · no ground line */}
          <div
            className="lg:hidden relative w-full overflow-hidden bg-[#F5D36B]"
            style={{ aspectRatio: '346 / 273' }}
          >
            <PlantArtMobile className="absolute inset-0 w-full h-full" />

            {/* Circle: 29.5% width, center 50% × 33.7% */}
            <div
              className="absolute z-10"
              style={{
                left: '50%',
                top: '33.7%',
                width: '29.5%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircleBadge
                className="w-full aspect-square"
                textClassName="text-[clamp(12px,3.5vw,15px)]"
              />
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block lg:col-span-6 relative bg-[#F5D36B] min-h-[560px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <PlantArtDesktop className="w-full max-w-[480px] h-auto" />
            </div>
            <div className="absolute bottom-8 left-8 z-10">
              <CircleBadge className="w-[118px] h-[118px]" textClassName="text-[18px]" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6 bg-[#FFFFFF] px-5 py-7 sm:p-8 lg:p-12 flex flex-col justify-between box-border w-full max-w-full overflow-hidden">
            <div>
              <div
                className="inline-block border border-[#AD974F]/80 px-2.5 py-1 text-[11px] sm:text-[12px] text-[#8E793E] font-normal mb-5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {youngGardeners.status}
              </div>

              <h2
                className="text-[30px] sm:text-[38px] lg:text-[44px] text-[#231F20] font-normal leading-[1.1] mb-4 tracking-tight"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
              >
                {youngGardeners.title}
              </h2>

              <p
                className="text-[#231F20]/85 text-[14px] sm:text-[16px] font-normal leading-[1.65] mb-7"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {youngGardeners.about}
              </p>

              <div className="grid grid-cols-3 gap-2 py-5 border-t border-b border-[#E8E8E8] mb-7 items-start">
                <div>
                  <div
                    className="text-[17px] sm:text-[20px] lg:text-[22px] text-[#231F20] leading-tight"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
                  >
                    {youngGardeners.ageGroups}
                  </div>
                  <div
                    className="text-[11px] sm:text-[12px] text-[#231F20]/50 mt-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Age groups
                  </div>
                </div>
                <div>
                  <div
                    className="text-[17px] sm:text-[20px] lg:text-[22px] text-[#231F20] leading-tight"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
                  >
                    {youngGardeners.duration}
                  </div>
                  <div
                    className="text-[11px] sm:text-[12px] text-[#231F20]/50 mt-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Duration
                  </div>
                </div>
                <div>
                  <div
                    className="text-[17px] sm:text-[20px] lg:text-[22px] text-[#231F20] leading-tight"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
                  >
                    {youngGardeners.fee}
                  </div>
                  <div
                    className="text-[11px] sm:text-[12px] text-[#231F20]/50 mt-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {youngGardeners.feeSubtitle}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 text-[14px]">
                <ul className="space-y-2.5">
                  {learningTopicsLeft.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2.5">
                      <span className="text-[#AD974F] shrink-0">—</span>
                      <span className="text-[#231F20]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5">
                  {learningTopicsRight.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2.5">
                      <span className="text-[#AD974F] shrink-0">—</span>
                      <span className="text-[#231F20]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <a
                href={site.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#AD974F] hover:bg-[#F5D36B] text-[#231F20] font-medium px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] transition-colors rounded-[2px] inline-block text-center cursor-pointer"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Register on Google Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

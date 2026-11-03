import React, { useState, useEffect } from 'react';
import { learningCycle } from '../data/content';
import { getProgramById } from '../data/programs';

const cycleSteps = [
  {
    stepNumber: 1,
    programId: 'gardening',
    title: 'Gardening',
    description: 'The Green Glow Club: organic gardening and biodiversity within a STEM framework.',
    positionClass: 'lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2',
  },
  {
    stepNumber: 2,
    programId: 'self-defense',
    title: 'Self-Defense',
    description: 'Taekwondo-led sessions on staying safe, assessing risk and reacting with confidence.',
    positionClass: 'lg:absolute lg:top-8 lg:right-6',
  },
  {
    stepNumber: 3,
    programId: 'first-aid',
    title: 'First Aid',
    description: 'Hands-on first aid training supervised by experienced medical staff and nurses.',
    positionClass: 'lg:absolute lg:top-8 lg:left-6',
  },
];

export default function LearningCycle({ onOpenProgram }) {
  const [activeStep, setActiveStep] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  const handleCardClick = (programId) => {
    const program = getProgramById(programId);
    if (program) {
      onOpenProgram(program);
    }
  };

  return (
    <section
      id="learning-cycle"
      className="bg-[#FFFFFF] text-[#231F20] py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative overflow-x-hidden w-full"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Headings matching Reference Figure 7 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 px-2">
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[46px] text-[#231F20] font-normal tracking-tight"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              lineHeight: 1.15,
            }}
          >
            {learningCycle.heading}
          </h2>
          <p
            className="text-gray-600 text-[14.5px] sm:text-[16px] font-light max-w-[62ch] mx-auto leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {learningCycle.description}
          </p>
        </div>

        {/* Circular Cycle Container */}
        <div className="relative w-full max-w-[850px] mx-auto min-h-auto lg:min-h-[540px] flex flex-col lg:block items-center justify-center gap-6">
          
          {/* SVG Connecting Curved Gold Arrows - Forming a clear, smooth circular orbit */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 850 540"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="gold-arrowhead"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#AD974F" />
                </marker>
              </defs>

              {/* Arrow 1: Gardening (1) -> Self-Defense (2) (bottom-right curving up) */}
              <path
                d="M 545 460 C 660 440, 715 340, 665 200"
                stroke="#AD974F"
                strokeWidth="1.35"
                fill="none"
                markerEnd="url(#gold-arrowhead)"
              />

              {/* Arrow 2: Self-Defense (2) -> First Aid (3) (arching gracefully OVER the top) */}
              <path
                d="M 580 80 C 490 15, 360 15, 270 80"
                stroke="#AD974F"
                strokeWidth="1.35"
                fill="none"
                markerEnd="url(#gold-arrowhead)"
              />

              {/* Arrow 3: First Aid (3) -> Gardening (1) (bottom-left curving down) */}
              <path
                d="M 185 200 C 135 340, 190 440, 305 460"
                stroke="#AD974F"
                strokeWidth="1.35"
                fill="none"
                markerEnd="url(#gold-arrowhead)"
              />
            </svg>
          </div>

          {/* Center Logo Emblem: Prominent, clear and bold matching Reference */}
          <div className="lg:absolute lg:top-[42%] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 my-3 lg:my-0">
            <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-[175px] lg:h-[175px] rounded-full bg-[#1A1718] border-[6px] border-[#ECECEC] shadow-xl flex items-center justify-center p-3 text-center transition-transform duration-300">
              <img
                src="/assets/logo.png"
                alt="Voice of Children Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"
                width="128"
                height="128"
              />
            </div>
          </div>

          {/* Cards: Exact layout matching Reference Image 1 (NO "Read more", pure cards) */}
          {cycleSteps.map((step) => {
            const isActive = activeStep === step.stepNumber;
            return (
              <div
                key={step.stepNumber}
                onClick={() => handleCardClick(step.programId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(step.programId);
                  }
                }}
                className={`w-full max-w-[320px] sm:max-w-[340px] sm:w-[240px] bg-white rounded-[2px] p-6 cursor-pointer transition-all duration-300 z-20 group text-left ${
                  step.positionClass
                } ${
                  isActive
                    ? 'border border-[#AD974F] shadow-[0_12px_28px_rgba(173,151,79,0.18)] scale-[1.01]'
                    : 'border border-gray-200/90 shadow-sm hover:border-[#AD974F]/50'
                }`}
              >
                {/* Number Badge: Solid gold circle when active, outlined gray circle when inactive */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium mb-3 transition-colors ${
                    isActive
                      ? 'bg-[#AD974F] text-white border border-[#AD974F]'
                      : 'bg-white text-gray-500 border border-gray-300'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {step.stepNumber}
                </div>

                {/* Card Title (H3) in Bodoni Moda */}
                <h3
                  className="text-[21px] sm:text-[22px] text-[#231F20] mb-2 font-normal leading-[1.18] tracking-normal"
                  style={{
                    fontFamily: "'Bodoni Moda', Georgia, serif",
                    fontWeight: 500,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description: Exact text from client reference */}
                <p
                  className="text-gray-600 text-[13px] font-light leading-[1.58]"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

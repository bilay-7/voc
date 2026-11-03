import React, { useState } from 'react';
import { aiWorkshop } from '../data/aiWorkshop';

export default function AiWorkshop({ onEnquire }) {
  const [activeId, setActiveId] = useState(aiWorkshop.modules[0].id);
  const active = aiWorkshop.modules.find((m) => m.id === activeId) || aiWorkshop.modules[0];

  const move = (delta) => {
    const tabs = aiWorkshop.modules;
    const i = tabs.findIndex((t) => t.id === activeId);
    setActiveId(tabs[(i + delta + tabs.length) % tabs.length].id);
  };

  return (
    <section id="ai-workshop" className="bg-[#231F20] text-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] text-white font-normal tracking-tight"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              lineHeight: 1.15,
            }}
          >
            {aiWorkshop.title}
          </h2>
          <p
            className="mt-4 text-[16px] sm:text-[18px] text-gray-300 font-light max-w-[65ch] leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {aiWorkshop.introduction}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Vertical tab list (horizontal scrolling on mobile) */}
          <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 lg:col-span-4">
            <div
              role="tablist"
              aria-label="AI workshop modules"
              className="flex w-max gap-2 lg:w-full lg:flex-col lg:gap-2.5"
            >
              {aiWorkshop.modules.map((module, index) => {
                const selected = module.id === active.id;
                return (
                  <button
                    key={module.id}
                    type="button"
                    role="tab"
                    id={`ai-tab-${module.id}`}
                    aria-selected={selected}
                    aria-controls={`ai-panel-${module.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(module.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                        e.preventDefault();
                        move(1);
                      }
                      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                        e.preventDefault();
                        move(-1);
                      }
                      if (e.key === 'Home') {
                        e.preventDefault();
                        setActiveId(aiWorkshop.modules[0].id);
                      }
                      if (e.key === 'End') {
                        e.preventDefault();
                        setActiveId(aiWorkshop.modules[aiWorkshop.modules.length - 1].id);
                      }
                    }}
                    className={`min-w-[210px] rounded-[2px] border-l-2 px-4 py-3 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD974F] lg:min-w-0 ${
                      selected
                        ? 'border-[#AD974F] bg-[#AD974F]/15 text-[#F5D36B]'
                        : 'border-white/10 text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className="block text-[11px] font-medium tracking-[0.14em] text-[#AD974F] uppercase"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Module {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="mt-1 block text-[15px] font-medium leading-snug"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {module.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module Outcomes Panel */}
          <div
            role="tabpanel"
            id={`ai-panel-${active.id}`}
            aria-labelledby={`ai-tab-${active.id}`}
            className="rounded-[2px] border border-[#AD974F]/40 bg-[#1A1718] p-6 sm:p-8 lg:p-10 lg:col-span-8 shadow-xl"
          >
            <p
              className="text-[11px] font-medium tracking-[0.16em] text-[#AD974F] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Learning outcomes
            </p>
            <h3
              className="mt-2 text-[26px] sm:text-[32px] font-normal leading-[1.2] text-[#F5D36B]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              {active.title}
            </h3>
            <p
              className="mt-1 text-[15px] sm:text-[16px] text-gray-400 font-light"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {active.subtitle}
            </p>

            <ul className="mt-6 space-y-3.5">
              {active.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#AD974F] text-[10px] mt-1.5 shrink-0 leading-none">
                    ◆
                  </span>
                  <span
                    className="text-[15px] sm:text-[16px] font-light leading-relaxed text-gray-200"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="btn-primary mt-8"
              onClick={onEnquire}
            >
              Send an enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

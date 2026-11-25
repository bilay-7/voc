import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { drawRef } from '../../lib/drawIcon';
import { useContent } from '../../context/ContentContext';

export default function HomeAiWorkshopPreview() {
  const { aiWorkshop } = useContent();

  const previewModules = aiWorkshop.modules.slice(0, 4);

  return (
    <section className="bg-[#231F20] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-[#AD974F]/20">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header with proper alignment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 w-full pb-6 border-b border-white/15">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles ref={drawRef} className="icon-draw h-4 w-4 text-[#F5D36B]" />
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-[#AD974F]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Hands-on Technology Lab
              </span>
            </div>
            <h2
              className="text-[32px] sm:text-[40px] lg:text-[44px] text-white font-normal tracking-tight"
              style={{
                fontFamily: "'Bodoni Moda', Georgia, serif",
                lineHeight: 1.15,
              }}
            >
              {aiWorkshop.title}
            </h2>
          </div>
          <p
            className="text-gray-300 text-[14.5px] sm:text-[16px] font-light max-w-md leading-relaxed text-left md:text-right"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {aiWorkshop.introduction}
          </p>
        </div>

        {/* 4 Feature Module Teaser Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {previewModules.map((module, idx) => (
            <Link
              key={module.id}
              to="/ai-workshop"
              className="bg-[#1A1718] border border-[#AD974F]/30 p-5 rounded-[2px] flex flex-col justify-between hover:border-[#AD974F] hover:bg-[#231F20] transition-colors group cursor-pointer"
            >
              <div>
                <span
                  className="text-[10px] font-mono tracking-wider text-[#AD974F] uppercase block mb-1.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Module 0{idx + 1}
                </span>
                <h3
                  className="text-[18px] sm:text-[19px] text-[#F5D36B] font-medium mb-1.5 group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  {module.title}
                </h3>
                <p
                  className="text-gray-400 text-xs font-light leading-relaxed mb-4 line-clamp-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {module.subtitle}
                </p>
              </div>

              <div
                className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#AD974F] font-medium group-hover:text-[#F5D36B] transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span>View outcomes</span>
                <ArrowRight className="arrow-nudge w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Tag Bar & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <span
            className="text-xs text-gray-400 text-center sm:text-left"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Includes Microsoft Word, Excel, PowerPoint &amp; Whimsical mind-mapping modules for ages 10 to 14.
          </span>
          <Link
            to="/ai-workshop"
            className="btn-primary !h-10 !px-6 text-xs sm:text-sm font-medium inline-flex items-center gap-2 shrink-0"
          >
            <span>Explore All 8 Modules</span>
            <ArrowRight className="arrow-nudge w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

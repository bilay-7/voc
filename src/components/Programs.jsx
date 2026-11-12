import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ProgramIcon } from '../lib/icons';

export default function Programs({ onReadMore }) {
  const { programs } = useContent();

  return (
    <section
      id="programs"
      className="bg-[#EAEAEA] text-[#231F20] pt-3 sm:pt-4 lg:pt-5 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 w-full overflow-x-hidden"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header with neat bottom alignment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 lg:mb-12 gap-4 w-full pb-6 border-b border-[#231F20]/15">
          <div>
            <span
              className="text-[#8E793E] text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase block mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Complete Curriculum (12 Modules)
            </span>
            <h2
              className="text-[32px] sm:text-[40px] lg:text-[46px] text-[#231F20] font-normal tracking-tight"
              style={{
                fontFamily: "'Bodoni Moda', Georgia, serif",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Our programs
            </h2>
          </div>
          <p
            className="text-gray-600 text-[14.5px] sm:text-[16px] font-normal text-left md:text-right md:whitespace-nowrap"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Twelve hands-on modules that build life skills, from the garden to the IT lab.
          </p>
        </div>

        {/* 12 Elevated Showcase Cards (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {programs.map((prog, index) => (
            <article
              key={prog.id}
              onClick={() => onReadMore?.(prog)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onReadMore?.(prog);
                }
              }}
              className="bg-white rounded-[2px] p-6 border border-gray-200/90 shadow-sm hover:shadow-md hover:border-[#AD974F] transition-all duration-200 group flex flex-col justify-between cursor-pointer text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-[2px] bg-[#AD974F]/10 border border-[#AD974F]/25 flex items-center justify-center text-[#8E793E] group-hover:bg-[#AD974F] group-hover:text-[#231F20] transition-colors">
                    <ProgramIcon id={prog.id} className="w-5 h-5 stroke-current" />
                  </div>
                  <span
                    className="text-[11px] font-mono tracking-wider text-gray-400 group-hover:text-[#8E793E] transition-colors uppercase"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Module {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3
                  className="text-[18px] sm:text-[19px] text-[#231F20] font-semibold leading-snug mb-2 group-hover:text-[#8E793E] transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {prog.title}
                </h3>
                <p
                  className="text-gray-600 text-[13.5px] font-light leading-relaxed mb-4 line-clamp-3"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {prog.summary}
                </p>
              </div>

              <div
                className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[13px] font-medium text-[#8E793E] group-hover:text-[#AD974F] transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span>Read program details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

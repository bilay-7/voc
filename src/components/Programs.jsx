import React from 'react';
import { programs } from '../data/programs';
import { ProgramIcon } from '../lib/icons';

export default function Programs({ onReadMore }) {
  return (
    <section
      id="programs"
      className="bg-[#EAEAEA] text-[#231F20] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 w-full overflow-x-hidden"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header matching design mockup */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 lg:mb-16 gap-4 w-full">
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] text-[#231F20] font-normal tracking-tight"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Our programs
          </h2>
          <p
            className="text-gray-600 text-[15px] sm:text-[16px] font-normal md:whitespace-nowrap text-left md:text-right"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Twelve hands-on modules that build life skills, from the garden to the IT lab.
          </p>
        </div>

        {/* 3-Column Grid on Desktop, 1-Column on Mobile
            Each card has icon on left and vertically aligned text (Title, Summary, Read more) on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-y-12 gap-x-12 w-full">
          {programs.map((prog) => (
            <article
              key={prog.id}
              className="flex items-start gap-3.5 sm:gap-4 pt-5 border-t border-[#231F20]/20 w-full"
            >
              {/* Separate Icon on the left */}
              <div className="shrink-0 text-[#8E793E] mt-0.5">
                <ProgramIcon id={prog.id} className="w-6 h-6 stroke-[#8E793E]" />
              </div>

              {/* Text column on right: Title, Summary, and Read more all aligned vertically */}
              <div className="flex-1 flex flex-col justify-between min-h-[110px]">
                <div>
                  <h3
                    className="text-[17px] sm:text-[18px] text-[#231F20] font-semibold leading-snug mb-1.5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {prog.title}
                  </h3>
                  <p
                    className="text-gray-600 text-[13.5px] sm:text-[14px] font-light leading-relaxed mb-3"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {prog.summary}
                  </p>
                </div>

                {/* Read More Link */}
                <button
                  type="button"
                  onClick={() => onReadMore(prog)}
                  className="text-[#8E793E] hover:text-[#AD974F] text-[13.5px] sm:text-[14px] font-medium transition-colors text-left inline-block underline cursor-pointer self-start"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

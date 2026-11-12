import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Award, Users } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export default function HomeYoungGardenersPreview() {
  const { youngGardeners } = useContent();

  return (
    <section className="bg-[#FFFFFF] text-[#231F20] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-[#231F20]/10">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Spotlight Teaser Card */}
        <div className="relative rounded-[3px] border border-[#AD974F]/40 bg-gradient-to-br from-[#1F1B1C] to-[#141213] text-white p-7 sm:p-10 lg:p-12 overflow-hidden shadow-xl">
          {/* Subtle Golden Radial Glow in Background */}
          <div
            className="pointer-events-none absolute -right-20 -bottom-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F5D36B 0%, #AD974F 40%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Teaser */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="inline-block bg-[#AD974F]/25 border border-[#AD974F]/60 px-3 py-1 text-[11px] text-[#F5D36B] font-semibold tracking-wider uppercase rounded-[2px]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {youngGardeners.status || 'Upcoming Boot Camp'}
                </span>
                <span
                  className="text-xs text-gray-400 font-light"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Powered by Voice Of Children
                </span>
              </div>

              <h2
                className="text-[28px] sm:text-[36px] lg:text-[42px] text-white font-normal leading-[1.14] tracking-tight"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
              >
                {youngGardeners.title}
              </h2>

              <p
                className="text-gray-300 text-[14.5px] sm:text-[16px] font-light leading-relaxed max-w-2xl"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {youngGardeners.about} An immersive outdoor boot camp that connects young learners with organic plant science, environmental stewardship, and real-world problem-solving.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 pb-2">
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <div className="w-7 h-7 rounded-full bg-[#AD974F]/20 border border-[#AD974F]/40 flex items-center justify-center text-[#F5D36B] shrink-0">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                  <span style={{ fontFamily: "'Outfit', sans-serif" }}>Botanical Plant Science</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <div className="w-7 h-7 rounded-full bg-[#AD974F]/20 border border-[#AD974F]/40 flex items-center justify-center text-[#F5D36B] shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span style={{ fontFamily: "'Outfit', sans-serif" }}>Cohorts for Ages 5–16</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <div className="w-7 h-7 rounded-full bg-[#AD974F]/20 border border-[#AD974F]/40 flex items-center justify-center text-[#F5D36B] shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span style={{ fontFamily: "'Outfit', sans-serif" }}>Hands-on STEM Mastery</span>
                </div>
              </div>

              {/* CTA linking to the full dedicated page */}
              <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/young-gardeners"
                  className="btn-primary !h-11 !px-7 text-[14.5px] w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
                >
                  <span>Explore Curriculum &amp; Register</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span
                  className="text-xs text-gray-400 font-light"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Full module outline, fee structure &amp; dates on dedicated page
                </span>
              </div>
            </div>

            {/* Right Distinctive Emblem Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center py-4 lg:py-0 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="relative">
                {/* Outer concentric gold ring */}
                <div
                  className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-[#AD974F]/40 flex items-center justify-center p-2.5 shadow-[0_0_30px_rgba(173,151,79,0.15)]"
                >
                  {/* Inner dark badge */}
                  <div className="w-full h-full rounded-full bg-[#231F20] border border-[#AD974F] flex flex-col items-center justify-center p-3 text-center">
                    <Sprout className="w-5 h-5 text-[#AD974F] mb-1" />
                    <span
                      className="text-[#F5D36B] text-[13.5px] sm:text-[14.5px] font-medium leading-tight"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      Young
                      <br />
                      Gardeners
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-wider text-[#AD974F] mt-1 font-semibold"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Boot Camp
                    </span>
                  </div>
                </div>
              </div>

              <span
                className="mt-4 text-xs tracking-wider uppercase font-medium text-[#AD974F]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                The Green Glow Club
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

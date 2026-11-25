import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Car, Bike, AlertCircle } from 'lucide-react';
import { drawRef } from '../../lib/drawIcon';
import { useContent } from '../../context/ContentContext';

export default function HomeTrafficParkPreview() {
  const { trafficPark } = useContent();
  const videoRef = useRef(null);

  return (
    <section className="bg-[#000000] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-[#AD974F]/20">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Teaser Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-block border border-[#AD974F]/70 px-2.5 py-0.5 text-[11px] font-normal tracking-wide text-[#AD974F] rounded-[2px] uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Coming soon
              </span>
              <span
                className="text-xs text-gray-400 font-light"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                • A Social Education Project
              </span>
            </div>

            <h2
              className="text-[32px] sm:text-[40px] lg:text-[44px] text-[#F5D36B] font-normal leading-tight tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
            >
              {trafficPark.title}
            </h2>

            <p
              className="text-white/95 text-[16px] sm:text-[17px] font-normal leading-snug"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {trafficPark.tagline}
            </p>

            <p
              className="text-gray-300 text-[14px] sm:text-[15px] font-light leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Pakistan's first interactive traffic educational park simulating miniature roads, signals, and vehicles to educate future drivers and reduce road accidents from a young age.
            </p>

            {/* 3 Quick Pill Badges */}
            <div className="flex flex-wrap gap-2.5 py-1">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-[2px] text-xs text-gray-300">
                <Car ref={drawRef} className="icon-draw w-3.5 h-3.5 text-[#AD974F]" />
                Miniature Roads &amp; Signals
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-[2px] text-xs text-gray-300">
                <Bike ref={drawRef} className="icon-draw w-3.5 h-3.5 text-[#AD974F]" />
                Driving &amp; Cycle Navigation
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-[2px] text-xs text-gray-300">
                <ShieldCheck ref={drawRef} className="icon-draw w-3.5 h-3.5 text-[#AD974F]" />
                Safety &amp; First Aid Drills
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                to="/traffic-park"
                className="btn-primary !h-11 !px-6 text-[14px] inline-flex items-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
              >
                <span>Explore Full Project &amp; Proposal</span>
                <ArrowRight className="arrow-nudge w-4 h-4" />
              </Link>
            </div>
            <p
              className="text-xs text-gray-400 font-light"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Detailed objectives, curriculum offerings, market need &amp; partnership details on dedicated page.
            </p>
          </div>

          {/* Right Video Preview Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[3px] border border-[#AD974F]/50 bg-[#141213] overflow-hidden shadow-2xl">
              {/* Badge overlay */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-[#231F20]/85 backdrop-blur-sm border border-[#AD974F]/50 px-2.5 py-1 rounded-[2px]">
                <span className="w-2 h-2 rounded-full bg-[#AD974F] animate-pulse" />
                <span
                  className="text-[11px] tracking-wider text-[#F5D36B] uppercase font-medium"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Traffic Path Preview
                </span>
              </div>

              {/* Video element */}
              <div
                className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden"
              >
                <video
                  ref={videoRef}
                  src={trafficPark.videoSrc}
                  poster="/assets/traffic-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src={trafficPark.videoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, BookOpen, Users, Compass, AlertTriangle, Car, Bike, Sparkles, HeartHandshake } from 'lucide-react';
import { drawRef } from '../lib/drawIcon';
import { useContent } from '../context/ContentContext';

export default function TrafficPark({ onReadMore }) {
  const { trafficPark } = useContent();
  const videoRef = useRef(null);

  const objectiveIcons = [
    BookOpen,
    Users,
    Compass,
    AlertTriangle,
  ];

  const offeringIcons = [
    Sparkles,
    Car,
    ShieldCheck,
    HeartHandshake,
  ];

  return (
    <div id="traffic-park" className="bg-[#0A0909] text-white pt-3 sm:pt-4 lg:pt-5 pb-20 w-full overflow-x-hidden">
      {/* Anchor alias */}
      <div id="traffic-path" className="relative -top-24 pointer-events-none" />

      {/* 1. HERO & VIDEO PRESENTATION */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 border-b border-white/10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6 lg:items-center">
          {/* Header Description */}
          <div className="order-1 lg:col-start-1 lg:col-span-6 space-y-3.5 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-block border border-[#AD974F]/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#F5D36B] rounded-[2px] uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Project Proposal &amp; Vision
              </span>
              <span
                className="text-xs text-gray-400 font-light"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                • {trafficPark.attribution}
              </span>
            </div>

            <h1
              className="text-[34px] sm:text-[44px] lg:text-[50px] text-[#F5D36B] font-normal leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
            >
              {trafficPark.title}
            </h1>

            <p
              className="text-white/95 text-[17px] sm:text-[19px] font-normal leading-snug"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {trafficPark.tagline}
            </p>

            <p
              className="text-gray-300 text-[14.5px] sm:text-[15.5px] font-light leading-relaxed pt-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {trafficPark.intro}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-primary !h-11 !px-6 text-[14px] inline-flex items-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
              >
                <span>Partner or Enquire</span>
                <ArrowRight className="arrow-nudge w-4 h-4" />
              </Link>
              {onReadMore && (
                <button
                  type="button"
                  onClick={onReadMore}
                  className="btn-secondary !h-11 !px-5 text-[14px]"
                >
                  Quick Modal Summary
                </button>
              )}
            </div>
          </div>

          {/* Video Player */}
          <div className="order-2 my-6 sm:my-8 lg:my-0 lg:col-start-7 lg:col-span-6 lg:self-center">
            <div className="relative rounded-[3px] border border-[#AD974F]/50 bg-[#141213] overflow-hidden shadow-2xl">
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-[#231F20]/85 backdrop-blur-sm border border-[#AD974F]/50 px-2.5 py-1 rounded-[2px]">
                <span className="w-2 h-2 rounded-full bg-[#AD974F] animate-pulse" />
                <span
                  className="text-[11px] tracking-wider text-[#F5D36B] uppercase font-medium"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  3D Simulation Preview
                </span>
              </div>

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
      </section>

      {/* 2. EXECUTIVE BACKGROUND & INITIATIVE NARRATIVE */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-[#141213] border border-[#AD974F]/40 p-6 sm:p-8 rounded-[2px] relative overflow-hidden">
            <span
              className="text-[#AD974F] text-[11px] font-semibold tracking-[0.18em] uppercase block mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              The Problem &amp; Need
            </span>
            <h3
              className="text-[22px] sm:text-[26px] text-[#F5D36B] font-normal leading-snug mb-4"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Saving Lives Through Early Road Education
            </h3>
            <p
              className="text-gray-300 text-[14.5px] font-light leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {trafficPark.summary}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4 pt-2">
            <span
              className="text-[#AD974F] text-[11px] font-semibold tracking-[0.18em] uppercase block"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              The Concept
            </span>
            <h2
              className="text-[28px] sm:text-[34px] text-white font-normal leading-tight tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              A Controlled, Interactive Traffic Learning Environment
            </h2>
            {trafficPark.fullContent?.intro?.map((p, idx) => (
              <p
                key={idx}
                className="text-gray-300 text-[15px] font-light leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE PROJECT OBJECTIVES (4 GRID CARDS) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-white/10">
        <div className="mb-8 sm:mb-10">
          <span
            className="text-[#AD974F] text-[11px] font-semibold tracking-[0.18em] uppercase block mb-1.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Strategic Goals
          </span>
          <h2
            className="text-[28px] sm:text-[36px] text-white font-normal tracking-tight"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Project Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trafficPark.fullContent?.objectives?.map((obj, idx) => {
            const Icon = objectiveIcons[idx % objectiveIcons.length];
            return (
              <div
                key={obj.title}
                className="bg-[#141213] border border-white/15 p-6 rounded-[2px] flex flex-col justify-between hover:border-[#AD974F] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-[2px] bg-[#AD974F]/15 border border-[#AD974F]/30 flex items-center justify-center text-[#F5D36B] mb-4">
                    <Icon ref={drawRef} className="icon-draw w-5 h-5" />
                  </div>
                  <h3
                    className="text-[19px] text-[#F5D36B] font-medium mb-2"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    {obj.title}
                  </h3>
                  <p
                    className="text-gray-300 text-[13.5px] font-light leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {obj.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SERVICES AND OFFERINGS (4 FEATURE PANELS) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-white/10">
        <div className="mb-8 sm:mb-10">
          <span
            className="text-[#AD974F] text-[11px] font-semibold tracking-[0.18em] uppercase block mb-1.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Hands-on Park Modules
          </span>
          <h2
            className="text-[28px] sm:text-[36px] text-white font-normal tracking-tight"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Services &amp; Offerings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trafficPark.fullContent?.offerings?.map((offering, idx) => {
            const Icon = offeringIcons[idx % offeringIcons.length];
            return (
              <div
                key={offering.title}
                className="bg-[#141213] border border-white/10 p-6 sm:p-7 rounded-[2px] flex items-start gap-4 hover:border-[#AD974F]/60 transition-colors"
              >
                <div className="w-11 h-11 rounded-[2px] bg-[#AD974F]/10 border border-[#AD974F]/30 flex items-center justify-center text-[#F5D36B] shrink-0 mt-0.5">
                  <Icon ref={drawRef} className="icon-draw w-5 h-5" />
                </div>
                <div>
                  <h3
                    className="text-[19px] sm:text-[20px] text-[#F5D36B] font-medium mb-1.5"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    {offering.title}
                  </h3>
                  <p
                    className="text-gray-300 text-[14px] font-light leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {offering.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CONCLUSION & SCHOOL / SPONSOR PARTNERSHIP CALLOUT */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="rounded-[3px] border border-[#AD974F]/40 bg-gradient-to-r from-[#1A1718] via-[#231F20] to-[#141213] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <span
              className="text-[#AD974F] text-[11px] font-semibold tracking-[0.18em] uppercase block"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Impact Summary
            </span>

            <h2
              className="text-[26px] sm:text-[34px] text-[#F5D36B] font-normal leading-snug"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Fostering Responsible Road Use for the Next Generation
            </h2>

            <p
              className="text-gray-200 text-[14.5px] sm:text-[15.5px] font-light leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {trafficPark.fullContent?.conclusion}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/contact"
                className="btn-primary !h-12 !px-8 text-[15px] inline-flex items-center gap-2 shadow-lg hover:scale-[1.01] transition-transform"
              >
                <span>Partner or Enquire for Your School</span>
                <ArrowRight className="arrow-nudge w-4 h-4" />
              </Link>
              <a
                href="tel:+923001220208"
                className="text-sm text-gray-300 hover:text-[#F5D36B] transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Or call us directly at 0300 1220208
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { trafficPark } from '../data/content';

export default function TrafficPark({ onReadMore }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Set reduced playback speed (0.65x) as requested
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.65;
    }
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.65;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="traffic-park" className="bg-[#000000] text-white py-14 sm:py-20 lg:py-24">
      {/* Anchor alias for #traffic-path */}
      <div id="traffic-path" className="relative -top-24 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Layout structure:
          - Mobile (< lg): Single flex-col sequence:
              1. Header (Coming soon + Title + Subtitle + Intro)
              2. Video Player
              3. Bullets list
              4. Read the proposal button
          - Desktop (>= lg): 12-column grid:
              Left side (cols 1..6):
                Row 1: Header
                Row 2: Bullets
                Row 3: Button
              Right side (cols 7..12):
                Rows 1..3: Video Player vertically centered
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6 lg:items-center">
          
          {/* 1. Header (Tag + Title + Tagline + Intro) */}
          <div className="order-1 lg:col-start-1 lg:col-span-6 lg:row-start-1 space-y-3 sm:space-y-4">
            <div>
              <span
                className="inline-block border border-[#AD974F]/70 px-2.5 py-0.5 text-[11px] font-normal tracking-wide text-[#AD974F] rounded-[2px]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Coming soon
              </span>
            </div>

            {/* Title: Yellow serif matching reference */}
            <h2
              className="text-[34px] sm:text-[42px] lg:text-[48px] text-[#F5D36B] font-normal leading-[1.12] tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
            >
              {trafficPark.title}
            </h2>

            {/* Tagline */}
            <p
              className="text-white/95 text-[16px] sm:text-[18px] font-normal leading-snug"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {trafficPark.tagline}
            </p>

            {/* Intro paragraph matching reference */}
            <p
              className="text-gray-300 text-[14.5px] sm:text-[15.5px] font-light leading-relaxed pt-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {trafficPark.intro}
            </p>
          </div>

          {/* 2. Video Player (order-2 on mobile, col 7-12 spanning rows on desktop) */}
          <div className="order-2 my-6 sm:my-8 lg:my-0 lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:row-span-3 lg:self-center">
            <div className="relative rounded-[3px] border border-[#AD974F]/50 bg-[#141213] overflow-hidden shadow-2xl">
              
              {/* Badge overlay indicating Traffic Path video */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-[#231F20]/85 backdrop-blur-sm border border-[#AD974F]/50 px-2.5 py-1 rounded-[2px]">
                <span className="w-2 h-2 rounded-full bg-[#AD974F] animate-pulse" />
                <span
                  className="text-[11px] tracking-wider text-[#F5D36B] uppercase font-medium"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Traffic Path Preview
                </span>
              </div>

              {/* Video element with H.264 MP4 primary and MOV fallback */}
              <div
                className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={togglePlay}
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
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                >
                  <source src={trafficPark.videoSrc} type="video/mp4" />
                  Your browser does not support playing this video format.
                </video>

                {/* Custom Overlay: Only Play/Pause Button */}
                <div
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 flex items-center justify-start z-20 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#AD974F] text-[#231F20] hover:bg-[#F5D36B] transition-transform active:scale-95 cursor-pointer shadow-lg"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Bullets list matching reference (bold title + inline text) */}
          <div className="order-3 lg:col-start-1 lg:col-span-6 lg:row-start-2">
            <ul className="space-y-2.5 sm:space-y-3">
              {trafficPark.bullets.map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] sm:text-[15.5px] text-gray-300 leading-relaxed"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <strong className="font-semibold text-white">{item.bold}</strong>{' '}
                  <span className="font-light">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Button matching reference ("Read the proposal") */}
          <div className="order-4 mt-6 sm:mt-8 lg:mt-2 lg:col-start-1 lg:col-span-6 lg:row-start-3">
            <button
              type="button"
              onClick={onReadMore}
              className="inline-block border border-[#AD974F]/90 bg-transparent text-white hover:bg-[#AD974F] hover:text-[#231F20] px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium transition-colors rounded-[2px] cursor-pointer"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Read the proposal
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

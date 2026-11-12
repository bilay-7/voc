import React from 'react';
import HeroGrid from '../components/HeroGrid';
import LearningCycle from '../components/LearningCycle';
import HomeProgramsPreview from '../components/home/HomeProgramsPreview';
import HomeYoungGardenersPreview from '../components/home/HomeYoungGardenersPreview';
import HomeAiWorkshopPreview from '../components/home/HomeAiWorkshopPreview';
import HomeTrafficParkPreview from '../components/home/HomeTrafficParkPreview';
import HomeContactPreview from '../components/home/HomeContactPreview';

export default function HomePage({ onOpenProgram }) {
  return (
    <div className="w-full">
      {/* 1. Hero: Vision, Emblem & Mission */}
      <HeroGrid />

      {/* 2. Interactive Learning Cycle */}
      <LearningCycle onOpenProgram={onOpenProgram} />

      {/* 3. Programs Preview Snippet */}
      <HomeProgramsPreview />

      {/* 4. Young Gardeners Boot Camp Preview Snippet */}
      <HomeYoungGardenersPreview />

      {/* 5. AI & Digital Skills Workshop Preview Snippet */}
      <HomeAiWorkshopPreview />

      {/* 6. Traffic Path Project Preview Snippet */}
      <HomeTrafficParkPreview />

      {/* 7. Contact & Enrolment Quick Action Snippet */}
      <HomeContactPreview />
    </div>
  );
}

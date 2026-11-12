import React from 'react';
import HeroGrid from '../components/HeroGrid';
import LearningCycle from '../components/LearningCycle';

export default function AboutPage({ onOpenProgram }) {
  return (
    <>
      <HeroGrid />
      <LearningCycle onOpenProgram={onOpenProgram} />
    </>
  );
}

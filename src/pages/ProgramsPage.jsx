import React from 'react';
import Programs from '../components/Programs';

export default function ProgramsPage({ onReadMore }) {
  return (
    <div className="w-full">
      <Programs onReadMore={onReadMore} />
    </div>
  );
}

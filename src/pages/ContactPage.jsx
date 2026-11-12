import React from 'react';
import Contact from '../components/Contact';

export default function ContactPage({ preselectedProgram, onConsumedPreselect }) {
  return (
    <div className="w-full">
      <Contact
        preselectedProgram={preselectedProgram}
        onConsumedPreselect={onConsumedPreselect}
      />
    </div>
  );
}

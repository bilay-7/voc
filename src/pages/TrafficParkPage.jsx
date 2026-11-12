import React from 'react';
import TrafficPark from '../components/TrafficPark';

export default function TrafficParkPage({ onOpenProposal }) {
  return (
    <div className="w-full">
      <TrafficPark onReadMore={onOpenProposal} />
    </div>
  );
}

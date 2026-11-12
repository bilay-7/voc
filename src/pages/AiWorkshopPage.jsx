import React from 'react';
import { useNavigate } from 'react-router-dom';
import AiWorkshop from '../components/AiWorkshop';

export default function AiWorkshopPage({ onPreselectProgram }) {
  const navigate = useNavigate();

  const handleEnquire = () => {
    onPreselectProgram?.('AI & Digital Skills Workshop');
    navigate('/contact');
  };

  return (
    <div className="w-full">
      <AiWorkshop onEnquire={handleEnquire} />
    </div>
  );
}

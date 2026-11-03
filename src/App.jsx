import React, { useCallback, useState } from 'react';
import Header from './components/Header';
import HeroGrid from './components/HeroGrid';
import LearningCycle from './components/LearningCycle';
import Programs from './components/Programs';
import YoungGardeners from './components/YoungGardeners';
import AiWorkshop from './components/AiWorkshop';
import TrafficPark from './components/TrafficPark';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { privacyNotice, trafficPark } from './data/content';
import { ProgramIcon } from './lib/icons';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [trafficOpen, setTrafficOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [preselectedProgram, setPreselectedProgram] = useState('');

  const scrollToContact = useCallback((programTitle = '') => {
    setSelectedProgram(null);
    setTrafficOpen(false);
    if (programTitle) setPreselectedProgram(programTitle);
    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white text-[#231F20]">
      <Header />
      <main>
        <HeroGrid />
        <LearningCycle onOpenProgram={setSelectedProgram} />
        <Programs onReadMore={setSelectedProgram} />
        <YoungGardeners />
        <AiWorkshop onEnquire={() => scrollToContact('AI & Digital Skills Workshop')} />
        <TrafficPark onReadMore={() => setTrafficOpen(true)} />
        <Contact
          preselectedProgram={preselectedProgram}
          onConsumedPreselect={() => setPreselectedProgram('')}
        />
      </main>
      <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />

      {/* Program Details Modal */}
      <Modal
        open={Boolean(selectedProgram)}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title || 'Program'}
      >
        {selectedProgram && (
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-gray-200 text-[#8E793E]">
              <ProgramIcon name={selectedProgram.icon} className="h-6 w-6 stroke-[#8E793E]" />
            </div>
            <p
              className="text-gray-700 text-[16px] font-light leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {selectedProgram.description}
            </p>
            <button
              type="button"
              className="btn-primary mt-6"
              onClick={() => scrollToContact(selectedProgram.title)}
            >
              Send an enquiry
            </button>
          </div>
        )}
      </Modal>

      {/* Traffic Path Modal */}
      <Modal open={trafficOpen} onClose={() => setTrafficOpen(false)} title={trafficPark.title}>
        <p
          className="text-[15px] font-medium text-[#8E793E]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {trafficPark.tagline}
        </p>
        <p
          className="mt-1 text-[13px] text-gray-500 font-light"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {trafficPark.attribution}
        </p>
        <div
          className="mt-5 space-y-3.5 text-gray-700 text-[15px] font-light leading-relaxed"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <p>{trafficPark.summary}</p>
          {trafficPark.fullContent.intro.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <h3
          className="mt-6 text-[22px] font-normal text-[#231F20]"
          style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
        >
          Objectives
        </h3>
        <ul className="mt-3 space-y-2.5">
          {trafficPark.fullContent.objectives.map((item) => (
            <li key={item.title} className="flex items-start gap-2.5">
              <span className="text-[#AD974F] text-[10px] mt-1 shrink-0 leading-none">◆</span>
              <p
                className="text-gray-700 text-[14px] font-light"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="font-medium text-[#231F20]">{item.title}: </span>
                {item.text}
              </p>
            </li>
          ))}
        </ul>

        <h3
          className="mt-6 text-[22px] font-normal text-[#231F20]"
          style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
        >
          Services and offerings
        </h3>
        <ul className="mt-3 space-y-2.5">
          {trafficPark.fullContent.offerings.map((item) => (
            <li key={item.title} className="flex items-start gap-2.5">
              <span className="text-[#AD974F] text-[10px] mt-1 shrink-0 leading-none">◆</span>
              <p
                className="text-gray-700 text-[14px] font-light"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="font-medium text-[#231F20]">{item.title}: </span>
                {item.text}
              </p>
            </li>
          ))}
        </ul>

        <p
          className="mt-6 text-gray-700 text-[15px] font-light leading-relaxed"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {trafficPark.fullContent.conclusion}
        </p>

        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() => scrollToContact('Traffic Path')}
        >
          Send an enquiry
        </button>
      </Modal>

      {/* Privacy Notice Modal */}
      <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title={privacyNotice.title}>
        <div
          className="space-y-4 text-gray-700 text-[15px] font-light leading-relaxed"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {privacyNotice.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import YoungGardenersPage from './pages/YoungGardenersPage';
import AiWorkshopPage from './pages/AiWorkshopPage';
import TrafficParkPage from './pages/TrafficParkPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import { useContent } from './context/ContentContext';
import { ProgramIcon } from './lib/icons';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [trafficOpen, setTrafficOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [preselectedProgram, setPreselectedProgram] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { trafficPark, privacyNotice } = useContent();

  const handleEnquireFromModal = (programTitle = '') => {
    setSelectedProgram(null);
    setTrafficOpen(false);
    if (programTitle) {
      setPreselectedProgram(programTitle);
    }
    navigate('/contact');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#141213]">
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white text-[#231F20] flex flex-col justify-between">
      <ScrollToTop />
      <Header />
      <div className="h-[68px] sm:h-[72px] shrink-0" aria-hidden="true" />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenProgram={setSelectedProgram} />}
          />
          <Route
            path="/about"
            element={<HomePage onOpenProgram={setSelectedProgram} />}
          />
          <Route
            path="/programs"
            element={<ProgramsPage onReadMore={setSelectedProgram} />}
          />
          <Route
            path="/young-gardeners"
            element={<YoungGardenersPage />}
          />
          <Route
            path="/ai-workshop"
            element={
              <AiWorkshopPage
                onPreselectProgram={(prog) => setPreselectedProgram(prog)}
              />
            }
          />
          <Route
            path="/traffic-park"
            element={
              <TrafficParkPage
                onOpenProposal={() => setTrafficOpen(true)}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                preselectedProgram={preselectedProgram}
                onConsumedPreselect={() => setPreselectedProgram('')}
              />
            }
          />
        </Routes>
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
            <div className="prog-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-gray-200 text-[#8E793E]">
              <ProgramIcon name={selectedProgram.icon || selectedProgram.id} className="prog-icon-svg h-6 w-6 stroke-[#8E793E]" />
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
              onClick={() => handleEnquireFromModal(selectedProgram.title)}
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
          {trafficPark.fullContent?.intro?.map((p, idx) => (
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
          {trafficPark.fullContent?.objectives?.map((item) => (
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
          {trafficPark.fullContent?.offerings?.map((item) => (
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
          {trafficPark.fullContent?.conclusion}
        </p>

        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() => handleEnquireFromModal('Traffic Path')}
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
          {privacyNotice.paragraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </Modal>
    </div>
  );
}

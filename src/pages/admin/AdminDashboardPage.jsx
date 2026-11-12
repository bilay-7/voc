import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import {
  Settings,
  Phone,
  FileText,
  BookOpen,
  Sprout,
  Cpu,
  Car,
  Mail,
  LogOut,
  Save,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Plus,
  ExternalLink,
  Download,
  Upload,
  KeyRound,
  Shield,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    site,
    vision,
    mission,
    organizationStatement,
    learningCycle,
    youngGardeners,
    trafficPark,
    aiWorkshop,
    privacyNotice,
    programs,
    enquiries,
    updateSite,
    updateAbout,
    updatePrograms,
    updateProgram,
    updateYoungGardeners,
    updateAiWorkshop,
    updateTrafficPark,
    updatePrivacyNotice,
    deleteEnquiry,
    clearAllEnquiries,
    resetToDefaults,
    exportContentJSON,
    importContentJSON,
    isAdminAuthenticated,
    logoutAdmin,
    updateAdminCredentials,
  } = useContent();

  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState('site');
  const [saveToast, setSaveToast] = useState('');

  // Draft form states
  const [siteForm, setSiteForm] = useState(site);
  const [aboutForm, setAboutForm] = useState({
    vision,
    organizationStatement,
    mission: [...mission],
    learningCycle: { ...learningCycle },
  });
  const [ygForm, setYgForm] = useState({
    ...youngGardeners,
    topics: [...youngGardeners.topics],
  });
  const [tpForm, setTpForm] = useState({ ...trafficPark });
  const [aiForm, setAiForm] = useState({ ...aiWorkshop });
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?.id || 'traffic-park');
  const [selectedAiModuleId, setSelectedAiModuleId] = useState(aiWorkshop.modules[0]?.id || 'intro-ai');

  // Security / password form
  const [newUsername, setNewUsername] = useState('admin');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [importMsg, setImportMsg] = useState('');

  // Redirect if not logged in
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#141213] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-[#1A1718] border border-[#AD974F]/40 p-8 rounded text-center max-w-md w-full">
          <Shield className="h-12 w-12 text-[#AD974F] mx-auto mb-4" />
          <h2
            className="text-2xl text-[#F5D36B]"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Access Restricted
          </h2>
          <p className="mt-2 text-sm text-gray-400">Please log in to access the owner admin panel.</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="mt-6 btn-primary w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const triggerToast = (msg = 'Changes saved successfully!') => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleSaveSite = (e) => {
    e.preventDefault();
    updateSite(siteForm);
    triggerToast('Site & Contact information updated!');
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateAbout(aboutForm);
    triggerToast('Vision, Mission & Learning Cycle updated!');
  };

  const handleSaveProgram = (prog) => {
    updateProgram(prog.id, prog);
    triggerToast(`Program "${prog.title}" updated!`);
  };

  const handleSaveYoungGardeners = (e) => {
    e.preventDefault();
    updateYoungGardeners(ygForm);
    triggerToast('Young Gardeners Boot Camp info updated!');
  };

  const handleSaveAiWorkshop = (e) => {
    e.preventDefault();
    updateAiWorkshop(aiForm);
    triggerToast('AI & Digital Skills Workshop updated!');
  };

  const handleSaveTrafficPark = (e) => {
    e.preventDefault();
    updateTrafficPark(tpForm);
    triggerToast('Traffic Path content updated!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setPasswordMsg('Please enter a new password.');
      return;
    }
    const res = updateAdminCredentials(newUsername.trim(), newPassword.trim());
    if (res.success) {
      setPasswordMsg('Password changed successfully! Remember these credentials for your next login.');
      setNewPassword('');
    } else {
      setPasswordMsg('Failed to update password: ' + res.error);
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportContentJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `voc-content-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = (e) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const res = importContentJSON(importJsonText);
    if (res.success) {
      setImportMsg('Content imported successfully! Updating forms...');
      setTimeout(() => window.location.reload(), 1000);
    } else {
      setImportMsg(res.error);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all site content back to initial defaults?')) {
      resetToDefaults();
      triggerToast('Site content reset to factory defaults.');
      setTimeout(() => window.location.reload(), 800);
    }
  };

  const selectedProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];
  const selectedAiModule = aiForm.modules.find((m) => m.id === selectedAiModuleId) || aiForm.modules[0];

  const tabs = [
    { id: 'site', label: 'Contact & Site', icon: Phone },
    { id: 'about', label: 'Vision & Mission', icon: FileText },
    { id: 'programs', label: '12 Programs', icon: BookOpen },
    { id: 'youngGardeners', label: 'Young Gardeners', icon: Sprout },
    { id: 'aiWorkshop', label: 'AI Workshop', icon: Cpu },
    { id: 'trafficPark', label: 'Traffic Path', icon: Car },
    { id: 'enquiries', label: `Inquiries (${enquiries.length})`, icon: Mail },
    { id: 'settings', label: 'Security & Backup', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#141213] text-gray-200 flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-[#1A1718] border-b border-[#AD974F]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="Voice of Children" className="h-8 w-auto" />
            <span
              className="text-[#F5D36B] font-medium text-lg hidden sm:inline"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Voice of Children
            </span>
          </Link>
          <span className="bg-[#AD974F]/20 border border-[#AD974F]/50 text-[#F5D36B] text-[11px] font-medium px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
            Admin Portal
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#F5D36B] transition-colors border border-white/10 px-3 py-1.5 rounded-[2px]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Live Site
          </Link>
          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin/login');
            }}
            className="inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-100 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Floating Save Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#AD974F] text-[#231F20] font-medium px-4 py-3 rounded-[2px] shadow-2xl animate-fade-in text-sm">
          <CheckCircle2 className="h-5 w-5" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Dashboard Body */}
      <div className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 bg-[#1A1718] border border-white/10 rounded-[2px] p-2 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[2px] text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer ${
                  active
                    ? 'bg-[#AD974F] text-[#231F20] font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-[#231F20]' : 'text-[#AD974F]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab Content Panel */}
        <main className="lg:col-span-9 bg-[#1A1718] border border-white/10 rounded-[2px] p-5 sm:p-8">
          {/* TAB 1: SITE & CONTACT */}
          {activeTab === 'site' && (
            <form onSubmit={handleSaveSite} className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl text-[#F5D36B]"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    Contact &amp; General Information
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Updates phone, WhatsApp, email, social links, and registration URLs across header and footer.
                  </p>
                </div>
                <button type="submit" className="btn-primary !h-9 !px-4 text-xs flex items-center gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Phone / Call Number
                  </label>
                  <input
                    type="text"
                    value={siteForm.contact.phone}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        contact: {
                          ...siteForm.contact,
                          phone: e.target.value,
                          phoneHref: `tel:${e.target.value.replace(/\s+/g, '')}`,
                          whatsappHref: `https://wa.me/${e.target.value.replace(/\D/g, '')}`,
                        },
                      })
                    }
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={siteForm.contact.email}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        contact: {
                          ...siteForm.contact,
                          email: e.target.value,
                          emailHref: `mailto:${e.target.value}`,
                        },
                      })
                    }
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Website Domain
                  </label>
                  <input
                    type="text"
                    value={siteForm.domain}
                    onChange={(e) => setSiteForm({ ...siteForm, domain: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Google Form Registration URL
                  </label>
                  <input
                    type="url"
                    value={siteForm.googleFormUrl}
                    onChange={(e) => setSiteForm({ ...siteForm, googleFormUrl: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    value={siteForm.social.instagram}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        social: { ...siteForm.social, instagram: e.target.value },
                      })
                    }
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Facebook Page URL
                  </label>
                  <input
                    type="url"
                    value={siteForm.social.facebook}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        social: { ...siteForm.social, facebook: e.target.value },
                      })
                    }
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Footer Short Description
                </label>
                <textarea
                  rows={2}
                  value={siteForm.shortDescription}
                  onChange={(e) => setSiteForm({ ...siteForm, shortDescription: e.target.value })}
                  className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary !h-10 text-sm flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Site Info
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ABOUT (VISION & MISSION) */}
          {activeTab === 'about' && (
            <form onSubmit={handleSaveAbout} className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl text-[#F5D36B]"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    Vision, Mission &amp; Learning Cycle
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Customize the core statement, vision quote, mission points, and loop cycle header.
                  </p>
                </div>
                <button type="submit" className="btn-primary !h-9 !px-4 text-xs flex items-center gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Our Vision Statement
                </label>
                <textarea
                  rows={2}
                  value={aboutForm.vision}
                  onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                  className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Organization Statement (Bottom of Hero)
                </label>
                <textarea
                  rows={3}
                  value={aboutForm.organizationStatement}
                  onChange={(e) =>
                    setAboutForm({ ...aboutForm, organizationStatement: e.target.value })
                  }
                  className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider text-gray-400">
                    Mission Points (Right Column of Hero)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setAboutForm({
                        ...aboutForm,
                        mission: [...aboutForm.mission, 'New mission statement point.'],
                      })
                    }
                    className="text-xs text-[#F5D36B] hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Point
                  </button>
                </div>

                <div className="space-y-2.5">
                  {aboutForm.mission.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#AD974F] text-xs font-mono w-5 shrink-0">{idx + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...aboutForm.mission];
                          updated[idx] = e.target.value;
                          setAboutForm({ ...aboutForm, mission: updated });
                        }}
                        className="field !bg-[#231F20] !text-white !border-white/20 text-sm flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = aboutForm.mission.filter((_, i) => i !== idx);
                          setAboutForm({ ...aboutForm, mission: updated });
                        }}
                        className="p-2 text-red-400 hover:text-red-200"
                        title="Delete point"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-4">
                <h4 className="text-sm font-semibold text-[#F5D36B] uppercase tracking-wider">
                  Learning Cycle Header
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Cycle Heading
                    </label>
                    <input
                      type="text"
                      value={aboutForm.learningCycle.heading}
                      onChange={(e) =>
                        setAboutForm({
                          ...aboutForm,
                          learningCycle: { ...aboutForm.learningCycle, heading: e.target.value },
                        })
                      }
                      className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Cycle Description
                    </label>
                    <input
                      type="text"
                      value={aboutForm.learningCycle.description}
                      onChange={(e) =>
                        setAboutForm({
                          ...aboutForm,
                          learningCycle: { ...aboutForm.learningCycle, description: e.target.value },
                        })
                      }
                      className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary !h-10 text-sm flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save About Content
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: 12 PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3
                  className="text-xl text-[#F5D36B]"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Manage 12 Programs
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Select any program from the list to update its card title, brief summary, and full modal description.
                </p>
              </div>

              {/* Program Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {programs.map((prog) => (
                  <button
                    key={prog.id}
                    onClick={() => setSelectedProgramId(prog.id)}
                    className={`px-3 py-1.5 text-xs rounded-[2px] transition-colors cursor-pointer border ${
                      selectedProgramId === prog.id
                        ? 'border-[#AD974F] bg-[#AD974F] text-[#231F20] font-semibold'
                        : 'border-white/20 bg-[#231F20] text-gray-300 hover:border-[#AD974F]/60'
                    }`}
                  >
                    {prog.title}
                  </button>
                ))}
              </div>

              {/* Selected Program Editor */}
              <div className="bg-[#231F20] border border-[#AD974F]/40 p-5 sm:p-6 rounded-[2px] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#AD974F] uppercase">
                    ID: {selectedProgram.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSaveProgram(selectedProgram)}
                    className="btn-primary !h-8 !px-3 text-xs flex items-center gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save This Program
                  </button>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Program Title
                  </label>
                  <input
                    type="text"
                    value={selectedProgram.title}
                    onChange={(e) => {
                      updateProgram(selectedProgram.id, { title: e.target.value });
                    }}
                    className="field !bg-[#1A1718] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Card Summary (Displayed in 3-column grid)
                  </label>
                  <textarea
                    rows={2}
                    value={selectedProgram.summary}
                    onChange={(e) => {
                      updateProgram(selectedProgram.id, { summary: e.target.value });
                    }}
                    className="field !bg-[#1A1718] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Full Description (Displayed in modal when "Read more" is clicked)
                  </label>
                  <textarea
                    rows={6}
                    value={selectedProgram.description}
                    onChange={(e) => {
                      updateProgram(selectedProgram.id, { description: e.target.value });
                    }}
                    className="field !bg-[#1A1718] !text-white !border-white/20 text-sm leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: YOUNG GARDENERS */}
          {activeTab === 'youngGardeners' && (
            <form onSubmit={handleSaveYoungGardeners} className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl text-[#F5D36B]"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    Young Gardeners Boot Camp
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Update pricing, duration, age brackets, topics, and registration links.
                  </p>
                </div>
                <button type="submit" className="btn-primary !h-9 !px-4 text-xs flex items-center gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Boot Camp Title
                  </label>
                  <input
                    type="text"
                    value={ygForm.title}
                    onChange={(e) => setYgForm({ ...ygForm, title: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Badge Status Text
                  </label>
                  <input
                    type="text"
                    value={ygForm.status}
                    onChange={(e) => setYgForm({ ...ygForm, status: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Age Groups
                  </label>
                  <input
                    type="text"
                    value={ygForm.ageGroups}
                    onChange={(e) => setYgForm({ ...ygForm, ageGroups: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={ygForm.duration}
                    onChange={(e) => setYgForm({ ...ygForm, duration: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Fee (e.g. Rs 20,000)
                  </label>
                  <input
                    type="text"
                    value={ygForm.fee}
                    onChange={(e) => setYgForm({ ...ygForm, fee: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Fee Subtitle (e.g. Per person)
                  </label>
                  <input
                    type="text"
                    value={ygForm.feeSubtitle}
                    onChange={(e) => setYgForm({ ...ygForm, feeSubtitle: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  About Paragraph
                </label>
                <textarea
                  rows={3}
                  value={ygForm.about}
                  onChange={(e) => setYgForm({ ...ygForm, about: e.target.value })}
                  className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider text-gray-400">
                    Topics List (Curriculum Bullets)
                  </label>
                  <button
                    type="button"
                    onClick={() => setYgForm({ ...ygForm, topics: [...ygForm.topics, 'New topic'] })}
                    className="text-xs text-[#F5D36B] hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Topic
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ygForm.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => {
                          const updated = [...ygForm.topics];
                          updated[idx] = e.target.value;
                          setYgForm({ ...ygForm, topics: updated });
                        }}
                        className="field !bg-[#231F20] !text-white !border-white/20 text-sm flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = ygForm.topics.filter((_, i) => i !== idx);
                          setYgForm({ ...ygForm, topics: updated });
                        }}
                        className="p-2 text-red-400 hover:text-red-200"
                        title="Delete topic"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary !h-10 text-sm flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Young Gardeners Info
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: AI WORKSHOP */}
          {activeTab === 'aiWorkshop' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl text-[#F5D36B]"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    AI &amp; Digital Skills Workshop
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Edit workshop title, introduction, and outcomes for all 8 modules.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveAiWorkshop}
                  className="btn-primary !h-9 !px-4 text-xs flex items-center gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save All AI Modules
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Workshop Main Title
                  </label>
                  <input
                    type="text"
                    value={aiForm.title}
                    onChange={(e) => setAiForm({ ...aiForm, title: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Introduction Statement
                  </label>
                  <textarea
                    rows={2}
                    value={aiForm.introduction}
                    onChange={(e) => setAiForm({ ...aiForm, introduction: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>
              </div>

              {/* Module selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Select Module to Edit
                </label>
                <div className="flex flex-wrap gap-2">
                  {aiForm.modules.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedAiModuleId(m.id)}
                      className={`px-3 py-1.5 text-xs rounded-[2px] transition-colors cursor-pointer border ${
                        selectedAiModuleId === m.id
                          ? 'border-[#AD974F] bg-[#AD974F] text-[#231F20] font-semibold'
                          : 'border-white/20 bg-[#231F20] text-gray-300 hover:border-[#AD974F]/60'
                      }`}
                    >
                      {m.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Module Editor */}
              <div className="bg-[#231F20] border border-[#AD974F]/40 p-5 rounded-[2px] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Module Title
                    </label>
                    <input
                      type="text"
                      value={selectedAiModule.title}
                      onChange={(e) => {
                        const updated = aiForm.modules.map((m) =>
                          m.id === selectedAiModule.id ? { ...m, title: e.target.value } : m,
                        );
                        setAiForm({ ...aiForm, modules: updated });
                      }}
                      className="field !bg-[#1A1718] !text-white !border-white/20 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={selectedAiModule.subtitle}
                      onChange={(e) => {
                        const updated = aiForm.modules.map((m) =>
                          m.id === selectedAiModule.id ? { ...m, subtitle: e.target.value } : m,
                        );
                        setAiForm({ ...aiForm, modules: updated });
                      }}
                      className="field !bg-[#1A1718] !text-white !border-white/20 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs uppercase tracking-wider text-gray-400">
                      Learning Outcomes (Bullets)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = aiForm.modules.map((m) =>
                          m.id === selectedAiModule.id
                            ? { ...m, outcomes: [...m.outcomes, 'New learning outcome'] }
                            : m,
                        );
                        setAiForm({ ...aiForm, modules: updated });
                      }}
                      className="text-xs text-[#F5D36B] hover:underline flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Outcome
                    </button>
                  </div>

                  <div className="space-y-2">
                    {selectedAiModule.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[#AD974F] text-xs">◆</span>
                        <input
                          type="text"
                          value={outcome}
                          onChange={(e) => {
                            const newOutcomes = [...selectedAiModule.outcomes];
                            newOutcomes[idx] = e.target.value;
                            const updated = aiForm.modules.map((m) =>
                              m.id === selectedAiModule.id ? { ...m, outcomes: newOutcomes } : m,
                            );
                            setAiForm({ ...aiForm, modules: updated });
                          }}
                          className="field !bg-[#1A1718] !text-white !border-white/20 text-sm flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newOutcomes = selectedAiModule.outcomes.filter((_, i) => i !== idx);
                            const updated = aiForm.modules.map((m) =>
                              m.id === selectedAiModule.id ? { ...m, outcomes: newOutcomes } : m,
                            );
                            setAiForm({ ...aiForm, modules: updated });
                          }}
                          className="p-1.5 text-red-400 hover:text-red-200"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveAiWorkshop}
                  className="btn-primary !h-10 text-sm flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save All AI Workshop Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: TRAFFIC PATH */}
          {activeTab === 'trafficPark' && (
            <form onSubmit={handleSaveTrafficPark} className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl text-[#F5D36B]"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    Traffic Path Project
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Update preview text, video tagline, and proposal modal contents.
                  </p>
                </div>
                <button type="submit" className="btn-primary !h-9 !px-4 text-xs flex items-center gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={tpForm.title}
                    onChange={(e) => setTpForm({ ...tpForm, title: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={tpForm.tagline}
                    onChange={(e) => setTpForm({ ...tpForm, tagline: e.target.value })}
                    className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Intro Description
                </label>
                <textarea
                  rows={2}
                  value={tpForm.intro}
                  onChange={(e) => setTpForm({ ...tpForm, intro: e.target.value })}
                  className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Proposal Summary
                </label>
                <textarea
                  rows={3}
                  value={tpForm.summary}
                  onChange={(e) => setTpForm({ ...tpForm, summary: e.target.value })}
                  className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Proposal Conclusion
                </label>
                <textarea
                  rows={3}
                  value={tpForm.fullContent?.conclusion || ''}
                  onChange={(e) =>
                    setTpForm({
                      ...tpForm,
                      fullContent: { ...tpForm.fullContent, conclusion: e.target.value },
                    })
                  }
                  className="field !bg-[#231F20] !text-white !border-white/20 text-sm"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-primary !h-10 text-sm flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Traffic Path Info
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: INQUIRIES INBOX */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl text-[#F5D36B]"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    Parent Enquiries ({enquiries.length})
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Real-time list of messages and enrolment requests submitted from the Contact page.
                  </p>
                </div>
                {enquiries.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all inquiries from inbox?')) clearAllEnquiries();
                    }}
                    className="text-xs text-red-400 hover:text-red-200 border border-red-800/40 px-3 py-1.5 rounded-[2px]"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  <Mail className="h-10 w-10 text-[#AD974F]/40 mx-auto mb-3" />
                  <p>No new enquiries right now.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="bg-[#231F20] border border-white/10 p-4 sm:p-5 rounded-[2px] flex flex-col sm:flex-row justify-between items-start gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-white text-base">
                            {enq.parent_name}
                          </span>
                          <span className="bg-[#AD974F]/20 text-[#F5D36B] text-[11px] px-2 py-0.5 rounded-[2px]">
                            {enq.program}
                          </span>
                          <span className="text-xs text-gray-400">
                            Child Age: {enq.child_age}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
                          <span>
                            📞{' '}
                            <a
                              href={`tel:${enq.phone.replace(/\s+/g, '')}`}
                              className="text-[#F5D36B] hover:underline"
                            >
                              {enq.phone}
                            </a>
                          </span>
                          {enq.email && (
                            <span>
                              ✉️{' '}
                              <a
                                href={`mailto:${enq.email}`}
                                className="text-[#F5D36B] hover:underline"
                              >
                                {enq.email}
                              </a>
                            </span>
                          )}
                          <span className="text-gray-500">
                            {enq.created_at
                              ? new Date(enq.created_at).toLocaleDateString()
                              : 'Recently'}
                          </span>
                        </div>

                        {enq.message && (
                          <p className="mt-2 text-sm text-gray-300 bg-[#1A1718] p-2.5 rounded-[2px] border border-white/5">
                            "{enq.message}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => deleteEnquiry(enq.id)}
                        className="text-gray-400 hover:text-red-400 p-2 cursor-pointer self-end sm:self-start"
                        title="Delete enquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SETTINGS, BACKUP & SECURITY */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h3
                  className="text-xl text-[#F5D36B]"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Admin Security &amp; Data Backup
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Change your admin password, download backups, or restore defaults.
                </p>
              </div>

              {/* Password change */}
              <form onSubmit={handleUpdatePassword} className="bg-[#231F20] p-5 rounded-[2px] space-y-4">
                <h4 className="text-sm font-semibold text-[#F5D36B] flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-[#AD974F]" />
                  Change Admin Credentials
                </h4>

                {passwordMsg && (
                  <div className="text-xs text-[#F5D36B] bg-[#AD974F]/10 p-2 rounded">
                    {passwordMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="field !bg-[#1A1718] !text-white !border-white/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="field !bg-[#1A1718] !text-white !border-white/20 text-sm"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary !h-9 text-xs">
                  Update Password
                </button>
              </form>

              {/* Backup & Restore */}
              <div className="bg-[#231F20] p-5 rounded-[2px] space-y-4">
                <h4 className="text-sm font-semibold text-[#F5D36B] flex items-center gap-2">
                  <Download className="h-4 w-4 text-[#AD974F]" />
                  Download / Restore JSON Content Backup
                </h4>
                <p className="text-xs text-gray-400">
                  Export all your customized text and settings into a JSON file, or restore from a previous file.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleExport}
                    className="btn-secondary !h-9 text-xs flex items-center gap-2"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export Backup File
                  </button>
                </div>

                <form onSubmit={handleImport} className="space-y-2 pt-2 border-t border-white/10">
                  <label className="block text-xs uppercase tracking-wider text-gray-400">
                    Paste JSON to Import
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste JSON content here..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="field !bg-[#1A1718] !text-white !border-white/20 text-xs font-mono"
                  />
                  {importMsg && <p className="text-xs text-[#F5D36B]">{importMsg}</p>}
                  <button
                    type="submit"
                    className="btn-secondary !h-8 text-xs flex items-center gap-1.5"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Import JSON
                  </button>
                </form>
              </div>

              {/* Factory reset */}
              <div className="p-5 border border-red-900/50 bg-red-950/20 rounded-[2px] flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-red-300">Reset to Factory Defaults</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Restores all website text, programs, and workshop copy back to original project defaults.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-4 py-2 bg-red-900/60 hover:bg-red-800 text-red-100 text-xs rounded-[2px] border border-red-700/60 cursor-pointer transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  site as defaultSite,
  vision as defaultVision,
  mission as defaultMission,
  organizationStatement as defaultOrgStatement,
  learningCycle as defaultLearningCycle,
  youngGardeners as defaultYoungGardeners,
  trafficPark as defaultTrafficPark,
  privacyNotice as defaultPrivacyNotice,
} from '../data/content';
import { programs as defaultPrograms } from '../data/programs';
import { aiWorkshop as defaultAiWorkshop } from '../data/aiWorkshop';

const STORAGE_KEY = 'voc_site_content_v1';
const ENQUIRIES_KEY = 'voc_enquiries_v1';
const AUTH_KEY = 'voc_admin_auth_v1';
const ADMIN_CRED_KEY = 'voc_admin_credentials_v1';

const defaultContent = {
  site: defaultSite,
  vision: defaultVision,
  mission: defaultMission,
  organizationStatement: defaultOrgStatement,
  learningCycle: defaultLearningCycle,
  youngGardeners: defaultYoungGardeners,
  trafficPark: defaultTrafficPark,
  privacyNotice: defaultPrivacyNotice,
  programs: defaultPrograms,
  aiWorkshop: defaultAiWorkshop,
};

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultContent,
          ...parsed,
          site: {
            ...defaultContent.site,
            ...(parsed.site || {}),
            // Migrate the old cached Instagram profile + drop Facebook; keep any newer admin edit
            social: (() => {
              const savedSocial = parsed.site?.social || {};
              const isOldProfile = /voiceofchildrenofficial/.test(savedSocial.instagram || '');
              return {
                ...defaultContent.site.social,
                ...(savedSocial.instagram && !isOldProfile
                  ? { instagram: savedSocial.instagram, instagramHandle: savedSocial.instagramHandle || defaultContent.site.social.instagramHandle }
                  : {}),
              };
            })(),
          },
          youngGardeners: { ...defaultContent.youngGardeners, ...(parsed.youngGardeners || {}) },
          trafficPark: {
            ...defaultContent.trafficPark,
            ...(parsed.trafficPark || {}),
            videoSrc: defaultContent.trafficPark.videoSrc,
          },
          aiWorkshop: { ...defaultContent.aiWorkshop, ...(parsed.aiWorkshop || {}) },
          privacyNotice: { ...defaultContent.privacyNotice, ...(parsed.privacyNotice || {}) },
          learningCycle: { ...defaultContent.learningCycle, ...(parsed.learningCycle || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to load saved content from localStorage:', e);
    }
    return defaultContent;
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(ENQUIRIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load enquiries:', e);
    }
    return [
      {
        id: 'sample-1',
        parent_name: 'Fatima Ahmed',
        phone: '0301 2345678',
        email: 'fatima.ahmed@example.com',
        child_age: 10,
        program: 'Young Gardeners Boot Camp',
        message: 'Looking for weekend batch options for my daughter.',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  });

  // Save content on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save content to localStorage:', e);
    }
  }, [content]);

  // Save enquiries on change
  useEffect(() => {
    try {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Failed to save enquiries to localStorage:', e);
    }
  }, [enquiries]);

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const loginAdmin = (username, password) => {
    try {
      const savedCreds = localStorage.getItem(ADMIN_CRED_KEY);
      const creds = savedCreds ? JSON.parse(savedCreds) : { username: 'admin', password: 'admin123' };
      if (username === creds.username && password === creds.password) {
        localStorage.setItem(AUTH_KEY, 'true');
        setIsAdminAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Invalid username or password. Default is admin / admin123' };
    } catch {
      return { success: false, error: 'Authentication failed.' };
    }
  };

  const logoutAdmin = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
    setIsAdminAuthenticated(false);
  };

  const updateAdminCredentials = (username, newPassword) => {
    try {
      localStorage.setItem(ADMIN_CRED_KEY, JSON.stringify({ username, password: newPassword }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Content updaters
  const updateSite = (newSite) => {
    setContent((prev) => ({ ...prev, site: { ...prev.site, ...newSite } }));
  };

  const updateAbout = (newAbout) => {
    setContent((prev) => ({
      ...prev,
      vision: newAbout.vision !== undefined ? newAbout.vision : prev.vision,
      organizationStatement:
        newAbout.organizationStatement !== undefined
          ? newAbout.organizationStatement
          : prev.organizationStatement,
      mission: newAbout.mission !== undefined ? newAbout.mission : prev.mission,
      learningCycle:
        newAbout.learningCycle !== undefined
          ? { ...prev.learningCycle, ...newAbout.learningCycle }
          : prev.learningCycle,
    }));
  };

  const updatePrograms = (newPrograms) => {
    setContent((prev) => ({ ...prev, programs: newPrograms }));
  };

  const updateProgram = (id, updatedProgram) => {
    setContent((prev) => ({
      ...prev,
      programs: prev.programs.map((p) => (p.id === id ? { ...p, ...updatedProgram } : p)),
    }));
  };

  const updateYoungGardeners = (newYg) => {
    setContent((prev) => ({
      ...prev,
      youngGardeners: { ...prev.youngGardeners, ...newYg },
    }));
  };

  const updateAiWorkshop = (newAi) => {
    setContent((prev) => ({
      ...prev,
      aiWorkshop: { ...prev.aiWorkshop, ...newAi },
    }));
  };

  const updateTrafficPark = (newTp) => {
    setContent((prev) => ({
      ...prev,
      trafficPark: { ...prev.trafficPark, ...newTp },
    }));
  };

  const updatePrivacyNotice = (newNotice) => {
    setContent((prev) => ({
      ...prev,
      privacyNotice: { ...prev.privacyNotice, ...newNotice },
    }));
  };

  const addEnquiry = (enquiry) => {
    const newEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const deleteEnquiry = (id) => {
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllEnquiries = () => {
    setEnquiries([]);
  };

  const resetToDefaults = () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const importContentJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      setContent({ ...defaultContent, ...parsed });
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Invalid JSON format: ' + e.message };
    }
  };

  const exportContentJSON = () => {
    return JSON.stringify(content, null, 2);
  };

  const value = {
    // Content state
    site: content.site,
    vision: content.vision,
    mission: content.mission,
    organizationStatement: content.organizationStatement,
    learningCycle: content.learningCycle,
    youngGardeners: content.youngGardeners,
    trafficPark: content.trafficPark,
    privacyNotice: content.privacyNotice,
    programs: content.programs,
    aiWorkshop: content.aiWorkshop,

    // Updaters
    updateSite,
    updateAbout,
    updatePrograms,
    updateProgram,
    updateYoungGardeners,
    updateAiWorkshop,
    updateTrafficPark,
    updatePrivacyNotice,
    resetToDefaults,
    importContentJSON,
    exportContentJSON,

    // Enquiries
    enquiries,
    addEnquiry,
    deleteEnquiry,
    clearAllEnquiries,

    // Auth
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateAdminCredentials,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

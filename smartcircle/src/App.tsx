/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import { PageRoute } from './types';
import { useGsapSmoothScroll } from './hooks/useGsapSmoothScroll';

// Utility to parse URL pathname to routes
const parsePathToRoute = (path: string): PageRoute => {
  const trimmed = path.replace(/^\/|\/$/g, '').trim();
  if (trimmed === '' || trimmed === 'index.html') return 'home';
  if (trimmed === 'about') return 'about';
  if (trimmed === 'contact') return 'contact';
  
  if (trimmed.startsWith('services/')) {
    const parts = trimmed.split('/');
    if (parts.length >= 2) {
      const serviceId = parts[1];
      const validServices = [
        'movie-production-marketing',
        'brand-marketing',
        'celebrity-pr',
        'creative-production',
        'youtube-management',
      ];
      if (validServices.includes(serviceId)) {
        return trimmed as PageRoute;
      }
    }
  }
  return 'home';
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    parsePathToRoute(window.location.pathname)
  );

  const [presetService, setPresetService] = useState('');

  // Enable global GSAP-powered smooth scrolling
  useGsapSmoothScroll(currentRoute);

  // Settle back & forward operations
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parsePathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    const urlPath = '/' + (route === 'home' ? '' : route);
    window.history.pushState({}, '', urlPath);
    setCurrentRoute(route);
  };

  const handleSetContactServicePreset = (serviceName: string) => {
    setPresetService(serviceName);
  };

  const handleClearPreset = () => {
    setPresetService('');
  };

  return (
    <div id="master-root-shell" className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Header Navigation */}
      <Navigation currentPath={currentRoute} onNavigate={handleNavigate} />

      {/* Main Page Render Section */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentRoute}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex-grow w-full relative"
          id={`page-container-${currentRoute.replace(/\//g, '-')}`}
        >
          {currentRoute === 'home' && (
            <Home onNavigate={handleNavigate} />
          )}

          {currentRoute === 'about' && (
            <About onNavigate={handleNavigate} />
          )}

          {currentRoute === 'contact' && (
            <Contact
              onNavigate={handleNavigate}
              presetService={presetService}
              onClearPreset={handleClearPreset}
            />
          )}

          {currentRoute.startsWith('services/') && (
            <Services
              serviceId={currentRoute.split('/')[1]}
              onNavigate={handleNavigate}
              onSetContactService={handleSetContactServicePreset}
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Unified Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

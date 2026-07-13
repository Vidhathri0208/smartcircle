/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Film, Radio, Star, Video, Play } from 'lucide-react';
import { PageRoute } from '../types';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: PageRoute) => void;
}

export default function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: 'home' as PageRoute },
    { name: 'About', path: 'about' as PageRoute },
    { name: 'Contact', path: 'contact' as PageRoute },
  ];

  const serviceSubLinks = [
    { name: 'Movie PR', path: 'services/movie-production-marketing' as PageRoute, icon: Film },
    { name: 'Brand Marketing', path: 'services/brand-marketing' as PageRoute, icon: Radio },
    { name: 'Celebrity PR', path: 'services/celebrity-pr' as PageRoute, icon: Star },
    { name: 'Creative Production', path: 'services/creative-production' as PageRoute, icon: Video },
    { name: 'YouTube Scaling', path: 'services/youtube-management' as PageRoute, icon: Play },
  ];

  const handleLinkClick = (path: PageRoute) => {
    onNavigate(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <div
          id="nav-logo"
          onClick={() => handleLinkClick('home')}
          className="flex items-center cursor-pointer group"
        >
          <div className="w-16 h-16 overflow-hidden flex items-center justify-center relative shrink-0">
            <img
              src="/SC-LOGO-png.png"
              alt="Smart Circle Logo"
              className="w-full h-full object-contain scale-[2.2] transition-all duration-500 group-hover:scale-[2.4]"
            />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-8" id="desktop-nav-menu">
          {/* Home Link */}
          <button
            id="nav-link-home"
            onClick={() => handleLinkClick('home')}
            className={`relative font-sans text-sm tracking-wide transition-colors cursor-pointer ${
              currentPath === 'home' ? 'text-amber-400 font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Home
            {currentPath === 'home' && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-amber-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* About Link */}
          <button
            id="nav-link-about"
            onClick={() => handleLinkClick('about')}
            className={`relative font-sans text-sm tracking-wide transition-colors cursor-pointer ${
              currentPath === 'about' ? 'text-amber-400 font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            About
            {currentPath === 'about' && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-amber-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* DRIP SERVICES DROP DOWN */}
          <div className="relative group/services">
            <button
              id="nav-link-services-trigger"
              className={`font-sans text-sm tracking-wide flex items-center space-x-1 cursor-pointer relative ${
                currentPath.startsWith('services/')
                  ? 'text-amber-400 font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Services</span>
              <span className="text-[10px] opacity-60">▼</span>
              {currentPath.startsWith('services/') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-amber-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Dropdown panels */}
            <div
              className="absolute right-1/2 translate-x-1/2 mt-3 w-80 bg-zinc-950/95 border border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-xl opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-300 transform translate-y-2 group-hover/services:translate-y-0 z-50"
              id="nav-services-dropdown"
            >
              <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-3 px-2">
                Specialized Disciplines
              </div>
              <div className="grid gap-2">
                {serviceSubLinks.map((sub) => {
                  const SvgIcon = sub.icon;
                  const isSubActive = currentPath === sub.path;
                  return (
                    <button
                      key={sub.path}
                      id={`nav-sub-${sub.path.replace(/\//g, '-')}`}
                      onClick={() => handleLinkClick(sub.path)}
                      className={`flex items-start space-x-3 p-2.5 rounded-lg text-left transition-all ${
                        isSubActive
                          ? 'bg-amber-400/10 text-amber-400'
                          : 'hover:bg-white/5 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="mt-0.5 rounded p-1 bg-zinc-900 border border-white/5">
                        <SvgIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium tracking-wide">
                          {sub.name}
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-30 mt-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Link */}
          <button
            id="nav-link-contact"
            onClick={() => handleLinkClick('contact')}
            className={`relative font-sans text-sm tracking-wide transition-colors cursor-pointer ${
              currentPath === 'contact' ? 'text-amber-400 font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Contact
            {currentPath === 'contact' && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-amber-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            id="nav-cta-contact"
            onClick={() => handleLinkClick('contact')}
            className="flex items-center space-x-1.5 bg-white font-sans text-xs tracking-wider uppercase font-semibold text-black px-5 py-2.5 rounded-full hover:bg-amber-400 hover:shadow-[0_0_15px_#f59e0b] transition-all"
          >
            <span>Request Council</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MOBILE NAV BUTTON */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[73px] bg-[#050505]/98 border-b border-white/10 backdrop-blur-xl py-8 px-6 lg:hidden z-40 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="grid gap-6">
              <div className="grid gap-4 border-b border-white/5 pb-6">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-2">
                  Navigate
                </div>
                
                {/* Home */}
                <button
                  onClick={() => handleLinkClick('home')}
                  className={`flex items-center text-left py-2 px-3 rounded-lg text-lg ${
                    currentPath === 'home'
                      ? 'text-amber-400 bg-amber-400/5 font-medium'
                      : 'text-zinc-300'
                  }`}
                >
                  Home
                </button>

                {/* About */}
                <button
                  onClick={() => handleLinkClick('about')}
                  className={`flex items-center text-left py-2 px-3 rounded-lg text-lg ${
                    currentPath === 'about'
                      ? 'text-amber-400 bg-amber-400/5 font-medium'
                      : 'text-zinc-300'
                  }`}
                >
                  About
                </button>

                {/* Services Collapsible Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-lg text-lg ${
                      currentPath.startsWith('services/')
                        ? 'text-amber-400 bg-amber-400/5 font-medium'
                        : 'text-zinc-300'
                    }`}
                  >
                    <span>Services</span>
                    <span
                      className="text-xs transition-transform duration-300"
                      style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Collapsible list of services */}
                  {mobileServicesOpen && (
                    <div className="grid gap-2 pl-4 mt-2 border-l border-white/5 ml-3">
                      {serviceSubLinks.map((sub) => {
                        const SvgIcon = sub.icon;
                        return (
                          <button
                            key={sub.path}
                            onClick={() => handleLinkClick(sub.path)}
                            className={`flex items-center space-x-3 text-left py-2 px-3 rounded-lg text-sm ${
                              currentPath === sub.path
                                ? 'text-amber-400 bg-amber-400/10 font-medium'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            <SvgIcon className="w-4 h-4 text-amber-500" />
                            <span>{sub.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Contact */}
                <button
                  onClick={() => handleLinkClick('contact')}
                  className={`flex items-center text-left py-2 px-3 rounded-lg text-lg ${
                    currentPath === 'contact'
                      ? 'text-amber-400 bg-amber-400/5 font-medium'
                      : 'text-zinc-300'
                  }`}
                >
                  Contact
                </button>
              </div>

              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full mt-4 flex items-center justify-center space-x-2 bg-amber-400 text-black font-semibold uppercase tracking-wider py-3.5 rounded-xl hover:bg-white transition-colors"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

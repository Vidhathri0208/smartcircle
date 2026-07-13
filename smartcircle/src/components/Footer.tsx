/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ArrowUpRight, Send, Check } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (path: PageRoute) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleLink = (path: PageRoute) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-radial-gradient from-amber-400/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          {/* BRAND */}
          <div className="space-y-6">
            <div onClick={() => handleLink('home')} className="flex items-center cursor-pointer group w-fit">
              <div className="w-16 h-16 overflow-hidden flex items-center justify-center relative shrink-0">
                <img
                  src="/SC-LOGO-png.png"
                  alt="Smart Circle Logo"
                  className="w-full h-full object-contain scale-[2.2] transition-all duration-500 group-hover:scale-[2.4]"
                />
              </div>
            </div>
            
            <p className="text-sm font-sans tracking-wide text-zinc-400 leading-relaxed max-w-sm">
              We command the narratives of global filmmakers, prestigious brands, and industry-defining public figures. Linking cinematic artistry with absolute tactical strategy.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center space-x-3 text-zinc-400 text-sm">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Banjara Hills, Hyderabad, India</span>
              </div>
              <div className="flex items-center space-x-3 text-zinc-400 text-sm">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 40 4600 7890</span>
              </div>
              <div className="flex items-center space-x-3 text-zinc-400 text-sm">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>hello@thestarcircle.com</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-6 lg:pl-10">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="grid gap-3.5 text-sm">
              {[
                { label: 'Home Entrance', path: 'home' as PageRoute },
                { label: 'The Journey (About)', path: 'about' as PageRoute },
                { label: 'Request Council', path: 'contact' as PageRoute }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLink(link.path)}
                    className="text-zinc-400 hover:text-amber-400 transition-colors tracking-wide hover:underline cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* DISCIPLINARY SUITE */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">
              Capabilities
            </h3>
            <ul className="grid gap-3.5 text-sm">
              {[
                { label: 'Movie PR', path: 'services/movie-production-marketing' as PageRoute },
                { label: 'Brand Marketing', path: 'services/brand-marketing' as PageRoute },
                { label: 'Celebrity PR', path: 'services/celebrity-pr' as PageRoute },
                { label: 'Creative Production', path: 'services/creative-production' as PageRoute },
                { label: 'YouTube Strategy', path: 'services/youtube-management' as PageRoute }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLink(link.path)}
                    className="text-zinc-400 hover:text-amber-400 transition-colors tracking-wide hover:underline cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">
              The Circle Briefing
            </h3>
            <p className="text-sm font-sans tracking-wide text-zinc-400 leading-relaxed">
              Receive elite insights surrounding digital algorithm fluctuations, viral benchmarks, and movie narrative strategy.
            </p>

            <form onSubmit={handleSubmit} className="relative mt-2" id="footer-newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter elite email"
                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
              />
              <button
                type="submit"
                id="newsletter-submit-button"
                className="absolute right-2 top-2 p-2 bg-amber-400 hover:bg-amber-300 text-black rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <div id="footer-newsletter-success" className="text-xs text-amber-400 font-medium">
                  Welcome to the circle. Protocol initialized.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 font-mono tracking-wider gap-4">
          <div>
            © 2026 Star Circle Private Limited. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Directives Protocol</a>
            <span>•</span>
            <span className="text-amber-500">https://thestarcircle.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

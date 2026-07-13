/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Compass, Heart, Award, Cpu, Zap, ArrowUpRight, Film, Target, HelpCircle } from 'lucide-react';
import { PageRoute } from '../types';
import FaqAccordion from '../components/FaqAccordion';

interface AboutProps {
  onNavigate: (path: PageRoute) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="relative bg-[#050505] text-[#e0e0e0] w-full overflow-hidden" id="about-page">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 border-b border-white/5 bg-[#0a0a0a]">
        {/* Background glow bubble */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
              MANIFESTO & ORIGINS
            </span>
          </div>

          <h1 className="font-sans font-bold text-4xl sm:text-6xl tracking-tighter leading-tight text-white">
            We build permanent monuments in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-amber-600">
              the digital coordinate space.
            </span>
          </h1>

          <p className="font-sans text-white/40 text-base md:text-xl max-w-2xl mx-auto tracking-wide leading-relaxed font-light">
            Star Circle was formed to bridge the divide between speculative creative ideas and unyielding analytic mechanics. 
          </p>
        </div>
      </section>

      {/* CORE JOURNEY & VALUES */}
      <section className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start animate-fade-in">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
              OUR CHRONICLE
            </div>
            
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight">
              The Journey from Narrative to Imperium.
            </h2>

            <p className="font-sans text-white/40 text-sm md:text-base leading-relaxed font-light">
              Founded in Hyderabad, India—a global tech-corridor and the heart of magnificent cinematic productions—Star Circle began as a boutique movie marketing cell. We realized early on that excellent trailers are worthless without predictive distribution models.
            </p>

            <p className="font-sans text-zinc-500 text-sm leading-relaxed">
              By merging advanced mathematical audience profiling with high-fidelity visual assets, we scaled local titles into global box-office powerhouses. Promptly, corporate brands and verified public figures reached out, wishing to replicate this bulletproof formula across their ecosystems.
            </p>

            <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl animate-pulse" />
              <div className="text-xs font-mono text-amber-500 mb-2">FOUNDER QUOTE</div>
              <p className="text-sm italic font-serif text-amber-100/70 leading-relaxed">
                "Our clients do not seek clicks; they seek legacy. They do not want to go viral for 15 seconds; they want to direct the conversation of their industry for the next decade."
              </p>
              <div className="text-[10px] font-mono text-zinc-500 mt-4">— Vikram Aditya, CCO</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">WHY PARTNER WITH US</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" id="why-choose-us-pillars">
              {/* PILLAR 1 */}
              <div className="space-y-4">
                <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl w-fit">
                  <Cpu className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">End-to-End Expertise</h3>
                <p className="font-sans text-white/40 text-xs tracking-wide leading-relaxed">
                  We formulate custom scripts, deliver detailed VFX elements, secure personal brand verification codes, design high-CTR thumbnails, and publish multi-platform lead funnels. Zero outsourcing, total accountability.
                </p>
              </div>

              {/* PILLAR 2 */}
              <div className="space-y-4">
                <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl w-fit">
                  <Compass className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">Creative + Strategy Driven</h3>
                <p className="font-sans text-white/40 text-xs tracking-wide leading-relaxed">
                  Artistic beauty without analytics is luxury slop. Analytics without art is algorithmic noise. We unify cinematic colorists and prompt SEO data engineers into a single, cohesive command group.
                </p>
              </div>

              {/* PILLAR 3 */}
              <div className="space-y-4">
                <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl w-fit">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">Confidentiality Guarantee</h3>
                <p className="font-sans text-white/40 text-xs tracking-wide leading-relaxed">
                  Protecting star alignments. We manage active crisis shields and strict custom NDAs. Your scripts, contract values, and algorithmic leaks remain heavily locked under key.
                </p>
              </div>

              {/* PILLAR 4 */}
              <div className="space-y-4">
                <div className="p-3 bg-zinc-900/40 border border-white/5 rounded-xl w-fit">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">Algorithmic Dominance</h3>
                <p className="font-sans text-white/40 text-xs tracking-wide leading-relaxed">
                  We track and decode the core logic changes of Google Search, YouTube Recommendation graphs, and social visibility scoring matrices daily, maintaining an active, unfair advantage for our creators.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="about-faq-section" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
              FAQ
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
              Common Enquiries.
            </h2>
            <p className="font-sans text-zinc-500 text-sm max-w-lg mx-auto">
              Transparent insights into our elite digital-cinema ecosystem, onboarding schedules, and absolute privacy standards.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* JOIN TEAM / COOPERATION BANNER */}
      <section className="py-24 relative z-10 px-6 md:px-12 bg-[#050505] text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white">Ready to align your project?</h2>
          <p className="text-white/40 text-sm font-light">
            We only onboard a limited count of partners per fiscal quarter to ensure total, raw operational quality control. Formally submit your specifications today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider rounded-full shadow-[0_4px_24px_rgba(245,158,11,0.15)] transition-all cursor-pointer"
            >
              Initiate Application Form
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

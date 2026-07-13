/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronRight, MessageSquareCode, ShieldCheck, Sparkle, Landmark, Flame } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import ThreeCanvas from '../components/ThreeCanvas';
import { PageRoute } from '../types';
import PosterLightbox from '../components/PosterLightbox';

const getFeatureCategory = (serviceId: string, featureTitle: string) => {
  if (serviceId === 'creative-production') {
    if (/(Editing|Export|Quality|Mastering|Archiving|DCP|Localization|Caption)/i.test(featureTitle)) return 'Post-Production & Delivery';
    if (/(Sound|Foley|Dubbing|Music|Audio|Mixing)/i.test(featureTitle)) return 'Sound & Audio';
    if (/(Color|DI|VFX|Motion|Titles|Graphics|Promotional)/i.test(featureTitle)) return 'Visuals & Graphics';
    return 'Other';
  }
  if (serviceId === 'celebrity-pr') {
    if (/(Profile|Endorsement|Award|Exclusive|Talent)/i.test(featureTitle)) return 'Profile & Partnerships';
    if (/(Media|Television|OTT|International|Content)/i.test(featureTitle)) return 'Media & Outreach';
    if (/(Digital|Social|Wikipedia|IMDb)/i.test(featureTitle)) return 'Digital & Social';
    if (/(Event|Promotion|Reputation|Fan|Crisis|Monitoring)/i.test(featureTitle)) return 'Reputation & Management';
    return 'Other';
  }
  if (serviceId === 'movie-production-marketing') {
    if (/(Meme|X \(Twitter\)|YouTube|Social media|Instant reels|Fan pages|Music pages)/i.test(featureTitle)) return 'Digital & Social Media';
    if (/(Song promotions|Influencer|Paparazzi|Media articles|OTT marketing)/i.test(featureTitle)) return 'PR & Influencer Outreach';
    if (/(IMDb|Wikipedia|BookMyShow|District|listing)/i.test(featureTitle)) return 'Listings & Platform Management';
    return 'Other';
  }
  if (serviceId === 'brand-marketing') {
    if (/(Strategy|Design|Content|Website)/i.test(featureTitle)) return 'Strategy & Creative';
    if (/(Social|Influencer|Outreach|Audience)/i.test(featureTitle)) return 'Social & Outreach';
    if (/(Ads|Performance|Monitoring|Growth)/i.test(featureTitle)) return 'Performance & Growth';
    if (/(Reputation|Presence|Multi-Platform)/i.test(featureTitle)) return 'Identity & Presence';
    return 'Other';
  }
  return 'General';
};

interface ServicesProps {
  serviceId: string;
  onNavigate: (path: PageRoute) => void;
  onSetContactService: (serviceName: string) => void;
}

const MOVIE_POSTERS_DATA = {
  released: [
    { title: 'Shambhala', src: '/released/SHAMBHALA.jpg' },
    { title: 'Nari Nari Naduma Murari', src: '/released/Nari-Nari-Naduma-Murari_Poster-98401310-dfeb-11f0-8da9-a572f945d604.jpg' },
    { title: 'Seetha Payanam', src: '/released/SEETHA%20PAYANAM.jpg' },
    { title: 'Om Shanti Shantihi', src: '/released/OM%20SHANTI%20SHANTIHI.jpg' },
    { title: 'Jockey', src: '/released/JOCKEY.jpg' },
    { title: 'Nilakanta', src: '/released/NILAKANTA.jpg' },
    { title: 'Purushaha', src: '/released/PURUSHAHA.jpg' },
    { title: 'Vanda Devullu', src: '/released/VANDA%20DEVULLU.jpg' }
  ],
  ongoing: [
    { title: 'Aakarshita', src: '/ongoing/AAKARSHITA.jpg' },
    { title: 'Ameer Log', src: '/ongoing/AMEER%20LOG.gif' },
    { title: 'Anakapalli', src: '/ongoing/ANAKAPALLI.jpg' },
    { title: 'Anumana Pakshi', src: '/ongoing/ANUMANA%20PAKSHI.jpg' },
    { title: '#BMB', src: '/ongoing/BMB.jpg' },
    { title: 'Hit & Run', src: '/ongoing/HIT%20AND%20RUN.jpg' },
    { title: 'Jangaa', src: '/ongoing/JANGAA.jpg' },
    { title: 'Kanna', src: '/ongoing/KANNA.jpg' },
    { title: 'Kotha Cinema', src: '/ongoing/KOTHA%20CINEMA.jpg' },
    { title: 'Love Oh Love', src: '/ongoing/LOVE%20OH%20LOVE.jpg' },
    { title: 'Mr Middle Class', src: '/ongoing/MR%20MIDDLE%20CASS.jpg' },
    { title: 'Raktha Charitra', src: '/ongoing/RAKTHA%20CHARITRA.jpeg' },
    { title: 'The Red Bag', src: '/ongoing/RED%20BAG.jpg' }
  ],
  upcoming: [
    { title: 'SK 33', src: '/upcoming/SK33.jpg' },
    { title: 'Shining Pictures 2', src: '/upcoming/AADI%202.jpg' },
    { title: 'Speed — David Reddy', src: '/upcoming/DAVID%20REDDY.jpg' },
    { title: 'Repert', src: '/upcoming/ENE_2x1.jpg.jpeg' },
    { title: 'Veera Kasulavada', src: '/upcoming/VADDI%20KASULA%20VADA.jpg' },
    { title: 'Air Force', src: '/upcoming/AIR%20FORCE.jpg' },
    { title: 'Pakashala Pantham', src: '/upcoming/PAKASHALA%20PANTHAM.jpg' }
  ]
};

function PosterRow({ title, label, movies }: { title: string; label: string; movies: { title: string; src: string }[] }) {
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [selectedMovieIndex, setSelectedMovieIndex] = React.useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h3 className="font-sans font-bold text-xl md:text-2xl text-white tracking-tight flex items-center gap-3">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full inline-block"></span>
          {title}
        </h3>
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{label}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {movies.map((movie, idx) => {
          const isFailed = failedImages[movie.src];
          return (
            <div
              key={idx}
              onClick={() => {
                setSelectedMovieIndex(idx);
                setLightboxOpen(true);
              }}
              className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 bg-[#09090a] hover:border-amber-400/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-500 flex flex-col justify-between cursor-pointer"
              id={`poster-${idx}-${movie.title.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {/* Gold light leak effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              
              {isFailed ? (
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-[#0d0d0f] to-[#040405] border border-white/5 rounded-xl">
                  <span className="text-[8px] font-mono text-amber-500/80 uppercase tracking-wider">{label}</span>
                  <h4 className="font-sans font-bold text-sm text-white leading-tight group-hover:text-amber-400 transition-colors">
                    {movie.title}
                  </h4>
                  <div className="text-[8px] font-mono text-zinc-600">STAR CIRCLE PORTFOLIO</div>
                </div>
              ) : (
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={movie.src}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages(prev => ({ ...prev, [movie.src]: true }))}
                  />
                  {/* Subtle caption overlay for loaded images on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <p className="font-sans font-bold text-xs text-white leading-snug">
                      {movie.title}
                    </p>
                    <p className="font-mono text-[7px] text-amber-400 uppercase tracking-widest mt-0.5">
                      {label}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <PosterLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        movies={movies}
        initialIndex={selectedMovieIndex}
        categoryLabel={label}
      />
    </div>
  );
}

const BRAND_LOGOS = [
  { name: 'Ulavacharu', tagline: 'Originally Original Cuisine', path: '/logos/Ulavacharu.svg', subtitle: 'Originally Original Cuisine' },
  { name: 'Traul', tagline: 'Smart Tech Ecosystem', path: '/logos/Traul.svg', subtitle: 'Tech/App Brand' },
  { name: 'Luxx & Lavish', tagline: 'Premium Luxury Fashion', path: '/logos/Luxx_and_Lavish.svg', subtitle: 'Luxury Brand' },
  { name: 'Heritage', tagline: 'Aesthetic Heritage & Lifestyle', path: '/logos/Heritage.svg', subtitle: 'Lifestyle Brand' },
  { name: 'Maynu Clinics', tagline: 'Eminent Healthcare Services', path: '/logos/Maynu_Clinics.svg', subtitle: 'Healthcare Brand' },
  { name: 'Care Hospitals', tagline: 'Dr. Surya Prakasa Rao', path: '/logos/Care_Hospitals.svg', subtitle: 'Healthcare Brand' },
  { name: 'Marwadi University', tagline: 'Global Education Excellence', path: '/logos/Marwadi_University.svg', subtitle: 'Education Brand' },
  { name: 'Marriage Verse', tagline: 'Crafting Divine Matrimony', path: '/logos/Marriage_Verse.svg', subtitle: 'Matrimony Brand' },
  { name: 'Sceneary', tagline: 'Creative Landscape', path: '/logos/sceneary.jpeg', subtitle: 'Creative Brand' },
  { name: 'District', tagline: 'Zomato District Ecosystem', path: '/logos/DISTRICT.png', subtitle: 'Food & Entertainment' },
  { name: 'Swaragam', tagline: 'Melodious Soundscapes', path: '/logos/swaragam.jpeg', subtitle: 'Audio/Music Brand' },
];

export default function Services({ serviceId, onNavigate, onSetContactService }: ServicesProps) {
  const service = SERVICES_DATA[serviceId];
  const [failedLogos, setFailedLogos] = React.useState<Record<number, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  useEffect(() => {
    setActiveCategory('All');
  }, [serviceId]);

  const isLongList = service?.features?.length > 10;
  
  const groupedFeatures = useMemo(() => {
    if (!isLongList || !service) return null;
    const groups: Record<string, typeof service.features> = {};
    service.features.forEach(f => {
      const cat = getFeatureCategory(serviceId, f.title);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(f);
    });
    return groups;
  }, [service, isLongList, serviceId]);

  const categories = groupedFeatures ? Object.keys(groupedFeatures) : [];

  const handleScrollToCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
       const el = document.getElementById('capabilities-grid-top');
       if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: 'smooth' });
       }
    } else {
       const el = document.getElementById(`category-${category.replace(/\s+/g, '-')}`);
       if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: 'smooth' });
       }
    }
  };

  if (!service) {
    return (
      <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Disciplinary Suite Not Logged</h1>
        <p className="text-zinc-500 mb-8 max-w-sm">The specific service sector you are trying to access has not been initialized or registered.</p>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-amber-400 text-black text-xs font-semibold uppercase rounded-full"
        >
          Return to Entrance
        </button>
      </div>
    );
  }

  const handleCta = () => {
    onSetContactService(service.title);
    onNavigate('contact');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-black text-white w-full overflow-hidden" id={`service-page-${serviceId}`}>
      
      {/* 3D HEADER / HERO */}
      <section className="relative h-[85vh] w-full flex items-center justify-center pt-24 px-6 md:px-12 border-b border-white/5">
        
        {/* Background 3D Canvas */}
        <div className="absolute inset-0 z-0 opacity-80">
          <ThreeCanvas type={service.canvasType} />
        </div>

        {/* Cinematic shade panels */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80 pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-4xl mx-auto space-y-6 select-none mt-12">
          {/* Back button */}
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center space-x-2 text-zinc-500 hover:text-amber-400 font-mono text-xs uppercase tracking-widest transition-colors mb-4 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sector Entrance</span>
          </button>

          <div className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold">
            SPECIALIZED VERTICAL: {serviceId.toUpperCase().replace(/-/g, ' ')}
          </div>

          <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1]">
            {service.title}
          </h1>

          <p className="font-sans text-amber-100/70 text-lg sm:text-xl max-w-2xl mx-auto tracking-wide leading-relaxed font-light">
            {service.tagline}
          </p>

          <p className="font-sans text-stone-400 text-sm md:text-base max-w-3xl mx-auto tracking-wide leading-relaxed font-light">
            {service.description}
          </p>
        </div>
      </section>

      {/* CORE STATS BANNER */}
      <section className="bg-zinc-950 py-16 border-b border-white/5 relative z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {service.stats.map((stat, sIdx) => (
            <div key={sIdx} className="space-y-2">
              <div className="font-sans font-extrabold text-4xl sm:text-5xl text-amber-400 tracking-tighter">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPREHENSIVE FEATURES */}
      <section className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className={isLongList ? "lg:col-span-3 space-y-6 lg:sticky lg:top-32" : "lg:col-span-4 space-y-6 lg:sticky lg:top-32"}>
            <div className="font-mono text-xs uppercase tracking-widest text-[#e0a96d] font-semibold">
              // DISCIPLINARY STRENGTHS
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-white leading-tight">
              Our Core Execution Capabilities.
            </h2>
            <p className="font-sans text-zinc-500 text-sm leading-relaxed">
              We do not delegate workflow. Every specific process is managed under tight security by in-house vertical heads.
            </p>
            
            <div className="pt-4">
              <button
                onClick={handleCta}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Retain This Specialty
              </button>
            </div>
          </div>

          <div id="capabilities-grid-top" className={isLongList ? "lg:col-span-9" : "lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6"}>
            {isLongList ? (
              <div className="flex flex-col space-y-12">
                <div className="sticky top-20 bg-black/90 backdrop-blur-md z-30 py-4 border-b border-white/10 -mx-6 px-6 lg:mx-0 lg:px-0 lg:border-none flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => handleScrollToCategory('All')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all border ${activeCategory === 'All' ? 'bg-amber-400 text-black border-amber-400' : 'bg-zinc-950 text-zinc-500 border-white/10 hover:border-amber-400/50 hover:text-amber-400'}`}
                  >
                    All
                  </button>
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScrollToCategory(cat)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all border ${activeCategory === cat ? 'bg-amber-400 text-black border-amber-400' : 'bg-zinc-950 text-zinc-500 border-white/10 hover:border-amber-400/50 hover:text-amber-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {categories.map((cat, catIdx) => (
                  <div key={catIdx} id={`category-${cat.replace(/\s+/g, '-')}`} className="space-y-6 scroll-mt-32">
                    <h3 className="font-mono text-sm uppercase tracking-widest text-amber-500 font-semibold border-b border-white/10 pb-2">
                      {cat}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {groupedFeatures![cat].map((feature, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-950 border border-white/5 rounded-xl p-5 hover:border-amber-400/50 hover:bg-zinc-950/80 transition-all duration-300 flex flex-col justify-start"
                        >
                          <div className="space-y-3">
                            <div className="rounded-md p-1.5 bg-black border border-white/5 w-fit">
                              <Sparkle className="w-4 h-4 text-amber-400" />
                            </div>
                            <h4 className="font-sans font-bold text-sm text-white">
                              {feature.title}
                            </h4>
                            <p className="font-sans text-stone-400 text-xs tracking-wide leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="mt-8 bg-gradient-to-br from-zinc-950 to-zinc-900 border border-amber-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      <h3 className="font-sans font-bold text-sm text-amber-100">
                        Secured Confidentiality Charter
                      </h3>
                    </div>
                    <p className="text-zinc-500 text-xs tracking-wide leading-relaxed max-w-2xl">
                      We secure and sign full custom NDAs covering all script treatments, trademark branding directives, personal public assets, and proprietary analytical records.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950 border border-white/5 rounded-2xl p-8 hover:border-amber-400/50 hover:bg-zinc-950/80 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="rounded-lg p-2 bg-black border border-white/5 w-fit">
                        <Sparkle className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-white">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-stone-400 text-xs tracking-wide leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Quick security notice card */}
                <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
                  <div className="space-y-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <h3 className="font-sans font-bold text-sm text-amber-100">
                      Secured Confidentiality Charter
                    </h3>
                    <p className="text-zinc-500 text-xs tracking-wide leading-relaxed">
                      We secure and sign full custom NDAs covering all script treatments, trademark branding directives, personal public assets, and proprietary analytical records.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* DYNAMIC ADDITIONAL SERVICE SPECIFIC SECTIONS */}
      {service.platforms && (
        <section className="py-16 bg-zinc-950 border-t border-b border-white/5 relative z-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Platforms We Deliver On
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-zinc-300">
              {service.platforms.map((platform, idx) => (
                <div
                  key={idx}
                  className="font-sans font-semibold text-xs tracking-wide bg-black/40 border border-white/5 px-5 py-2.5 rounded-full hover:border-amber-400/30 hover:text-white transition-all cursor-default"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.marketingServices && (
        <section className="py-20 bg-[#050505] border-b border-white/5 relative z-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-[#e0a96d] font-semibold">
                // THE TACTICAL ARSENAL
              </div>
              <h2 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight">
                Full Movie Marketing Service Spectrum
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.marketingServices.map((mService, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 bg-zinc-900/40 border border-white/5 p-4 rounded-xl hover:border-amber-400/20 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-sans text-xs tracking-wide text-zinc-300 font-medium leading-relaxed">
                    {mService}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.projects && (
        <section className="py-24 md:py-32 bg-black border-b border-white/5 relative z-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
                COALITION MILESTONES
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
                Movie Projects Portfolio
              </h2>
              <p className="font-sans text-zinc-500 text-sm max-w-xl mx-auto">
                A definitive chronicle of our high-volume movie marketing, PR orchestration, and production campaigns.
              </p>
            </div>

            <div className="space-y-20">
              <PosterRow
                title="Our Projects"
                label="Released & Recent Campaigns"
                movies={MOVIE_POSTERS_DATA.released}
              />
              <PosterRow
                title="Ongoing Projects"
                label="Ongoing & Active Campaigns"
                movies={MOVIE_POSTERS_DATA.ongoing}
              />
              <PosterRow
                title="Upcoming Projects"
                label="Upcoming & Slated Releases"
                movies={MOVIE_POSTERS_DATA.upcoming}
              />
            </div>
          </div>
        </section>
      )}

      {/* STRATEGIC STEP-BY-STEP PROCESS */}
      <section className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#e0a96d] font-semibold">
              // METHODOLOGICAL SEQUENCING
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
              The Strategic Roadmap.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, idx) => (
              <div key={idx} className="relative space-y-4 group">
                {/* Connector line for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] right-[-40%] h-[1px] bg-gradient-to-r from-amber-400/30 to-transparent z-0 pointer-events-none" />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div className="font-mono text-4xl font-extrabold text-[#e0a96d]/10 group-hover:text-[#e0a96d]/30 transition-colors">
                    {step.step}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[10px] font-mono text-zinc-500 group-hover:border-amber-400/50 transition-colors">
                    PRT
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-semibold text-base text-white group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-stone-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE CLIENT DELIVERABLES */}
      <section className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-zinc-950 to-black border border-white/5 rounded-3xl p-8 md:p-12 space-y-10 relative">
          <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-amber-400 text-black text-[9px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full">
            OFFICIAL DELIVERY PROTOCOL
          </div>

          <div className="space-y-4">
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight">
              Expected Deliverables.
            </h2>
            <p className="font-sans text-zinc-400 text-xs sm:text-sm">
              We compile and ship clean structured artifacts on completed campaigns. You will claim total commercial and proprietary digital rights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.deliverables.map((deliv, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-sans tracking-wide">{deliv}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-[10px] text-zinc-500">
              STAR CIRCLE GLOBAL CLIENT CONCORDAT © 2026
            </div>
            <button
              onClick={handleCta}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-amber-400 text-black font-semibold text-xs uppercase rounded-xl tracking-wider transition-colors cursor-pointer"
            >
              Initiate Discovery Conference
            </button>
          </div>
        </div>
      </section>

      {serviceId === 'brand-marketing' && (
        <section id="service-brands-section" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
                OUR TRUSTED COALITION
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
                Brands We've Worked With
              </h2>
              <p className="font-sans text-zinc-500 text-sm">
                Forging high-fidelity branding and tactical digital marketing systems for industry-leading organizations and businesses.
              </p>
            </div>

            <div className="relative flex overflow-x-hidden group py-4 w-full" id="service-brands-logo-grid">
              <div className="animate-marquee flex whitespace-nowrap items-center">
                {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, index) => (
                  <div
                    key={index}
                    className="group relative bg-white border border-stone-200 rounded-2xl p-6 flex flex-col items-center justify-center h-40 w-64 mx-4 flex-shrink-0 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] hover:border-amber-400/50 transition-all duration-500 overflow-hidden"
                  >
                    {!failedLogos[index] ? (
                      <img
                        src={brand.path}
                        alt={`${brand.name} logo`}
                        className="max-h-20 max-w-[80%] object-contain filter group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setFailedLogos((prev) => ({ ...prev, [index]: true }));
                        }}
                      />
                    ) : (
                      <div className="text-center space-y-1 select-none">
                        <span className="font-sans font-bold text-stone-900 text-lg tracking-tight block truncate w-full px-2">
                          {brand.name}
                        </span>
                        <span className="font-mono text-[9px] text-amber-600 font-medium tracking-wider uppercase block truncate w-full px-2">
                          {brand.tagline}
                        </span>
                      </div>
                    )}
                    
                    {/* Visual Label inside card */}
                    <div className="absolute bottom-2 inset-x-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400">
                        {brand.subtitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

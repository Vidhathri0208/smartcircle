/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Film, Radio, Star, Video, Play, Sparkles, Trophy, Users, Globe2, FilmIcon, Instagram } from 'lucide-react';
import ThreeCanvas from '../components/ThreeCanvas';
import { PageRoute } from '../types';
import PartnerTestimonialCarousel from '../components/PartnerTestimonialCarousel';

interface HomeProps {
  onNavigate: (path: PageRoute) => void;
}

// Animate numbers for Counter Section
function AnimatedCounter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let speed = Math.max(Math.floor(2000 / target), 30); // scale speed dynamically
    const counter = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(counter);
          return target;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(counter);
  }, [target]);

  return (
    <div className="text-center md:text-left">
      <div className="font-sans font-extrabold text-5xl md:text-6xl text-white tracking-tighter mb-2 glow-text flex items-center justify-center md:justify-start">
        <span>{count}</span>
        <span className="text-amber-400 font-light">{suffix}</span>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">
        {label}
      </div>
    </div>
  );
}

export default function Home({ onNavigate }: HomeProps) {
  const [failedLogos, setFailedLogos] = useState<Record<number, boolean>>({});

  const movieScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isHoveredRef = useRef(false);

  const handleMovieScroll = () => {
    const container = movieScrollRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;
    
    // Loop boundary checks
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += singleSetWidth;
    }
  };

  const handleMovieMouseDown = (e: React.MouseEvent) => {
    const container = movieScrollRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMovieMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = movieScrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // multiplier for scroll speed
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMovieMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    isHoveredRef.current = false;
  };

  const handleMovieMouseEnter = () => {
    isHoveredRef.current = true;
  };

  useEffect(() => {
    const container = movieScrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.8; // Speed of auto-scrolling in pixels per frame

    const autoScroll = () => {
      if (!isHoveredRef.current && !isDraggingRef.current) {
        container.scrollLeft += speed;
        
        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += singleSetWidth;
        }
      }
      
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Initially position at the middle set to support left/right scrolling seamlessly
    const initializeScroll = () => {
      if (container.scrollWidth > 0) {
        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;
      } else {
        // Retry if layout not completed yet
        setTimeout(initializeScroll, 50);
      }
    };
    
    initializeScroll();

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const brandLogos = [
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

  const creativePartners = [
    { name: 'The EKA', specialty: 'Model Shoot', instagram: 'https://www.instagram.com/the.eka_', logo: '/logos/eka%20logo.png', whiteBg: true },
    { name: 'Navarasa', specialty: 'Wedding Shoot', instagram: 'https://www.instagram.com/nava.rasa_', logo: '/logos/navarasa.png', whiteBg: false },
    { name: 'Ikshana Studios', specialty: 'Baby Shoot', instagram: 'https://www.instagram.com/ikshana_studios', logo: '/logos/is%20(2).png', whiteBg: false },
    { name: 'The Cinema Trance', specialty: 'Publicity Design', instagram: 'https://www.instagram.com/the_cinema_trance', logo: '/logos/tct-logo-final.png', whiteBg: true },
    { name: 'Uha Studios', specialty: 'Shoot Purpose / Production', instagram: 'https://www.instagram.com/uhastudios', logo: '/logos/uha-studios.png', whiteBg: true },
    { name: 'Vollywide Media', specialty: 'Tech & Digital Solutions', instagram: 'https://www.instagram.com/', logo: '/logos/tollyweed.png', whiteBg: true },
    { name: 'Urban Morans', specialty: 'Creative Content & Design', instagram: 'https://www.instagram.com/', logo: '/logos/urban%20morans.png', whiteBg: true },
  ];

  const services = [
    {
      id: 'movie-production-marketing',
      title: 'Movie PR & Marketing',
      description: 'Pre-production, scripting hype, high-fidelity VFX curation, and targeted streaming launch events.',
      icon: Film,
      color: 'border-amber-400/70 shadow-[0_0_20px_rgba(245,158,11,0.1)] bg-radial-gradient from-amber-400/10 via-transparent to-transparent hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-[1.02]'
    },
    {
      id: 'brand-marketing',
      title: 'Brand Marketing',
      description: 'Lead generation engines, brand blueprinted style architectures, and performance social systems.',
      icon: Radio,
      color: 'border-blue-500/70 shadow-[0_0_20px_rgba(59,130,246,0.1)] bg-radial-gradient from-blue-500/10 via-transparent to-transparent hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:scale-[1.02]'
    },
    {
      id: 'celebrity-pr',
      title: 'Celebrity PR & Reps',
      description: 'Verified media status verification, elite press publications, and split-second crisis containment.',
      icon: Star,
      color: 'border-zinc-400/70 shadow-[0_0_20px_rgba(250,250,250,0.1)] bg-radial-gradient from-zinc-400/10 via-transparent to-transparent hover:border-white/80 hover:shadow-[0_0_30px_rgba(250,250,250,0.25)] hover:scale-[1.02]'
    },
    {
      id: 'creative-production',
      title: 'Creative Production',
      description: 'Rhythmic editing structures, premium vector design icons, and animated title micro-graphics.',
      icon: Video,
      color: 'border-pink-500/70 shadow-[0_0_20px_rgba(236,72,153,0.1)] bg-radial-gradient from-pink-500/10 via-transparent to-transparent hover:border-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] hover:scale-[1.02]'
    },
    {
      id: 'youtube-management',
      title: 'YouTube Scaling Strategy',
      description: 'CTR thumbnail design optimization, algorithmic tag maps, and audience hook management.',
      icon: Play,
      color: 'border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.1)] bg-radial-gradient from-red-500/10 via-transparent to-transparent hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:scale-[1.02]'
    }
  ];

  return (
    <div className="relative bg-[#050505] text-[#e0e0e0] w-full overflow-hidden" id="homepage-root">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative h-screen w-full flex items-center justify-center pt-20 px-6 md:px-12">
        {/* Background 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <ThreeCanvas type="hero-sphere" />
        </div>

        {/* Ambient Overlay Vignette & Background radial glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80 pointer-events-none z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto space-y-8 select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center justify-center space-x-3"
          >
            <span className="h-[1px] w-12 bg-amber-500/50" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-amber-500 font-bold">
              STAR CIRCLE CREATIVE AGENCY
            </span>
            <span className="h-[1px] w-12 bg-amber-500/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.9] text-white"
          >
            Where <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-amber-600">Creativity</span><br />
            Meets Strategy.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-sans text-white/40 text-base md:text-xl max-w-2xl mx-auto tracking-wide leading-relaxed font-light"
          >
            We craft ultra-realistic cinematic experiences and execute data-driven digital ecosystem strategy for world-class film productions, legendary brands, and influential figures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-cta-services"
              onClick={() => document.getElementById('services-overview-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full tracking-wider uppercase text-xs flex items-center justify-center space-x-2 shadow-[0_4px_24px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_32px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
            >
              <span>Examine Specialties</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              id="hero-cta-contact"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-[#050505] border border-white/10 hover:border-white/30 text-[#e0e0e0] hover:text-white font-semibold rounded-full tracking-wider uppercase text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Initiate Counsel</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="p-1 rounded-full border border-white/20 text-white hover:border-white/55 cursor-pointer backdrop-blur-sm"
            onClick={() => document.getElementById('about-snippet')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SNIPPET SECTION */}
      <section
        id="about-snippet"
        className="py-24 md:py-32 border-b border-white/5 relative z-10 px-6 md:px-12 bg-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual abstract card */}
          <div className="col-span-1 lg:col-span-5 bg-gradient-to-tr from-[#050505] to-[#121212] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden self-stretch flex flex-col justify-between">
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-400/10 rounded-full blur-3xl" />

            <div className="space-y-4 relative z-10">
              <span className="font-mono text-amber-500 uppercase tracking-widest text-xs font-semibold block">
                CREATIVE AUDIENCE STRATEGY
              </span>
              <h3 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight leading-tight">
                Aligning massive viewership with cinematic perfection.
              </h3>
            </div>

            <div className="mt-20 border-t border-white/5 pt-6 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>STAR CIRCLE AGENCY</span>
              <span>HYDERABAD, INDIA</span>
            </div>
          </div>

          {/* About text trigger */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
              OUR MISSION
            </div>

            <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight text-white">
              Cultivating legacy rather than fleeting viral noise.
            </h2>

            <p className="font-sans text-white/40 text-base md:text-lg tracking-wide leading-relaxed font-light">
              We did not emerge to chase modern trends. Star Circle was established to write permanent cultural footprints. Our partners comprise elite film makers, heavy corporate brands, and household creators who require absolute strategic excellence.
            </p>

            <p className="font-sans text-zinc-500 text-sm tracking-wide leading-relaxed">
              Based in the historic tech district of Banjara Hills, Hyderabad, our team blends premium high-end visual production (VFX, 3D titles, cinematic grading) with sophisticated audience mapping and algorithmic channel mastery.
            </p>

            <div className="pt-4">
              <button
                id="about-snippet-cta"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center space-x-2 font-sans font-semibold text-xs tracking-wider uppercase text-amber-500 hover:text-white transition-colors cursor-pointer"
              >
                <span>Read Our Story</span>
                <ArrowUpRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SERVICES OVERVIEW GRID */}
      <section id="services-overview-section" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
                OUR EXPERTISE
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
                Our Disciplinary Suites.
              </h2>
            </div>
            <p className="font-sans text-zinc-400 text-sm md:text-base max-w-md tracking-wide">
              Every vertical is operated by dedicated specialists using deep analytical feedback loops and premium, custom creative assets.
            </p>
          </div>

          {/* Interactive Tilt Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid-wrapper">
            {services.map((serv, index) => {
              const SvgIcon = serv.icon;
              return (
                <div
                  key={serv.id}
                  id={`service-card-${serv.id}`}
                  onClick={() => onNavigate(`services/${serv.id}` as PageRoute)}
                  className={`group relative overflow-hidden flex flex-col justify-between p-8 rounded-2xl border ${serv.color} transition-all duration-500 cursor-pointer h-80`}
                >
                  <div className="space-y-6">
                    <div className="p-3 bg-zinc-900/60 border border-white/5 rounded-xl w-fit group-hover:scale-110 group-hover:border-amber-400/50 transition-all duration-300">
                      <SvgIcon className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-lg text-white group-hover:text-amber-500 transition-colors">
                        {serv.title}
                      </h3>
                      <p className="font-sans text-white/60 group-hover:text-white/95 transition-colors text-xs tracking-wide leading-relaxed">
                        {serv.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-4 border-t border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>0{index + 1} • SERVICE</span>
                    <span className="flex items-center space-x-1 hover:text-amber-500 transition-colors">
                      <span>EXPLORE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Extra Bento CTA Block */}
            <div className="md:col-span-2 lg:col-span-1 bg-[#0a0a0a] border border-amber-500/40 rounded-2xl p-8 flex flex-col justify-between select-none shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:border-amber-500/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:scale-[1.02] transition-all duration-500">
              <div className="space-y-4">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h3 className="font-sans font-bold text-lg text-white">
                  Tailored Strategic Packages
                </h3>
                <p className="text-white/60 text-xs tracking-wide leading-relaxed">
                  Have a multi-variable campaign involving casting, cinematic reels, verified reputation management, and dynamic YouTube distribution? We provide comprehensive ecosystem architecture.
                </p>
              </div>

              <button
                id="services-grid-cta"
                onClick={() => onNavigate('contact')}
                className="w-full mt-6 py-3 bg-white hover:bg-amber-500 text-black font-semibold rounded-xl text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                Request Custom Counsel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS/MILESTONES COUNTER SECTION */}
      <section id="stats-section" className="py-24 relative z-10 px-6 md:px-12 bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-amber-400/5 via-transparent to-transparent opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 justify-items-center md:justify-items-start">
            <AnimatedCounter target={12} suffix="+" label="Premium Active Projects" />
            <AnimatedCounter target={5} suffix="+" label="Film Directives & Teasers" />
            <AnimatedCounter target={45} suffix="+" label="Eminent Figures Managed" />
            <AnimatedCounter target={1} suffix=".8B+" label="Cumulative Video Plays" />
          </div>
        </div>
      </section>

      {/* 4.5 OUR MOVIES - HORIZONTAL SCROLL */}
      <section id="home-movies-section" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
              CINEMATIC PORTFOLIO
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
              Our Movies
            </h2>
            <p className="font-sans text-zinc-400 text-sm md:text-base tracking-wide leading-relaxed">
              We proudly partner with visionary filmmakers, executing marketing and creative strategies that propel these select titles to the cultural forefront.
            </p>
          </div>

          <div
            ref={movieScrollRef}
            className="relative flex overflow-x-auto scrollbar-hide py-4 w-full select-none cursor-grab active:cursor-grabbing items-center"
            id="movie-horizontal-scroll"
            onScroll={handleMovieScroll}
            onMouseDown={handleMovieMouseDown}
            onMouseMove={handleMovieMouseMove}
            onMouseUp={handleMovieMouseUpOrLeave}
            onMouseLeave={handleMovieMouseUpOrLeave}
            onMouseEnter={handleMovieMouseEnter}
          >
            {[
              { path: '/released/SHAMBHALA.jpg', name: 'Shambhala', status: 'Released' },
              { path: '/released/Nari-Nari-Naduma-Murari_Poster-98401310-dfeb-11f0-8da9-a572f945d604.jpg', name: 'Nari Nari Naduma Murari', status: 'Released' },
              { path: '/released/OM%20SHANTI%20SHANTIHI.jpg', name: 'Om Shanti Shantihi', status: 'Released' },
              { path: '/released/VANDA%20DEVULLU.jpg', name: 'Vanda Devullu', status: 'Released' },
              { path: '/ongoing/ANUMANA%20PAKSHI.jpg', name: 'Anumana Pakshi', status: 'Ongoing' },
              { path: '/upcoming/SK33.jpg', name: 'SK 33', status: 'Upcoming' },
              { path: '/upcoming/AADI%202.jpg', name: 'Shining Pictures 2', status: 'Upcoming' },
              { path: '/upcoming/DAVID%20REDDY.jpg', name: 'Speed — David Reddy', status: 'Upcoming' },
              { path: '/upcoming/VADDI%20KASULA%20VADA.jpg', name: 'Veera Kasulavada', status: 'Upcoming' },
              { path: '/upcoming/ENE_2x1.jpg.jpeg', name: 'Repert', status: 'Upcoming' },
              { path: '/released/SHAMBHALA.jpg', name: 'Shambhala', status: 'Released' },
              { path: '/released/Nari-Nari-Naduma-Murari_Poster-98401310-dfeb-11f0-8da9-a572f945d604.jpg', name: 'Nari Nari Naduma Murari', status: 'Released' },
              { path: '/released/OM%20SHANTI%20SHANTIHI.jpg', name: 'Om Shanti Shantihi', status: 'Released' },
              { path: '/released/VANDA%20DEVULLU.jpg', name: 'Vanda Devullu', status: 'Released' },
              { path: '/ongoing/ANUMANA%20PAKSHI.jpg', name: 'Anumana Pakshi', status: 'Ongoing' },
              { path: '/upcoming/SK33.jpg', name: 'SK 33', status: 'Upcoming' },
              { path: '/upcoming/AADI%202.jpg', name: 'Shining Pictures 2', status: 'Upcoming' },
              { path: '/upcoming/DAVID%20REDDY.jpg', name: 'Speed — David Reddy', status: 'Upcoming' },
              { path: '/upcoming/VADDI%20KASULA%20VADA.jpg', name: 'Veera Kasulavada', status: 'Upcoming' },
              { path: '/upcoming/ENE_2x1.jpg.jpeg', name: 'Repert', status: 'Upcoming' },
              { path: '/released/SHAMBHALA.jpg', name: 'Shambhala', status: 'Released' },
              { path: '/released/Nari-Nari-Naduma-Murari_Poster-98401310-dfeb-11f0-8da9-a572f945d604.jpg', name: 'Nari Nari Naduma Murari', status: 'Released' },
              { path: '/released/OM%20SHANTI%20SHANTIHI.jpg', name: 'Om Shanti Shantihi', status: 'Released' },
              { path: '/released/VANDA%20DEVULLU.jpg', name: 'Vanda Devullu', status: 'Released' },
              { path: '/ongoing/ANUMANA%20PAKSHI.jpg', name: 'Anumana Pakshi', status: 'Ongoing' },
              { path: '/upcoming/SK33.jpg', name: 'SK 33', status: 'Upcoming' },
              { path: '/upcoming/AADI%202.jpg', name: 'Shining Pictures 2', status: 'Upcoming' },
              { path: '/upcoming/DAVID%20REDDY.jpg', name: 'Speed — David Reddy', status: 'Upcoming' },
              { path: '/upcoming/VADDI%20KASULA%20VADA.jpg', name: 'Veera Kasulavada', status: 'Upcoming' },
              { path: '/upcoming/ENE_2x1.jpg.jpeg', name: 'Repert', status: 'Upcoming' }
            ].map((movie, index) => {
              return (
                <div
                  key={index}
                  className="group/movie relative flex-shrink-0 bg-[#0a0a0a] rounded-2xl w-48 mx-4 h-72 border border-amber-500/80 scale-105 shadow-[0_8px_30px_rgba(245,158,11,0.25)] z-20 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center hover:border-amber-400 hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)] hover:scale-110"
                >
                   <img
                      src={movie.path}
                      alt={movie.name}
                      className="absolute inset-0 w-full h-full object-cover filter transition-all duration-700 opacity-100 scale-105 group-hover/movie:scale-110"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('span')) {
                          const span = document.createElement('span');
                          span.className = 'font-sans font-bold text-white tracking-widest uppercase text-sm block truncate w-full px-4 text-center z-10 whitespace-normal';
                          span.innerText = movie.name;
                          parent.appendChild(span);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-80 group-hover/movie:opacity-90 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-amber-500 z-10">
                      {movie.status}
                    </div>
                    <div className="absolute bottom-4 inset-x-4 z-10 text-center transition-all duration-500 translate-y-0 opacity-100">
                      <span className="font-sans font-bold text-white text-sm tracking-widest uppercase whitespace-normal block">
                        {movie.name}
                      </span>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BRANDS WE'VE WORKED WITH SECTION */}
      <section id="home-brands-section" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-black border-t border-white/5">
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

          <div className="relative flex overflow-x-hidden group py-4 w-full" id="brands-logo-grid">
            <div className="animate-marquee flex whitespace-nowrap items-center">
              {[...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos].map((brand, index) => (
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

      {/* 6. OUR CREATIVE PARTNERS SECTION */}
      <section id="home-creative-partners-section" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-zinc-950 border-t border-white/5">
        <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 via-transparent to-transparent opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-widest text-purple-400 font-semibold">
              SPECIALIST COLLABORATORS
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
              Our Creative Partners
            </h2>
            <p className="font-sans text-stone-400 text-sm max-w-2xl mx-auto">
              Star Circle collaborates with specialist studios across photography, film, and design — bringing the right expertise to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="creative-partners-grid">
            {creativePartners.map((partner, index) => (
              <div
                key={index}
                className="group relative bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-56 hover:border-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="space-y-4 flex flex-col items-center text-center">
                  {!failedLogos[`partner-${index}`] && (
                    <div className={`h-20 w-20 mb-2 ${partner.whiteBg ? 'bg-white' : 'bg-amber-400/20'} rounded-2xl p-2 border border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] group-hover:border-amber-400/80 transition-all duration-500 flex items-center justify-center`}>
                      <img 
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-full w-full object-contain rounded-xl group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          setFailedLogos(prev => ({ ...prev, [`partner-${index}`]: true }));
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="font-sans text-stone-400 text-xs tracking-wide leading-relaxed">
                      {partner.specialty}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">Instagram Profile</span>
                  <a
                    href={partner.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-800 text-zinc-300 rounded-full hover:bg-purple-500 hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center"
                    title={`Follow ${partner.name} on Instagram`}
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Carousel from Specialist Leads */}
          <div className="pt-16 max-w-5xl mx-auto" id="creative-partners-testimonial-wrapper">
            <div className="text-center space-y-2 mb-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-500 font-semibold">
                DIRECT VERIFICATIONS
              </span>
              <h3 className="font-sans font-bold text-lg md:text-xl text-zinc-400">
                Studio Lead Collaborations
              </h3>
            </div>
            <PartnerTestimonialCarousel />
          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Testimonial {
  partnerName: string;
  specialty: string;
  leadName: string;
  role: string;
  quote: string;
  avatarInitial: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    partnerName: "The EKA",
    specialty: "Model Shoot",
    leadName: "Rohan Sen",
    role: "Founder & Creative Director",
    quote: "Star Circle doesn't just manage public relations; they redefine digital identity. Our editorial model shoots achieved 4x algorithmic visibility after their staging overhaul.",
    avatarInitial: "R"
  },
  {
    partnerName: "Navarasa",
    specialty: "Wedding Shoot",
    leadName: "Divya Lakshmi",
    role: "Principal Photographer",
    quote: "Their precision-driven distribution turns captured memories into viral cultural milestones. A flawless synergy of raw art and modern marketing intelligence.",
    avatarInitial: "D"
  },
  {
    partnerName: "Ikshana Studios",
    specialty: "Baby Shoot",
    leadName: "Karthik Raja",
    role: "Chief Visual Officer",
    quote: "The brand blueprint Star Circle built for Ikshana became our master coordinate. Our audience capture rate increased exponentially within weeks of execution.",
    avatarInitial: "K"
  },
  {
    partnerName: "The Cinema Trance",
    specialty: "Publicity Design",
    leadName: "Vikram Naidu",
    role: "Lead Design Strategist",
    quote: "As designers, we craft visual stories. Star Circle translates those stories into absolute search and social dominance. Their command ecosystem is unmatched.",
    avatarInitial: "V"
  },
  {
    partnerName: "Uha Studios",
    specialty: "Shoot Purpose / Production",
    leadName: "Srinivas Rao",
    role: "Head of Physical Production",
    quote: "We operate on massive physical film sets, but Star Circle owns the digital screen. Together, we've delivered some of the most successful theatrical titles of the year.",
    avatarInitial: "S"
  }
];

export default function PartnerTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play feature
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const selectTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Variants for slide transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div
      className="relative max-w-4xl mx-auto bg-gradient-to-br from-zinc-900 to-[#0e0c0f] border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(168,85,247,0.03)] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="partners-testimonial-carousel"
    >
      {/* Decorative ambient background glow (purple/magenta) */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

      {/* Quote Symbol Icon */}
      <div className="absolute top-6 right-8 text-purple-500/10 pointer-events-none select-none">
        <Quote className="w-24 h-24 stroke-[1.5]" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 relative z-10">
        
        {/* Left Side: Avatar & Identity Card */}
        <div className="flex flex-col items-center md:items-start shrink-0 space-y-4 text-center md:text-left">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 flex items-center justify-center font-sans font-extrabold text-2xl text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)]">
              {current.avatarInitial}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-zinc-950 border border-white/10 p-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-lg text-white">
              {current.leadName}
            </h4>
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
              {current.role}
            </p>
            <p className="font-sans font-semibold text-xs text-purple-400 mt-2">
              {current.partnerName}
            </p>
          </div>
        </div>

        {/* Right Side: The Testimonial Text & Slide Wrapper */}
        <div className="flex-1 flex flex-col justify-between min-h-[140px]">
          <div className="relative overflow-hidden w-full h-full flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <p className="font-sans text-stone-300 text-base md:text-lg italic leading-relaxed font-light tracking-wide">
                  "{current.quote}"
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    SPECIALIST SECTOR: {current.specialty}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & Nav dots */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            {/* Dots navigation */}
            <div className="flex items-center space-x-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                    index === currentIndex ? 'w-6 bg-purple-500' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to testimonial slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-zinc-950/60 border border-white/5 text-zinc-400 hover:text-white hover:border-purple-500/50 hover:bg-zinc-900 transition-all focus:outline-none cursor-pointer"
                aria-label="Previous testimonial"
                id="testimonial-prev-btn"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-zinc-950/60 border border-white/5 text-zinc-400 hover:text-white hover:border-purple-500/50 hover:bg-zinc-900 transition-all focus:outline-none cursor-pointer"
                aria-label="Next testimonial"
                id="testimonial-next-btn"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

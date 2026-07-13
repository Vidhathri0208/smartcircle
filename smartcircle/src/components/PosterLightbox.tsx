import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface Poster {
  title: string;
  src: string;
}

interface PosterLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Poster[];
  initialIndex: number;
  categoryLabel?: string;
}

export default function PosterLightbox({
  isOpen,
  onClose,
  movies,
  initialIndex,
  categoryLabel = "PORTFOLIO RELEASE"
}: PosterLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync index with initial selection when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, movies]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const currentMovie = movies[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && currentMovie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
          id="lightbox-overlay"
        >
          {/* Blurred Glow Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 select-none">
            <img
              src={currentMovie.src}
              alt="Blurred background"
              className="w-full h-full object-cover filter blur-[120px] scale-150 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Grid overlay for digital-cinema aesthetic */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

          {/* Top Command Bar */}
          <div className="absolute top-0 inset-x-0 h-20 px-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center space-x-3 select-none">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-500 font-semibold leading-none">
                  {categoryLabel}
                </span>
                <span className="font-sans text-xs text-zinc-400 font-light mt-1">
                  Item {currentIndex + 1} of {movies.length}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-400 text-zinc-400 hover:scale-115 transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Close lightbox"
              id="lightbox-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-20 p-4 rounded-full bg-white/5 border border-white/5 hover:border-amber-500/40 hover:bg-amber-500/10 text-white hover:text-amber-400 transition-all duration-300 focus:outline-none cursor-pointer hover:scale-110"
            aria-label="Previous poster"
            id="lightbox-prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Visual Frame */}
          <div className="relative flex flex-col items-center max-w-full max-h-[75vh] md:max-h-[80vh] z-10">
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative aspect-[2/3] max-h-[60vh] md:max-h-[70vh] rounded-2xl overflow-hidden border border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.15)] bg-zinc-950 flex items-center justify-center"
            >
              <img
                src={currentMovie.src}
                alt={currentMovie.title}
                className="w-full h-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-black/60 border border-white/10 p-2 rounded-lg pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </motion.div>

            {/* Captions and Details below the frame */}
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-center mt-6 space-y-2 select-none"
            >
              <h4 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight">
                {currentMovie.title}
              </h4>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-500 font-medium">
                STAR CIRCLE COLLABORATION DIRECTIVE
              </p>
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-20 p-4 rounded-full bg-white/5 border border-white/5 hover:border-amber-500/40 hover:bg-amber-500/10 text-white hover:text-amber-400 transition-all duration-300 focus:outline-none cursor-pointer hover:scale-110"
            aria-label="Next poster"
            id="lightbox-next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Quick Click-Outside Close Layer */}
          <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

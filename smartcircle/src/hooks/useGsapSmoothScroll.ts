import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export function useGsapSmoothScroll(currentRoute: string) {
  const scrollTarget = useRef(0);

  // 1. Smooth scroll to top during route/page transition
  useEffect(() => {
    // Reset our target scroll to top on page change
    scrollTarget.current = 0;
    
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1.2,
      ease: 'power4.inOut',
      overwrite: 'auto',
    });
  }, [currentRoute]);

  // 2. Inertial mouse wheel smooth scrolling
  useEffect(() => {
    scrollTarget.current = window.scrollY;

    const handleScroll = () => {
      // Sync the scroll target when standard scrolling occurs (scrolling by keys, trackpad, scrollbar drag)
      if (!gsap.isTweening(window)) {
        scrollTarget.current = window.scrollY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Trackpads trigger many small events with decimal/small delta values.
      // Discrete mouse wheels trigger large steps (typically multiples of 100/120 or at least >15).
      const isTrackpad = Math.abs(e.deltaY) < 15 || e.deltaY % 1 !== 0;

      // Only intercept discrete mouse wheels to avoid interfering with high-precision trackpads/momentum
      if (!isTrackpad) {
        e.preventDefault();

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        // Add delta to current scroll target with a gentle speed multiplier
        scrollTarget.current = Math.max(
          0,
          Math.min(scrollTarget.current + e.deltaY * 1.1, maxScroll)
        );

        gsap.to(window, {
          scrollTo: { y: scrollTarget.current, autoKill: true },
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}

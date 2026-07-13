import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Star Circle's core methodology?",
    answer: "We combine high-fidelity cinematic storytelling (VFX, professional scriptwriting, creative asset building) with precision digital analytics (search engines visibility, algorithmic recommendation graphs, predictive distribution curves) to build permanent digital legacies. We call this the Infinite Loop: where artistic elegance feeds algorithmic authority."
  },
  {
    question: "Do you work with international brands or only Indian cinematic titles?",
    answer: "While our spiritual and physical headquarters are in Hyderabad (the epicentre of spectacular high-octane cinema), our operations span globally. We bridge regional cinematic productions and multi-million dollar tech enterprises with international distribution networks, scaling titles across North America, Europe, and Asia-Pacific pipelines."
  },
  {
    question: "How does the Confidentiality Guarantee (NDA) operate?",
    answer: "Absolute containment. Because we work with high-profile celebrities, elite tech founders, and top-tier cinematic releases, we maintain military-grade security for our client rosters. Under our strict NDA protocols, we never self-promote or use your pre-release script models, assets, or positioning secrets in case studies without explicit, multi-level clearance."
  },
  {
    question: "What is your typical client onboarding timeline?",
    answer: "To ensure uncompromising attention to detail and raw creative control, we only onboard a restricted count of corporate partners and creators per fiscal quarter. We strongly recommend initiating your application 4 to 6 weeks prior to your targeted digital or theatrical campaign launch date."
  },
  {
    question: "Does Star Circle manage physical production or post-release optimization?",
    answer: "We manage both. We are an end-to-end command ecosystem. Our division handles everything from initial pre-visualization and cinematic script doctoring to active post-production VFX, localized YouTube governance networks, personal brand verification, and high-CTR visual assets."
  },
  {
    question: "What metrics determine the success of a campaign?",
    answer: "We look beyond raw impression volume, which is easily simulated. We track algorithmic permanence—such as recommendation share of voice, continuous high-CTR organic loops, core audience retention curves, and high-intent inbound search impressions. Our goal is unyielding, permanent authority."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4" id="faq-accordion-container">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? 'border-amber-500/40 bg-gradient-to-br from-[#0e0c0a] to-[#050505] shadow-[0_4px_30px_rgba(245,158,11,0.05)]'
                : 'border-white/5 bg-[#0a0a0a] hover:border-white/10 hover:bg-[#0c0c0c]'
            }`}
            id={`faq-item-${index}`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-start space-x-4 pr-4">
                <HelpCircle className={`w-5 h-5 mt-1 shrink-0 transition-colors duration-300 ${isOpen ? 'text-amber-500' : 'text-zinc-500'}`} />
                <span className={`font-sans font-medium text-base md:text-lg tracking-tight transition-colors duration-300 ${isOpen ? 'text-amber-400' : 'text-white'}`}>
                  {item.question}
                </span>
              </div>
              <div className={`p-1.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-zinc-400'}`}>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 pb-6 pl-14 text-sm md:text-base text-zinc-400/90 leading-relaxed font-light border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

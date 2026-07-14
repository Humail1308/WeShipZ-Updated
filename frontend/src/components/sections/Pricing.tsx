import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

const prices: Record<string, Record<string, string>> = {
  USD: {
    starter: '$299',
    growth: '$999',
    scale: 'Custom',
    scaleSub: ' Quote',
    motion: '$499'
  },
  PKR: {
    starter: 'PKR 49,999',
    growth: 'PKR 119,999',
    scale: 'Custom',
    scaleSub: ' Quote',
    motion: 'PKR 49,999'
  }
};

const cards = [
  {
    id: "starter",
    title: "Starter",
    desc: "One core automation to solve your biggest pain point.",
    price: "$299",
    setup: "/setup",
    features: ["Lead Capture → CRM Pipeline", "Instant Follow-Up Trigger", "2 Weeks Support"],
    btnText: "Get Started",
    btnClass: "border border-white/10 hover:bg-white/5",
    isPopular: false
  },
  {
    id: "growth",
    title: "Growth",
    desc: "Full operational automation for scaling agencies.",
    price: "$999",
    setup: "/setup",
    features: ["Full AI Support Agent", "Custom Dashboard", "Up to 5 Connected Workflows", "1 Month High-Touch Support"],
    btnText: "Book Now",
    btnClass: "bg-electric-blue text-white hover:brightness-110",
    isPopular: true
  },
  {
    id: "scale",
    title: "Scale",
    desc: "Custom AI ecosystem for established enterprises.",
    price: "Custom",
    setup: " Quote",
    features: ["Custom AI Knowledge Integration", "Legacy System Integration", "Dedicated Automation Lead"],
    btnText: "Contact Sales",
    btnClass: "border border-white/10 hover:bg-white/5",
    isPopular: false
  },
  {
    id: "motion",
    title: "Motion Experts",
    desc: "High-quality motion graphic ads for businesses that need creative, not automation.",
    price: "$499",
    setup: "/project",
    features: ["3x 15-Second Motion Graphic Ads", "Supporting Image Generation Set", "Marketing Copy & Captions", "2 Revision Rounds"],
    btnText: "Get Started",
    btnClass: "border border-white/10 hover:bg-white/5",
    isPopular: false
  }
];

export function Pricing({ onBookCall }: { onBookCall: () => void }) {
  const [currency, setCurrency] = useState('USD');
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    fetch('https://ipwho.is/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code === 'PK') {
          setCurrency('PKR');
        } else {
          setCurrency('USD');
        }
      })
      .catch(() => setCurrency('USD'));
  }, []);

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);

  const getCardStyle = (index: number) => {
    if (index === activeIndex) {
      return {
        x: "0%",
        rotateY: 0,
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 3,
        boxShadow: "0 0 40px rgba(37,99,235,0.3)"
      };
    }
    
    const isLeft = index === (activeIndex - 1 + cards.length) % cards.length;
    const isRight = index === (activeIndex + 1) % cards.length;
    
    if (isLeft) {
      return {
        x: "-65%",
        rotateY: 35,
        scale: 0.8,
        filter: "blur(2px)",
        opacity: 0.5,
        zIndex: 1,
        boxShadow: "0 0 0px rgba(37,99,235,0)"
      };
    } else if (isRight) {
      return {
        x: "65%",
        rotateY: -35,
        scale: 0.8,
        filter: "blur(2px)",
        opacity: 0.5,
        zIndex: 1,
        boxShadow: "0 0 0px rgba(37,99,235,0)"
      };
    }
    
    return {
      x: "0%",
      rotateY: 0,
      scale: 0.6,
      filter: "blur(5px)",
      opacity: 0,
      zIndex: 0,
      boxShadow: "0 0 0px rgba(37,99,235,0)"
    };
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) return;
    const isLeft = index === (activeIndex - 1 + cards.length) % cards.length;
    const isRight = index === (activeIndex + 1) % cards.length;
    
    if (isLeft) {
      prevCard();
    } else if (isRight) {
      nextCard();
    }
  };

  return (
    <section className="py-section-padding px-gutter max-w-container-max mx-auto" id="pricing">
      <div className="mb-12 text-center">
        <span 
          className="text-electric-blue block mb-4 uppercase"
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            letterSpacing: "0.15em", 
            fontSize: "0.75rem",
            fontWeight: "700"
          }}
        >
          05 - PRICING
        </span>
        <AnimatedHeading text="Invest in an asset, not a cost." className="font-headline-lg text-headline-lg-mobile md:text-headline-lg" />
      </div>

      <div className="text-center w-full flex justify-center">
        <div style={{ color: 'gray', fontSize: '0.72rem', opacity: 0.5, marginBottom: '16px' }}>
          {currency === 'PKR' ? 'Showing PKR prices' : 'Showing USD prices'}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-5xl hidden md:block" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
        
        {/* Navigation Arrows beside cards */}
        <button 
          onClick={prevCard} 
          className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-electric-blue transition-all z-50 hidden md:flex"
        >
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        
        <button 
          onClick={nextCard} 
          className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-electric-blue transition-all z-50 hidden md:flex"
        >
          <span className="material-symbols-outlined text-white">arrow_forward</span>
        </button>

        {/* Carousel Container */}
        <div className="relative h-[650px] w-full" style={{ transformStyle: "preserve-3d" }}>
          {cards.map((card, index) => {
            const style = getCardStyle(index);
            const isCenter = index === activeIndex;
            return (
              <motion.div
                key={card.id}
                className={`absolute left-0 right-0 mx-auto top-0 w-[320px] bg-background-elevated border border-white/5 rounded-xl flex flex-col ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                style={{ padding: "40px" }}
                animate={style}
                transition={{ type: "spring", stiffness: 70, damping: 18 }}
                onClick={() => handleCardClick(index)}
              >
                {card.isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-electric-blue text-white font-label-mono text-[10px] px-4 py-1.5 rounded-full tracking-widest z-10">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-headline-md text-headline-md mb-2">{card.title}</h3>
                <p className="text-on-surface-variant mb-8 h-[48px]">{card.desc}</p>
                <div className="text-4xl font-headline-md mb-8">
                  {prices[currency][card.id] || card.price}
                  <span className="text-lg font-body-md text-on-surface-variant">
                    {card.id === 'scale' ? prices[currency].scaleSub : card.setup}
                  </span>
                </div>
                <ul className="space-y-4 mb-12 flex-grow h-[150px]">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-electric-blue text-sm">check_circle</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={(e) => { e.stopPropagation(); onBookCall(); }} 
                  className={`w-full py-4 rounded transition-all ${card.btnClass} ${isCenter ? '' : 'pointer-events-none'}`}
                >
                  {card.btnText}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="flex flex-col gap-6 w-full md:hidden mt-8">
        {cards.map((card) => (
          <div key={card.id} className="w-full bg-background-elevated border border-white/5 rounded-xl flex flex-col relative" style={{ padding: "40px" }}>
            {card.isPopular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-electric-blue text-white font-label-mono text-[10px] px-4 py-1.5 rounded-full tracking-widest z-10">
                MOST POPULAR
              </div>
            )}
            <h3 className="font-headline-md text-headline-md mb-2 text-left">{card.title}</h3>
            <p className="text-on-surface-variant mb-8 min-h-[48px] text-left">{card.desc}</p>
            <div className="text-4xl font-headline-md mb-8 text-left">
              {prices[currency][card.id] || card.price}
              <span className="text-lg font-body-md text-on-surface-variant">
                {card.id === 'scale' ? prices[currency].scaleSub : card.setup}
              </span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow text-left">
              {card.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-electric-blue text-sm">check_circle</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={(e) => { e.stopPropagation(); onBookCall(); }} 
              className={`w-full py-4 rounded transition-all ${card.btnClass}`}
            >
              {card.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="hidden md:flex items-center justify-center gap-3 mt-12">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-electric-blue scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

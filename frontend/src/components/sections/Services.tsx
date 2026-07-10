import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

const services = [
  {
    id: "01",
    icon: "smart_toy",
    title: "AI Customer Support",
    description: "24/7 intelligent agents that resolve tickets, handle refunds, and schedule calls directly in your CRM without human intervention."
  },
  {
    id: "02",
    icon: "hub",
    title: "Lead Scoring",
    description: "Automatically filter out tire-kickers and prioritize high-value prospects instantly using LLM analysis."
  },
  {
    id: "03",
    icon: "database",
    title: "Data Engines",
    description: "Centralize scattered data into a single source of truth that predicts churn before it happens."
  },
  {
    id: "04",
    icon: "rocket_launch",
    title: "Custom Internal Tools",
    description: "Bespoke dashboards and automations that connect your existing tech stack (Slack, HubSpot, Stripe) into a cohesive machine."
  },
  {
    id: "05",
    icon: "play_circle",
    title: "Motion & Ad Creatives",
    description: "Scroll-stopping video ads, motion graphics, and branded content — produced at speed. We turn your product into a visual story that converts."
  }
];

export function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="py-section-padding px-gutter max-w-container-max mx-auto" id="services">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span 
  className="text-electric-blue block mb-4 uppercase"
  style={{ 
  fontFamily: "'Space Grotesk', sans-serif", 
  letterSpacing: "0.15em", 
  fontSize: "0.75rem",
  fontWeight: "700"
}}
>
  01 - WHAT WE BUILD
</span>
          <AnimatedHeading text="We don't just 'use' AI. We engineer proprietary workflows." className="font-headline-lg text-headline-lg-mobile md:text-headline-lg max-w-3xl" />
        </motion.div>
      </div>
      
      <div className="relative w-full max-w-4xl mx-auto min-h-[400px]">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev} 
          style={{
            position: 'absolute', left: -60, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            alignItems: 'center', justifyContent: 'center', zIndex: 50,
            cursor: 'pointer', transition: 'all 0.3s ease'
          }}
          className="hidden md:flex"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(37,99,235,0.2)';
            e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>

        {/* Right Arrow */}
        <button 
          onClick={handleNext} 
          style={{
            position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            alignItems: 'center', justifyContent: 'center', zIndex: 50,
            cursor: 'pointer', transition: 'all 0.3s ease'
          }}
          className="hidden md:flex"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(37,99,235,0.2)';
            e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <span className="material-symbols-outlined text-white">arrow_forward</span>
        </button>

        <div className="relative overflow-hidden w-full h-full min-h-[400px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div 
                className="group relative flex flex-col justify-center h-full"
                style={{
                  borderRadius: '28px',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  padding: '48px',
                  transition: 'all 0.4s ease',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = '0 32px 80px rgba(37,99,235,0.2), 0 1px 0 rgba(255,255,255,0.12) inset';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = '0 24px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.3) inset';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Subtle top highlight shine */}
                <div 
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                    pointerEvents: 'none'
                  }} 
                />
                {/* Glossy inner top shine */}
                <div 
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 120,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                    borderRadius: '28px 28px 0 0',
                    pointerEvents: 'none'
                  }} 
                />

                <span className="absolute -right-4 -bottom-4 font-display-xl text-[180px] text-white/[0.03] select-none pointer-events-none group-hover:text-electric-blue/5 transition-colors">
                  {services[currentIndex].id}
                </span>
                <span className="material-symbols-outlined text-electric-blue text-5xl mb-8 relative z-10">{services[currentIndex].icon}</span>
                <h3 className="font-headline-md text-headline-md mb-6 relative z-10">{services[currentIndex].title}</h3>
                <p className="font-body-lg text-on-surface-variant max-w-2xl relative z-10">{services[currentIndex].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-6 md:gap-2 mt-8">
        <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex md:hidden items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex gap-2">
          {services.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-electric-blue w-6' : 'bg-white/20'}`} 
            />
          ))}
        </div>
        <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex md:hidden items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}

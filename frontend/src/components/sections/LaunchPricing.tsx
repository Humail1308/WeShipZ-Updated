import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

interface LaunchPricingProps {
  onBookCall: () => void;
}

function RollingNumber({ value, prefix = "" }: { value: number, prefix?: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayValue(Math.floor(v).toLocaleString());
        }
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={nodeRef}>
      {prefix}{displayValue}
    </span>
  );
}

function StrikethroughText({ text }: { text: string }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  return (
    <div ref={nodeRef} className="relative inline-block text-on-surface-variant text-sm">
      {text}
      <motion.div 
        className="absolute left-0 top-1/2 h-[1px] bg-on-surface-variant origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        style={{ width: '100%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
}

export function LaunchPricing({ onBookCall }: LaunchPricingProps) {
  const [currency, setCurrency] = useState('USD');

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

  const videoPrice = currency === 'PKR' ? 50000 : 499;
  const videoPrefix = currency === 'PKR' ? 'PKR ' : '$';
  const videoAgencyText = currency === 'PKR' ? 'PKR 150,000 agency price' : '$1,500+ agency price';

  const automationPrice = currency === 'PKR' ? 70000 : 299;
  const automationPrefix = currency === 'PKR' ? 'PKR ' : '$';

  const cardStyle = {
    borderRadius: '28px',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '48px',
    transition: 'all 0.4s ease',
    transform: 'translateY(0)'
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.boxShadow = '0 32px 80px rgba(37,99,235,0.2), 0 1px 0 rgba(255,255,255,0.12) inset';
    el.style.transform = 'translateY(-8px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.boxShadow = '0 24px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.3) inset';
    el.style.transform = 'translateY(0)';
  };

  return (
    <section className="py-section-padding px-gutter max-w-container-max mx-auto" id="launch-pricing">
      <div className="mb-16 text-center">
        <AnimatedHeading text="Our Launch Pricing" className="font-headline-md text-headline-md mb-4" />
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Early pricing for our first clients while we build out our portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {/* Card 1: Video Ads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative flex flex-col h-full cursor-pointer"
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Subtle top highlight shine */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)', pointerEvents: 'none' }} />
          {/* Glossy inner top shine */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)', borderRadius: '28px 28px 0 0', pointerEvents: 'none' }} />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="material-symbols-outlined text-electric-blue text-4xl mb-6 block">play_circle</span>
              <span className="text-electric-blue font-label-mono text-xs uppercase tracking-widest mb-4 block">
                Video Ads
              </span>
              <div className="flex flex-col gap-1 mb-6 items-start">
                <h3 className="font-headline-md text-5xl">
                  <RollingNumber value={videoPrice} prefix={videoPrefix} />
                </h3>
                <StrikethroughText text={videoAgencyText} />
              </div>
              <p className="font-body-lg text-on-surface-variant">
                3 custom video ads, delivered in 48 hours
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Automation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group relative flex flex-col h-full cursor-pointer"
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Subtle top highlight shine */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)', pointerEvents: 'none' }} />
          {/* Glossy inner top shine */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)', borderRadius: '28px 28px 0 0', pointerEvents: 'none' }} />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="material-symbols-outlined text-electric-blue text-4xl mb-6 block">smart_toy</span>
              <span className="text-electric-blue font-label-mono text-xs uppercase tracking-widest mb-4 block">
                Automation
              </span>
              <div className="flex flex-col gap-1 mb-6 items-start">
                <span className="text-sm text-on-surface-variant">Starting from</span>
                <h3 className="font-headline-md text-5xl">
                  <RollingNumber value={automationPrice} prefix={automationPrefix} />
                </h3>
              </div>
              <p className="font-body-lg text-on-surface-variant">
                Your core automation, engineered around your actual bottleneck
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-center">
        <p className="font-body-md text-on-surface-variant mb-8 max-w-xl mx-auto">
          You only move forward after a free audit confirms it's the right fit for you.
        </p>
        <button 
          onClick={onBookCall}
          className="px-8 py-4 bg-electric-blue text-white rounded font-medium hover:brightness-110 transition-all text-center inline-block"
        >
          Book a Free Audit Call
        </button>
      </div>
    </section>
  );
}

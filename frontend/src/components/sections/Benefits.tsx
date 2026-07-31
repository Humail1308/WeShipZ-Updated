import { motion } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

interface BenefitsProps {
  onBookCall: () => void;
}

const benefits = [
  "No dev team needed",
  "No filming days for ads",
  "No long onboarding process",
  "No generic templates. Everything's built for your business specifically"
];

export function Benefits({ onBookCall }: BenefitsProps) {
  const cardStyle = {
    borderRadius: '16px',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
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
    <section className="py-section-padding px-gutter max-w-container-max mx-auto" id="benefits">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <AnimatedHeading text="What You Don't Have To Worry About" className="font-headline-md text-headline-md mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group flex items-start gap-5 p-8 relative overflow-hidden"
              style={cardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Subtle top highlight shine */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)', pointerEvents: 'none' }} />
              {/* Glossy inner top shine */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)', borderRadius: '16px 16px 0 0', pointerEvents: 'none' }} />
              
              <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0 border border-electric-blue/20 group-hover:bg-electric-blue/20 group-hover:border-electric-blue/40 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.15)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <span className="material-symbols-outlined text-electric-blue text-xl relative z-10">check</span>
              </div>
              <p className="font-body-lg text-on-surface-variant relative z-10 pt-1 leading-snug">{benefit}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-body-lg text-white mb-8">
            We're a full-cycle agency: automation, creative, and support, all in one place.
          </p>
          <button 
            onClick={onBookCall}
            className="px-8 py-4 bg-electric-blue text-white rounded font-medium hover:brightness-110 transition-all inline-block"
          >
            Book a Free Audit Call
          </button>
        </div>
      </div>
    </section>
  );
}

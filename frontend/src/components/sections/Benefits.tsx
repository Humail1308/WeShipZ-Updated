import { motion } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

interface BenefitsProps {
  onBookCall: () => void;
}

const benefits = [
  "No dev team needed",
  "No filming days for ads",
  "No long onboarding process",
  "No generic templates — everything's built for your business specifically"
];

export function Benefits({ onBookCall }: BenefitsProps) {
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
              className="flex items-start gap-4 p-6 bg-background-elevated border border-white/10 rounded-xl"
            >
              <span className="material-symbols-outlined text-electric-blue shrink-0 mt-0.5">check_circle</span>
              <p className="font-body-lg text-on-surface-variant">{benefit}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-body-lg text-white mb-8">
            We're a full-cycle agency — automation, creative, and support, all in one place.
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

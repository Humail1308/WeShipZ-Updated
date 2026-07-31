import { motion } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

interface LaunchPricingProps {
  onBookCall: () => void;
}

export function LaunchPricing({ onBookCall }: LaunchPricingProps) {
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
          className="bg-background-elevated border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
        >
          <div>
            <span className="text-electric-blue font-label-mono text-xs uppercase tracking-widest mb-4 block">
              Video Ads
            </span>
            <div className="flex items-end gap-3 mb-4">
              <h3 className="font-headline-md text-5xl">$499</h3>
              <span className="text-on-surface-variant line-through mb-1 text-sm">$1,500+ agency price</span>
            </div>
            <p className="font-body-lg text-on-surface-variant">
              3 custom video ads, delivered in 48 hours
            </p>
          </div>
        </motion.div>

        {/* Card 2: Automation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-background-elevated border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
        >
          <div>
            <span className="text-electric-blue font-label-mono text-xs uppercase tracking-widest mb-4 block">
              Automation
            </span>
            <div className="flex items-end gap-3 mb-4">
              <h3 className="font-headline-md text-5xl">$299</h3>
            </div>
            <p className="font-body-lg text-on-surface-variant">
              Your core automation, engineered around your actual bottleneck
            </p>
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

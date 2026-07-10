import { motion } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

export function Reviews() {
  return (
    <section className="py-section-padding px-gutter max-w-container-max mx-auto bg-background-elevated/30 border-y border-outline-variant/5" id="reviews">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center">
        <span 
  className="text-electric-blue block mb-4 uppercase"
  style={{ 
  fontFamily: "'Space Grotesk', sans-serif", 
  letterSpacing: "0.15em", 
  fontSize: "0.75rem",
  fontWeight: "700"
}}
>
  04 - REVIEWS
</span>
        <AnimatedHeading text="What our partners say." className="font-headline-lg text-headline-lg-mobile md:text-headline-lg" />
      </motion.div>
      
      <div className="max-w-4xl mx-auto bg-background-elevated border border-white/10 p-6 md:p-16 rounded-2xl relative">
        <span className="material-symbols-outlined absolute top-4 left-4 md:top-8 md:left-8 text-4xl md:text-6xl text-white/5 pointer-events-none">format_quote</span>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex gap-1 mb-6 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined fill-current">star</span>
            ))}
          </div>
          <p className="font-body-lg text-xl md:text-2xl leading-relaxed text-on-surface-variant mb-8 italic">
            "I recently hired them for my E-commerce Store. They automated the e-commerce listings process that would usually take 30 mins for one listing but now I have my listing ready in 2 minutes. Highly recommended for AI Automations Solutions."
          </p>
          <div>
            <h4 className="font-headline-md text-xl text-white mb-1">Ashja</h4>
            <p className="font-label-mono text-label-mono text-electric-blue">E-COMMERCE STORE OWNER</p>
          </div>
        </div>
      </div>
    </section>
  );
}

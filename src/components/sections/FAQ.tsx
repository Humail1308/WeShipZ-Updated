import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className={`border-b border-white/10 pb-6 group cursor-pointer ${active ? 'active' : ''}`} onClick={() => setActive(!active)}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-body-lg text-lg">{question}</h4>
        <span className={`material-symbols-outlined transition-transform ${active ? 'rotate-180' : ''}`}>expand_more</span>
      </div>
      <p className={`text-on-surface-variant transition-all ${active ? 'block' : 'hidden'}`}>{answer}</p>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-section-padding px-gutter max-w-3xl mx-auto" id="faq">
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
  06 - FAQ
</span>
        <AnimatedHeading text="Frequently asked." className="font-headline-md text-headline-md" />
      </motion.div>
      <div className="space-y-4">
        <FaqItem 
          question="Will this work for my specific industry?" 
          answer="Yes. If your business uses digital tools (Email, CRM, Calendars, Invoicing), it can be automated. We specialize in service businesses, e-commerce, and digital agencies."
        />
        <FaqItem 
          question="How long does it take to see ROI?" 
          answer="Usually within the first month. By replacing manual tasks with AI, the labor cost savings often cover our fees immediately."
        />
        <FaqItem 
          question="Do we need to switch our software?" 
          answer="No. We build connections between the tools you already love. We only recommend new tools if your current stack is preventing growth."
        />
      </div>
    </section>
  );
}

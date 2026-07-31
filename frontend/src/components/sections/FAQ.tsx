import { useState } from 'react';
import { motion } from 'framer-motion';
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
          question="What exactly will I get — automation, ads, or both?" 
          answer="Depends on your business. After the free audit, we recommend exactly what makes sense — could be automation, ad creatives, or both."
        />
        <FaqItem 
          question="Do I need any technical knowledge to get started?" 
          answer="No. You answer a few simple questions, we handle everything technical."
        />
        <FaqItem 
          question="How long will it take?" 
          answer="Ad creatives: 48 hours. Automations: 2-4 weeks depending on complexity."
        />
        <FaqItem 
          question="How do I get in touch?" 
          answer="Book a free audit call — no commitment, just a real look at what would help."
        />
      </div>
    </section>
  );
}

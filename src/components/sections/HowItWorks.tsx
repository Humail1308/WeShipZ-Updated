import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const dot1Opacity = useTransform(scrollYProgress, [0.14, 0.18], [0, 1]);
  const dot2Opacity = useTransform(scrollYProgress, [0.48, 0.52], [0, 1]);
  const dot3Opacity = useTransform(scrollYProgress, [0.82, 0.86], [0, 1]);

  const steps = [
    {
      id: "01",
      title: "Free Audit Call",
      description: "We map out your current bottlenecks and find exactly where AI can replace 10+ hours of weekly manual work."
    },
    {
      id: "02",
      title: "The Build Phase",
      description: "We ship your custom automation architecture in 2-4 weeks. No generic templates, just pure engineering."
    },
    {
      id: "03",
      title: "Manage & Optimize",
      description: "We don't just hand over the keys. We monitor, refine, and upgrade your systems as your business evolves."
    }
  ];

  return (
    <section ref={sectionRef} className="py-section-padding bg-background-surface relative" id="how-it-works">
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="mb-20">
          <span 
            className="text-electric-blue block mb-4 uppercase"
            style={{ 
              fontFamily: "'Space Grotesk', sans-serif", 
              letterSpacing: "0.15em", 
              fontSize: "0.75rem",
              fontWeight: "700"
            }}
          >
            02 - HOW IT WORKS
          </span>
          <AnimatedHeading text="From manual chaos to hands-free growth." className="font-headline-lg text-headline-lg-mobile md:text-headline-lg" />
        </div>
        <div className="space-y-12 md:space-y-24 relative">
          
          {/* Animated Vertical Line Container */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            {/* Faint blue track */}
            <div className="absolute inset-0 bg-[rgba(37,99,235,0.15)] w-full"></div>
            
            {/* Animated Progress Line */}
            <motion.div 
              className="absolute top-0 w-full bg-[#2563eb]"
              style={{ 
                height: lineHeight,
                boxShadow: "0 0 8px #2563eb, 0 0 16px #2563eb44"
              }}
            ></motion.div>

            {/* Glowing Blue Dots */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full bg-[#2563eb] animate-pulse" 
              style={{ top: "16%", boxShadow: "0 0 12px #2563eb", opacity: dot1Opacity }} 
            />
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full bg-[#2563eb] animate-pulse" 
              style={{ top: "50%", boxShadow: "0 0 12px #2563eb", opacity: dot2Opacity }} 
            />
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full bg-[#2563eb] animate-pulse" 
              style={{ top: "84%", boxShadow: "0 0 12px #2563eb", opacity: dot3Opacity }} 
            />
          </div>
          
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center text-center md:text-left bg-background-elevated md:bg-transparent p-8 md:p-0 rounded-2xl border border-white/5 md:border-none z-10 md:z-auto"
              >
                {isLeft ? (
                  <>
                    <div className="md:text-right">
                      <span className="font-display-xl text-5xl md:text-9xl text-white/[0.05] block mb-2">{step.id}</span>
                      <h3 className="font-headline-md text-2xl md:text-5xl mb-4 text-white">{step.title}</h3>
                      <p className="font-body-lg text-on-surface-variant max-w-md mx-auto md:ml-auto md:mr-0">{step.description}</p>
                    </div>
                    <div className="hidden md:block"></div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block"></div>
                    <div>
                      <span className="font-display-xl text-5xl md:text-9xl text-white/[0.05] block mb-2">{step.id}</span>
                      <h3 className="font-headline-md text-2xl md:text-5xl mb-4 text-white">{step.title}</h3>
                      <p className="font-body-lg text-on-surface-variant max-w-md mx-auto md:ml-0 md:mr-auto">{step.description}</p>
                    </div>
                  </>
                )}
                {/* Remove the old static dot, now handled by the central track */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

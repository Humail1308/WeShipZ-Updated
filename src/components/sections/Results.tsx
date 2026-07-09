import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';
import ecommerceImg from '../../assets/workflows/ecommerce.jpeg';
import resumeImg from '../../assets/workflows/resume.png';
import shortsImg from '../../assets/workflows/shorts.png';

const projects = [
  {
    name: "E-Commerce Listing Generator",
    description: "AI workflow that auto-generates product listings, titles & descriptions at scale.",
    image: ecommerceImg,
    tag: "E-Commerce · Automation",
    pdf: "/case-studies/ecommerce.pdf"
  },
  {
    name: "Resume Rewriter",
    description: "Automated resume tailoring system that rewrites CVs based on job descriptions.",
    image: resumeImg,
    tag: "HR · AI Writing",
    pdf: "/case-studies/resume.pdf"
  },
  {
    name: "Automated Shorts Creator",
    description: "End-to-end pipeline that turns long-form content into short-form videos automatically.",
    image: shortsImg,
    tag: "Content · Video AI",
    pdf: "/case-studies/shorts.pdf"
  },
];

export function Results() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <section className="py-section-padding px-gutter max-w-container-max mx-auto" id="results">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="text-electric-blue block mb-4 uppercase"
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                letterSpacing: "0.15em", 
                fontSize: "0.75rem",
                fontWeight: "700"
              }}
            >
              03 - PORTFOLIO
            </span>
            <AnimatedHeading text="Portfolio." className="font-headline-lg text-headline-lg-mobile md:text-headline-lg" />
          </motion.div>
          <p className="font-body-lg text-on-surface-variant max-w-sm">
            Actual systems we've deployed for clients that are saving hundreds of hours weekly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveProject(idx);
              }}
              className="group bg-background-elevated border border-white/10 rounded-xl overflow-hidden cursor-pointer"
              style={{ transition: 'all 0.4s ease-out', transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(37,99,235,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
              }}
            >
              {/* Screenshot */}
              <div className="aspect-[16/10] relative overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.style.background = "rgba(37,99,235,0.08)";
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      const txt = document.createElement("span");
                      txt.textContent = project.name;
                      txt.style.cssText = "color:rgba(255,255,255,0.3);font-size:0.8rem;text-align:center;padding:1rem;";
                      parent.appendChild(txt);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-6">
                <span 
                  className="text-electric-blue block mb-2 uppercase"
                  style={{ 
                    fontFamily: "'Space Grotesk', sans-serif", 
                    letterSpacing: "0.15em", 
                    fontSize: "0.72rem",
                    fontWeight: "700"
                  }}
                >
                  {project.tag}
                </span>
                <h3 className="font-headline-sm text-headline-sm mb-2">{project.name}</h3>
                <p className="font-body-md text-on-surface-variant line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', cursor: 'auto' }}
          >
            <motion.div
              key={activeProject}
              onClick={(e) => e.stopPropagation()}
              initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              transition={{ 
                rotateY: { type: 'spring', stiffness: 100, damping: 20 },
                opacity: { duration: 0.3 },
                scale: { type: 'spring', stiffness: 100, damping: 20 }
              }}
              className="bg-background-elevated border border-white/10 overflow-hidden w-full overflow-y-auto flex flex-col scrollbar-hide"
              style={{ transformPerspective: 1000, maxWidth: '580px', maxHeight: '75vh', borderRadius: '20px', cursor: 'auto' }}
            >
              <div className="w-full h-[240px] relative shrink-0">
                <img 
                  src={projects[activeProject].image} 
                  alt={projects[activeProject].name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-6" style={{ padding: '28px' }}>
                <div>
                  <span className="text-electric-blue font-label-mono text-xs uppercase tracking-widest mb-3 block">
                    {projects[activeProject].tag}
                  </span>
                  <h2 className="font-headline-md text-3xl md:text-4xl text-white mb-4">
                    {projects[activeProject].name}
                  </h2>
                  <p className="text-on-surface-variant font-body-lg text-lg leading-relaxed">
                    {projects[activeProject].description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
                  <a 
                    href={projects[activeProject].pdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-electric-blue text-white rounded font-medium hover:brightness-110 transition-all text-center"
                  >
                    Preview Case Study
                  </a>
                  <button 
                    onClick={() => setActiveProject(null)}
                    className="px-8 py-4 border border-white/20 text-white rounded font-medium hover:bg-white/5 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

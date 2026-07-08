import { motion } from 'framer-motion';
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
  },
  {
    name: "Resume Rewriter",
    description: "Automated resume tailoring system that rewrites CVs based on job descriptions.",
    image: resumeImg,
    tag: "HR · AI Writing",
  },
  {
    name: "Automated Shorts Creator",
    description: "End-to-end pipeline that turns long-form content into short-form videos automatically.",
    image: shortsImg,
    tag: "Content · Video AI",
  },
];

export function Results() {
  return (
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
            className="group bg-background-elevated border border-white/10 rounded-xl overflow-hidden hover-lift"
          >
            {/* Screenshot */}
            <div className="aspect-[16/10] relative overflow-hidden bg-white/5">
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // fallback placeholder if image not found
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
              {/* Subtle overlay on hover */}
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
              <h3 className="font-headline-md text-on-surface mb-2 text-[1.05rem] font-bold">
                {project.name}
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

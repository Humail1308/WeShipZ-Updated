import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FloatingObjects } from './FloatingObjects';

export function Hero({ onBookCall }: { onBookCall: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Floating objects scroll fade
  const floatingOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0], { clamp: true });

  // Transform hooks for each letter using specified ranges
  const yW = useTransform(scrollYProgress, [0.02, 0.18], [0, 800], { clamp: true });
  const opacityW = useTransform(scrollYProgress, [0.02, 0.18], [1, 0], { clamp: true });
  const rotateW = useTransform(scrollYProgress, [0.02, 0.18], [0, -20], { clamp: true });

  const yE = useTransform(scrollYProgress, [0.05, 0.21], [0, 800], { clamp: true });
  const opacityE = useTransform(scrollYProgress, [0.05, 0.21], [1, 0], { clamp: true });
  const rotateE = useTransform(scrollYProgress, [0.05, 0.21], [0, 30], { clamp: true });

  const yS = useTransform(scrollYProgress, [0.08, 0.24], [0, 800], { clamp: true });
  const opacityS = useTransform(scrollYProgress, [0.08, 0.24], [1, 0], { clamp: true });
  const rotateS = useTransform(scrollYProgress, [0.08, 0.24], [0, -15], { clamp: true });

  const yH = useTransform(scrollYProgress, [0.11, 0.27], [0, 800], { clamp: true });
  const opacityH = useTransform(scrollYProgress, [0.11, 0.27], [1, 0], { clamp: true });
  const rotateH = useTransform(scrollYProgress, [0.11, 0.27], [0, 0], { clamp: true });

  const yI = useTransform(scrollYProgress, [0.14, 0.30], [0, 800], { clamp: true });
  const opacityI = useTransform(scrollYProgress, [0.14, 0.30], [1, 0], { clamp: true });
  const scaleI = useTransform(scrollYProgress, [0.14, 0.30], [1, 0.5], { clamp: true });

  const yP = useTransform(scrollYProgress, [0.17, 0.33], [0, 800], { clamp: true });
  const opacityP = useTransform(scrollYProgress, [0.17, 0.33], [1, 0], { clamp: true });
  const rotateP = useTransform(scrollYProgress, [0.17, 0.33], [0, -30], { clamp: true });

  const yZ = useTransform(scrollYProgress, [0.20, 0.36], [0, 800], { clamp: true });
  const opacityZ = useTransform(scrollYProgress, [0.20, 0.36], [1, 0], { clamp: true });
  const rotateZ = useTransform(scrollYProgress, [0.20, 0.36], [0, 20], { clamp: true });

  const lettersConfig = [
    { char: 'W', hover: { y: -20, scale: 1.05 }, style: { y: yW, opacity: opacityW, rotate: rotateW }, entrance: { delay: 0.1, initialRotate: -8 } },
    { char: 'E', hover: { y: 20, scale: 1.05 }, style: { y: yE, opacity: opacityE, rotate: rotateE }, entrance: { delay: 0.2, initialRotate: 5 } },
    { char: 'S', hover: { rotate: 15, scale: 1.05 }, style: { y: yS, opacity: opacityS, rotate: rotateS }, entrance: { delay: 0.3, initialRotate: -6 } },
    { char: 'H', hover: { rotate: -15, scale: 1.05 }, style: { y: yH, opacity: opacityH, rotate: rotateH }, entrance: { delay: 0.4, initialRotate: 3 } },
    { char: 'I', hover: { scale: 1.3, y: -5 }, style: { y: yI, opacity: opacityI, scale: scaleI }, entrance: { delay: 0.5, initialRotate: -4 } },
    { char: 'P', hover: { rotate: -20, y: 10 }, style: { y: yP, opacity: opacityP, rotate: rotateP }, entrance: { delay: 0.6, initialRotate: 7 } },
    { char: 'Z', hover: { x: 15, y: -15, rotate: 10 }, style: { y: yZ, opacity: opacityZ, rotate: rotateZ }, entrance: { delay: 0.7, initialRotate: -5 } },
  ];

  return (
    <div ref={containerRef} className="relative w-full">
      <section className="sticky top-0 w-full h-screen bg-[#05050a] flex items-center justify-center overflow-hidden">
        
        {/* Floating 3D Objects in Background */}
        <motion.div style={{ opacity: floatingOpacity }} className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <FloatingObjects />
        </motion.div>

        {/* Corner Elements */}
        
        <button 
          onClick={onBookCall}
          className="absolute bottom-6 left-6 md:bottom-8 md:left-8 font-label-mono text-[10px] md:text-xs text-white/35 hover:text-white tracking-widest transition-colors duration-300 z-10 uppercase focus:outline-none"
        >
          Book a Free Audit
        </button>
        
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 font-label-mono text-[10px] md:text-xs text-white/18 tracking-widest z-10">
          SCROLL &darr;
        </div>

        {/* Massive Center Text */}
        <div className="flex z-20 overflow-visible" style={{ gap: '0.02em' }}>
          {lettersConfig.map((letter, index) => (
            <motion.div
              key={`parent-${index}`}
              className="inline-block"
              style={{ ...letter.style }}
            >
              <motion.span
                className="inline-block font-black text-white cursor-default select-none"
                style={{ 
                  fontSize: 'clamp(48px, 12vw, 200px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  fontFamily: "'Clash Display', 'Space Grotesk', sans-serif"
                }}
                initial={{ y: -150, opacity: 0, rotate: letter.entrance.initialRotate }}
                animate={{ 
                  y: 0, 
                  opacity: 1, 
                  rotate: 0,
                  transition: { type: 'spring', stiffness: 120, damping: 14, mass: 1.2, delay: letter.entrance.delay }
                }}
                whileHover={{
                  ...letter.hover,
                  color: '#e0edff',
                  textShadow: '0 0 30px #2563eb, 0 0 60px #2563eb44',
                  transition: { type: 'spring', stiffness: 400, damping: 20 }
                }}
              >
                {letter.char}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Invisible scroll space to allow animation to complete */}
      <div className="h-screen w-full pointer-events-none bg-transparent"></div>
    </div>
  );
}

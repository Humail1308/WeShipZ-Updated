import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function AnimatedHeading({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  let globalIndex = 0;

  return (
    <h2 ref={ref} className={className} style={{ overflow: 'visible' }}>
      {text.split(' ').map((word, wordIndex, array) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => {
            const idx = globalIndex++;
            return (
              <motion.span
                key={charIndex}
                style={{ display: 'inline-block' }}
                initial={{ y: -80, opacity: 0, rotate: idx % 2 === 0 ? -6 : 5 }}
                animate={
                  isInView
                    ? { y: 0, opacity: 1, rotate: 0 }
                    : { y: -80, opacity: 0, rotate: idx % 2 === 0 ? -6 : 5 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 14,
                  mass: 1.1,
                  delay: idx * 0.04,
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex !== array.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.25em' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </h2>
  );
}

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function AnimatedHeading({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <h2 ref={ref} className={className} style={{ overflow: 'visible' }}>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} style={{ display: 'inline-block', width: '0.28em' }}>
              &nbsp;
            </span>
          );
        }
        return (
          <motion.span
            key={index}
            style={{ display: 'inline-block' }}
            initial={{ y: -80, opacity: 0, rotate: index % 2 === 0 ? -6 : 5 }}
            animate={
              isInView
                ? { y: 0, opacity: 1, rotate: 0 }
                : { y: -80, opacity: 0, rotate: index % 2 === 0 ? -6 : 5 }
            }
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 14,
              mass: 1.1,
              delay: index * 0.04,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </h2>
  );
}

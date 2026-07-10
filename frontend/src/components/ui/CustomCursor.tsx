import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  useEffect(() => {
    if (isTouchDevice()) return;
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-text') ||
        target.classList.contains('hover-button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return isTouchDevice() ? null : (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        transformOrigin: "top left"
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 1.15 : 1,
        filter: isHovering 
          ? 'drop-shadow(0 0 10px rgba(37,99,235,1)) drop-shadow(0 0 20px rgba(37,99,235,0.6))'
          : 'drop-shadow(0 0 6px rgba(37,99,235,0.8)) drop-shadow(0 0 12px rgba(37,99,235,0.4))'
      }}
      transition={{ 
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { duration: 0.15, ease: 'easeOut' },
        filter: { duration: 0.15, ease: 'easeOut' }
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path 
          d="M4 2 L4 18 L8 14 L12 22 L14 21 L10 13 L16 13 Z"
          fill="white"
          stroke="rgba(37,99,235,0.8)"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}

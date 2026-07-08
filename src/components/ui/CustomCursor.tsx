import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
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

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
      style={{
        boxShadow: isHovering ? '0 0 30px 10px rgba(37, 99, 235, 0.4)' : '0 0 20px 8px rgba(37, 99, 235, 0.6)',
        border: isHovering ? '1px solid rgba(37, 99, 235, 0.8)' : 'none',
        backgroundColor: isHovering ? 'transparent' : '#2563eb'
      }}
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30, 
        mass: 0.5,
        width: { duration: 0.2 },
        height: { duration: 0.2 }
      }}
    />
  );
}

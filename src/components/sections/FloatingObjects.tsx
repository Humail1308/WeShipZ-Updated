import { motion } from 'framer-motion';

const objects = [
  {
    id: 1, // Circuit chip - top left
    svg: (
      <svg viewBox="0 0 100 100" className="w-[50px] h-[50px] spin-css" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
        <rect x="20" y="20" width="60" height="60" rx="6" fill="#1e293b" stroke="#2563eb" strokeWidth="3" />
        <path d="M20 35h-10M20 50h-10M20 65h-10M80 35h10M80 50h10M80 65h10M35 20v-10M50 20v-10M65 20v-10M35 80v10M50 80v10M65 80v10" stroke="#2563eb" strokeWidth="3" />
        <rect x="40" y="40" width="20" height="20" rx="3" fill="#020617" />
      </svg>
    ),
    initialX: '15%', initialY: '20%'
  },
  {
    id: 2, // Holographic glass cube - top right
    svg: (
      <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] spin-y-css" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
        <polygon points="50,15 85,35 50,55 15,35" fill="rgba(37,99,235,0.1)" stroke="#2563eb" strokeWidth="2" />
        <polygon points="15,35 50,55 50,90 15,70" fill="rgba(15,23,42,0.8)" stroke="#3b82f6" strokeWidth="2" />
        <polygon points="85,35 50,55 50,90 85,70" fill="rgba(30,41,59,0.9)" stroke="#2563eb" strokeWidth="2" />
      </svg>
    ),
    initialX: '75%', initialY: '25%'
  },
  {
    id: 3, // Saturn sphere - bottom left
    svg: (
      <svg viewBox="0 0 100 100" className="w-[70px] h-[70px] spin-reverse-css" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
        <circle cx="50" cy="50" r="25" fill="#020617" />
        <ellipse cx="50" cy="50" rx="45" ry="10" fill="none" stroke="#2563eb" strokeWidth="2" transform="rotate(-15 50 50)" />
      </svg>
    ),
    initialX: '20%', initialY: '70%'
  },
  {
    id: 4, // Diamond - right side middle
    svg: (
      <svg viewBox="0 0 100 100" className="w-[45px] h-[45px] spin-y-css" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
        <polygon points="50,10 80,40 50,90 20,40" fill="#0f172a" stroke="#2563eb" strokeWidth="2" />
        <polygon points="50,10 80,40 50,45" fill="rgba(37,99,235,0.4)" />
        <polygon points="20,40 50,90 50,45" fill="#020617" />
      </svg>
    ),
    initialX: '85%', initialY: '50%'
  },
  {
    id: 5, // Rocket - top center
    svg: (
      <svg viewBox="0 0 100 100" className="w-[50px] h-[50px] spin-reverse-css" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
        <path d="M50 15 C60 35 65 55 65 75 L35 75 C35 55 40 35 50 15Z" fill="#1e293b" />
        <polygon points="35,75 20,90 35,65" fill="#0f172a" />
        <polygon points="65,75 80,90 65,65" fill="#0f172a" />
        <polygon points="45,75 55,75 50,95" fill="#3b82f6" />
      </svg>
    ),
    initialX: '50%', initialY: '15%'
  },
  {
    id: 6, // Hexagonal prism - bottom right
    svg: (
      <svg viewBox="0 0 100 100" className="w-[55px] h-[55px] spin-css" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
        <polygon points="50,15 80,30 80,60 50,75 20,60 20,30" fill="rgba(15,23,42,0.9)" stroke="#2563eb" strokeWidth="2" />
        <polygon points="50,15 80,30 50,45 20,30" fill="rgba(37,99,235,0.3)" />
        <polygon points="20,30 50,45 50,75 20,60" fill="#020617" />
        <line x1="50" y1="45" x2="50" y2="75" stroke="#3b82f6" strokeWidth="2" />
      </svg>
    ),
    initialX: '75%', initialY: '75%'
  }
];

export function FloatingObjects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
      {objects.map((obj, i) => (
        <motion.div
          key={obj.id}
          className="absolute"
          style={{
            left: obj.initialX,
            top: obj.initialY,
            opacity: 0.75,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 0.75,
            scale: 1,
            y: [-15, 15, -15],
          }}
          transition={{
            opacity: { duration: 1.5, delay: 1 + i * 0.2 },
            scale: { duration: 1.5, delay: 1 + i * 0.2 },
            y: {
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 + i * 0.2
            }
          }}
        >
          {obj.svg}
        </motion.div>
      ))}
    </div>
  );
}

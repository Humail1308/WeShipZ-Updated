import { motion } from 'framer-motion';

const chipSvg = (
  <svg viewBox="0 0 100 100" className="w-[50px] h-[50px]" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
    <rect x="20" y="20" width="60" height="60" rx="6" fill="#1e293b" stroke="#2563eb" strokeWidth="3" />
    <path d="M20 35h-10M20 50h-10M20 65h-10M80 35h10M80 50h10M80 65h10M35 20v-10M50 20v-10M65 20v-10M35 80v10M50 80v10M65 80v10" stroke="#2563eb" strokeWidth="3" />
    <rect x="40" y="40" width="20" height="20" rx="3" fill="#020617" />
  </svg>
);

const saturnSvg = (
  <svg viewBox="0 0 100 100" className="w-[70px] h-[70px]" style={{ filter: 'drop-shadow(0 0 12px #2563eb)' }}>
    <circle cx="50" cy="50" r="25" fill="#020617" />
    <ellipse cx="50" cy="50" rx="45" ry="10" fill="none" stroke="#2563eb" strokeWidth="2" transform="rotate(-15 50 50)" />
  </svg>
);

const objects = [
  { id: 1, svg: chipSvg,   x: '15%', y: '15%', dur: 3.5, dist: 10, delay: 0,   rot: 10 },
  { id: 2, svg: saturnSvg, x: '80%', y: '15%', dur: 4.2, dist: 15, delay: 0.5, rot: -8 },
  { id: 3, svg: chipSvg,   x: '50%', y: '10%', dur: 5.0, dist: 12, delay: 1.0, rot: 12 },
  { id: 4, svg: saturnSvg, x: '10%', y: '50%', dur: 6.0, dist: 18, delay: 1.5, rot: 15 },
  { id: 5, svg: chipSvg,   x: '85%', y: '55%', dur: 4.5, dist: 10, delay: 2.0, rot: -10 },
  { id: 6, svg: saturnSvg, x: '20%', y: '80%', dur: 7.0, dist: 20, delay: 2.5, rot: 14 },
  { id: 7, svg: chipSvg,   x: '75%', y: '75%', dur: 8.0, dist: 8,  delay: 3.0, rot: -12 }
];

export function FloatingObjects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
      {objects.map((obj) => (
        <motion.div
          key={obj.id}
          className="absolute"
          style={{
            left: obj.x,
            top: obj.y,
            opacity: 0.75,
          }}
          initial={{ opacity: 0, scale: 0.5, y: -obj.dist, rotate: -obj.rot }}
          animate={{
            opacity: 0.75,
            scale: 1,
            y: obj.dist,
            rotate: obj.rot,
          }}
          transition={{
            opacity: { duration: 1.5, delay: obj.delay },
            scale: { duration: 1.5, delay: obj.delay },
            y: {
              duration: obj.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: obj.delay,
              repeatType: "mirror"
            },
            rotate: {
              duration: obj.dur * 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: obj.delay,
              repeatType: "mirror"
            }
          }}
        >
          {obj.svg}
        </motion.div>
      ))}
    </div>
  );
}

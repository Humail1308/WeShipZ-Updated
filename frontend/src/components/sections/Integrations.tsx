import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";

import airtable from "../../assets/tools/airtable.png";
import calender from "../../assets/tools/calender.png";
import drive    from "../../assets/tools/drive.png";
import etsy     from "../../assets/tools/etsy.png";
import gmail    from "../../assets/tools/gmail.png";
import make     from "../../assets/tools/make.png";
import n8n      from "../../assets/tools/n8n.png";
import openai   from "../../assets/tools/openai.png";
import sheets   from "../../assets/tools/sheets.png";
import slack    from "../../assets/tools/slack.png";
import supabase from "../../assets/tools/supabase.png";
import vapi     from "../../assets/tools/vapi.png";
import whatsapp from "../../assets/tools/whatsapp.png";

const tools = [
  { name: "Airtable",        src: airtable  },
  { name: "Google Calendar", src: calender  },
  { name: "Google Drive",    src: drive     },
  { name: "Etsy",            src: etsy      },
  { name: "Gmail",           src: gmail     },
  { name: "Make",            src: make      },
  { name: "n8n",             src: n8n       },
  { name: "OpenAI",          src: openai    },
  { name: "Google Sheets",   src: sheets    },
  { name: "Slack",           src: slack     },
  { name: "Supabase",        src: supabase  },
  { name: "Vapi",            src: vapi      },
  { name: "WhatsApp",        src: whatsapp  },
];

interface IconProps {
  tool: (typeof tools)[0];
  angle: number;
  rx: number;
  ry: number;
  cx: number;
  cy: number;
}

function OrbitIcon({ tool, angle, rx, ry, cx, cy }: IconProps) {
  const x     = cx + Math.cos(angle) * rx;
  const y     = cy + Math.sin(angle) * ry;
  const depth = (Math.sin(angle) + 1) / 2;
  const scale   = 0.50 + 0.50 * depth;
  const opacity = 0.35 + 0.65 * depth;
  const size    = 96;
  const blur    = depth < 0.35 ? (0.35 - depth) * 5 : 0;

  return (
    <motion.div
      title={tool.name}
      whileHover={{ scale: scale * 1.12 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position:       "absolute",
        left:            x - size / 2,
        top:             y - size / 2,
        width:           size,
        height:          size,
        scale,
        opacity,
        zIndex:          Math.round(depth * 100),
        filter:          blur > 0 ? `blur(${blur}px)` : "none",
        borderRadius:    "20%",
        background:      "#ffffff",
        boxShadow:       depth > 0.70
          ? "0 10px 36px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)"
          : "0 2px 10px rgba(0,0,0,0.2)",
        overflow:        "hidden",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        cursor: 'none',
        willChange:      "transform",
      }}
    >
      <img
        src={tool.src}
        alt={tool.name}
        style={{ width: "68%", height: "68%", objectFit: "contain", display: "block" }}
      />
    </motion.div>
  );
}

export default function Integrations() {
  const orbitRef        = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 780, h: 780 });
  const angleRef        = useRef(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (orbitRef.current) {
        setDims({ w: orbitRef.current.offsetWidth, h: orbitRef.current.offsetHeight });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    angleRef.current += (delta / 1000) * 0.38;
    forceRender((n) => n + 1);
  });

  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const rx = Math.min(dims.w * 0.46, 380);
  const ry = rx * 0.30;

  const sorted = tools
    .map((tool, i) => ({
      tool,
      angle: (i / tools.length) * Math.PI * 2 + angleRef.current,
    }))
    .sort((a, b) => Math.sin(a.angle) - Math.sin(b.angle));

  return (
    <section style={{
      position: "relative", width: "100%", minHeight: "100vh",
      background: "#05050a", display: "flex",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", padding: "80px 6%", boxSizing: "border-box",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 55% at 28% 50%, rgba(99,102,241,0.07) 0%, transparent 65%)",
      }} />

      {/* Two column */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-[1300px] gap-12 lg:gap-20">

        {/* LEFT — Orbit */}
        <div ref={orbitRef} style={{
          position: "relative",
          width:  "clamp(280px, 80vw, 780px)",
          height: "clamp(280px, 80vw, 780px)",
          flexShrink: 0,
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
              fill="none" stroke="rgba(99,102,241,0.18)"
              strokeWidth="1.5" strokeDasharray="6 10" />
          </svg>
          {sorted.map(({ tool, angle }) => (
            <OrbitIcon key={tool.name} tool={tool} angle={angle} rx={rx} ry={ry} cx={cx} cy={cy} />
          ))}
        </div>

        {/* RIGHT — Text */}
        <div className="text-center lg:text-left flex-1 min-w-[300px] max-w-[520px] flex flex-col items-center lg:items-start">

          {/* Heading — "Supercharged." in blue */}
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800, lineHeight: 1.06,
              margin: "0 0 24px",
              fontFamily: "'Clash Display','Satoshi',sans-serif",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          >
            <span style={{ color: "#ffffff" }}>Your Stack.{"\n"}</span>
            <br />
            <span style={{ color: "#4b79ddff" }}>Supercharged.</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "rgba(255,255,255,0.45)",
              maxWidth: 460, margin: "0 0 40px", lineHeight: 1.75,
            }}
          >
            We connect every tool in your business and make them work as one intelligent system.
          </motion.p>

          {/* Tool chips */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10"
          >
            {tools.map((t) => (
              <span key={t.name} style={{
                fontSize: "0.82rem", color: "rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px", padding: "5px 16px", letterSpacing: "0.02em",
              }}>{t.name}</span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <motion.a href="#contact"
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(37,99,235,0.55)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-block", padding: "16px 44px",
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                color: "#fff", fontWeight: 700, fontSize: "1.05rem",
                borderRadius: "12px", textDecoration: "none",
                letterSpacing: "0.02em",
                boxShadow: "0 4px 24px rgba(37,99,235,0.35)", cursor: 'none',
              }}
            >
              Book a Free Call
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from '../../assets/logo-white.png';

export function Navbar({ onBookCall }: { onBookCall: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services",     href: "#services"    },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Results",      href: "#results"     },
    { label: "Reviews",      href: "#reviews"     },
    { label: "FAQ",          href: "#faq"         },
  ];

  return (
    <>
      {/* ── Floating navbar ── */}
      <div style={{
        position:   "fixed",
        top:         20,
        left:        0,
        right:       0,
        zIndex:      1000,
        display:     "flex",
        justifyContent: "center",
        padding:     "0 20px",
        pointerEvents: "none",
      }}>
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            pointerEvents:   "all",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            gap:             "40px",
            padding:         "12px 12px 12px 28px",
            borderRadius:    "999px",
            background:      scrolled
              ? "rgba(5,5,10,0.85)"
              : "rgba(5,5,10,0.65)",
            backdropFilter:  "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:          "1px solid rgba(37,99,235,0.25)",
            boxShadow:       scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(37,99,235,0.1)",
            transition:      "background 0.3s, box-shadow 0.3s",
            maxWidth:        760,
            width:           "100%",
          }}
        >
          {/* Logo */}
          <img 
            src={logoWhite}
            alt="WeShipZ"
            style={{
              width: 44,
              height: 44,
              objectFit: 'contain',
              mixBlendMode: 'screen',
              opacity: 0.9,
              cursor: 'pointer'
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Links — desktop */}
          <div style={{
            alignItems: "center",
            gap:        "4px",
          }} className="hidden md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize:      "0.92rem",
                  fontWeight:    500,
                  color:         "rgba(255,255,255,0.75)",
                  textDecoration:"none",
                  padding:       "6px 14px",
                  borderRadius:  "999px",
                  transition:    "color 0.2s, background 0.2s",
                  whiteSpace:    "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Book button */}
            <motion.button
              onClick={onBookCall}
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(37,99,235,0.5)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding:      "9px 22px",
                background:   "linear-gradient(135deg, #2563eb, #3b82f6)",
                color:        "#fff",
                fontWeight:   700,
                fontSize:     "0.875rem",
                borderRadius: "999px",
                border:       "none",
                cursor:       "pointer",
                whiteSpace:   "nowrap",
                boxShadow:    "0 2px 12px rgba(37,99,235,0.35)",
                letterSpacing:"0.02em",
              }}
            >
              Book a Free Call
            </motion.button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                background:   "rgba(255,255,255,0.07)",
                border:       "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width:        36,
                height:       36,
                cursor:       "pointer",
                alignItems:   "center",
                justifyContent:"center",
                flexDirection: "column",
                gap:          4,
                padding:      0,
              }}
              className="flex md:hidden"
            >
              {[0,1,2].map((i) => (
                <span key={i} style={{
                  display:      "block",
                  width:        16,
                  height:       1.5,
                  background:   "#fff",
                  borderRadius: 2,
                  transition:   "0.3s",
                }} />
              ))}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position:       "fixed",
              top:             80,
              left:            20,
              right:           20,
              zIndex:          999,
              background:      "rgba(5,5,10,0.95)",
              backdropFilter:  "blur(20px)",
              border:          "1px solid rgba(37,99,235,0.2)",
              borderRadius:    "20px",
              padding:         "20px",
              display:         "flex",
              flexDirection:   "column",
              gap:             "4px",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color:         "rgba(255,255,255,0.7)",
                  textDecoration:"none",
                  fontSize:      "1rem",
                  fontWeight:    500,
                  padding:       "12px 16px",
                  borderRadius:  "12px",
                  transition:    "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,99,235,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
type ModalType = 'privacy' | 'terms' | null;

export function Footer() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="relative w-full overflow-hidden border-t border-outline-variant/10 bg-background-elevated">
        {/* Big watermark */}
        <div className="font-display-xl text-[20vw] font-bold opacity-5 absolute -bottom-10 -left-10 select-none pointer-events-none">
          WESHIPZ
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-end px-gutter py-section-padding gap-12 md:gap-8 relative z-10 text-center md:text-left">
          {/* Left */}
          <div className="flex flex-col gap-6 w-full md:w-auto items-center md:items-start">
            <div className="font-label-mono text-label-mono text-on-surface mb-4 md:mb-8">
              © 2026 WESHIPZ. ALL RIGHTS RESERVED.
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <button
                onClick={() => setModal('privacy')}
                className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-electric-blue transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModal('terms')}
                className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-electric-blue transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6 w-full md:w-auto items-center md:items-end">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a
                href="https://www.linkedin.com/company/weshipz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-electric-blue transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/weshipz_"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-electric-blue transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com/weshipz_"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-electric-blue transition-colors"
              >
                Instagram
              </a>
            </div>
            <p className="font-body-md text-on-surface-variant text-center md:text-right mt-4 md:mt-0">
              Engineering growth through intelligent automation.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModal(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0d0d14',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '40px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setModal(null)}
                style={{
                  position: 'absolute', top: 16, right: 20,
                  background: 'transparent', border: 'none',
                  color: 'rgba(255,255,255,0.4)', fontSize: '1.4rem',
                  cursor: 'pointer', lineHeight: 1,
                }}
              >
                ×
              </button>

              {modal === 'privacy' && (
                <>
                  <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>
                    Privacy Policy
                  </h2>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p><strong style={{ color: '#fff' }}>Data Collection</strong><br />
                    WeShipZ collects only the information you provide via our contact forms - including your name, email address, and business details.</p>
                    <p><strong style={{ color: '#fff' }}>Data Usage</strong><br />
                    Your information is used solely to respond to your inquiries and deliver our services. We do not sell, share, or trade your data with any third parties.</p>
                    <p><strong style={{ color: '#fff' }}>Cookies</strong><br />
                    Our website may use essential cookies for basic functionality. No tracking or advertising cookies are used.</p>
                    <p><strong style={{ color: '#fff' }}>Contact</strong><br />
                    For any privacy-related questions, reach us at weshipzhq@gmail.com</p>
                  </div>
                </>
              )}

              {modal === 'terms' && (
                <>
                  <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>
                    Terms of Service
                  </h2>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p><strong style={{ color: '#fff' }}>Services</strong><br />
                    WeShipZ provides custom AI automation systems, workflow engineering, and motion ad creative production on a retainer basis.</p>
                    <p><strong style={{ color: '#fff' }}>Ownership</strong><br />
                    All automation systems built by WeShipZ are custom and non-transferable without written consent. Client retains ownership of their data and business logic.</p>
                    <p><strong style={{ color: '#fff' }}>Payments</strong><br />
                    Payments are non-refundable once work has commenced. All pricing is agreed upon before project initiation.</p>
                    <p><strong style={{ color: '#fff' }}>Portfolio</strong><br />
                    WeShipZ retains the right to showcase completed work in our portfolio unless otherwise agreed in writing.</p>
                    <p><strong style={{ color: '#fff' }}>Contact</strong><br />
                    For any questions, reach us at weshipzhq@gmail.com</p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

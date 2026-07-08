import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import  Integrations  from '../components/sections/Integrations';
import { Services } from '../components/sections/Services';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Results } from '../components/sections/Results';
import { Reviews } from '../components/sections/Reviews';
import { Pricing } from '../components/sections/Pricing';
import { FAQ } from '../components/sections/FAQ';
import { ContactModal } from '../components/ui/ContactModal';
import { Chatbot } from '../components/ui/Chatbot';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar onBookCall={handleOpenModal} />
      
      <main>
        <Hero onBookCall={handleOpenModal} />
        <Integrations />
        <Services />
        <HowItWorks />
        <Results />
        <Reviews />
        <Pricing onBookCall={handleOpenModal} />
        <FAQ />
        
        {/* Final CTA */}
        <section className="py-section-padding px-gutter text-center relative overflow-hidden">
          <div className="absolute inset-0 radial-glow opacity-50 pointer-events-none"></div>
          <div className="max-w-container-max mx-auto relative z-10">
            <h2 className="font-display-xl text-display-xl-mobile md:text-display-xl mb-12">Ready to put your business on <span className="text-electric-blue italic">autopilot?</span></h2>
            <button 
              onClick={handleOpenModal}
              className="px-12 py-6 bg-electric-blue text-white rounded-lg font-headline-md text-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(59,130,246,0.4)]"
            >
              Book a Free Call
            </button>
            <p className="mt-8 font-label-mono text-label-mono text-on-surface-variant/40">NO STRINGS ATTACHED. JUST COLD, HARD STRATEGY.</p>
          </div>
        </section>
      </main>

      <Footer />
      
      <WhatsAppButton />
      <Chatbot />
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

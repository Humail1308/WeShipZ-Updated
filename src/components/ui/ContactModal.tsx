import { motion, AnimatePresence } from 'framer-motion';

export function ContactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl max-w-md w-full z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h3 className="font-headline-md text-3xl mb-2 text-gray-900">Get Your Free Quote</h3>
            <p className="text-gray-600 mb-6 text-sm">Fill out the form below and we'll be in touch within 24 hours to discuss your automation needs.</p>
            
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Your Name" required className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors" />
              <input type="email" placeholder="Email Address" required className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors" />
              <input type="tel" placeholder="WhatsApp Number" required className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors" />
              <select required defaultValue="" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors appearance-none">
                <option value="" disabled>What do you want to automate?</option>
                <option value="AI Customer Support">AI Customer Support</option>
                <option value="Lead Scoring">Lead Scoring</option>
                <option value="Data Engines">Data Engines</option>
                <option value="Custom Internal Tools">Custom Internal Tools</option>
              </select>
              <button type="submit" className="mt-4 bg-electric-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_25px_rgba(59,130,246,0.4)] hover:-translate-y-1">
                Submit Details
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

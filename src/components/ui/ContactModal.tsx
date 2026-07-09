import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countries } from './countries';

export function ContactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  
  const validateEmail = (val: string) => {
    if (!val) {
      setEmailValid(null);
      return null;
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/i.test(val);
    setEmailValid(isValid);
    return isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (emailValid !== null) validateEmail(val);
  };

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPhoneDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(phoneSearch.toLowerCase()) || 
    c.dial_code.includes(phoneSearch)
  );

  const [service, setService] = useState('');

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
            className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl max-w-md w-full z-10 max-h-[90vh] overflow-y-auto"
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
              {/* Name */}
              <input 
                type="text" 
                placeholder="e.g. Leonardo DiCaprio" 
                required 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors" 
              />
              
              {/* Email */}
              <div className="flex flex-col gap-1">
                <input 
                  type="email" 
                  placeholder="e.g. leonardo@gmail.com" 
                  required 
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 outline-none transition-colors focus:bg-white ${
                    emailValid === false ? 'border-red-500' : emailValid === true ? 'border-green-500' : 'border-gray-200 focus:border-electric-blue'
                  }`} 
                />
                {emailValid === false && (
                  <span className="text-[#ef4444] text-[0.75rem] ml-1">Please enter a valid email address</span>
                )}
              </div>
              
              {/* WhatsApp */}
              <div className="flex gap-2 relative">
                <div className="relative" ref={dropdownRef}>
                  <button 
                    type="button"
                    onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                    className="flex items-center justify-between w-[100px] h-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors"
                  >
                    <span>{selectedCountry.flag} {selectedCountry.dial_code}</span>
                  </button>
                  
                  {phoneDropdownOpen && (
                    <div className="absolute top-[calc(100%+4px)] left-0 w-[240px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-100">
                        <input 
                          type="text" 
                          placeholder="Search country..." 
                          value={phoneSearch}
                          onChange={(e) => setPhoneSearch(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-electric-blue"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-[200px] overflow-y-auto">
                        {filteredCountries.map(c => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setPhoneDropdownOpen(false);
                              setPhoneSearch('');
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between text-sm text-gray-900 transition-colors"
                          >
                            <span>{c.flag} {c.name}</span>
                            <span className="text-gray-500">{c.dial_code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <input 
                  type="text" 
                  placeholder="3XX XXXXXXX" 
                  required 
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    e.target.value = val;
                  }}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors" 
                />
              </div>
              
              {/* Service */}
              <div className="flex flex-col gap-4">
                <select 
                  required 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors appearance-none"
                >
                  <option value="" disabled>What do you want to automate?</option>
                  <option value="AI Customer Support">AI Customer Support</option>
                  <option value="Lead Scoring">Lead Scoring</option>
                  <option value="Data Engines">Data Engines</option>
                  <option value="Custom Internal Tools">Custom Internal Tools</option>
                  <option value="Motion & Ad Creatives">Motion & Ad Creatives</option>
                  <option value="Other">Other</option>
                </select>
                
                {service === 'Other' && (
                  <textarea 
                    placeholder="Tell us what you'd like to automate or achieve..."
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors resize-none h-[100px]"
                    required
                  />
                )}
              </div>
              
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

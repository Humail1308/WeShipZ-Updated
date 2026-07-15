import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countries } from './countries';

export function ContactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Step 1
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [phone, setPhone] = useState('');
  
  // Step 2
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [companySize, setCompanySize] = useState('');
  
  // Step 3
  const [service, setService] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep('form');
        setFormStep(1);
        setName('');
        setEmail('');
        setEmailValid(null);
        setPhone('');
        setCompanyName('');
        setWebsite('');
        setCompanySize('');
        setService('');
        setProblemDescription('');
        setFormError('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPhoneDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(phoneSearch.toLowerCase()) || 
    c.dial_code.includes(phoneSearch)
  );

  const handleNextStep1 = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || emailValid === false) {
      setFormError('Please fill in all required contact fields correctly.');
      return;
    }
    setFormError('');
    setFormStep(2);
  };

  const handleNextStep2 = () => {
    if (!companyName.trim() || !companySize) {
      setFormError('Please fill in the required business details.');
      return;
    }
    setFormError('');
    setFormStep(3);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || (service === 'Other' && !problemDescription.trim())) {
      setFormError('Please complete all required project details.');
      return;
    }
    
    setFormError('');
    setIsSubmitting(true);
    
    try {
      const res = await fetch('https://weshipz-updated-production.up.railway.app/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          whatsapp: `${selectedCountry.dial_code} ${phone}`,
          companyName,
          website,
          companySize,
          service,
          message: problemDescription
        })
      });
      if (!res.ok) throw new Error('Submission failed');
      setStep('success');
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setFormError('Could not submit details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            {step === 'form' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-6">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Step {formStep} of 3</p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${formStep >= num ? 'bg-electric-blue' : 'bg-gray-100'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="font-headline-md text-3xl mb-2 text-gray-900">Get Your Free Quote</h3>
                <p className="text-gray-600 mb-6 text-sm">Fill out the form below and we'll be in touch within 24 hours to discuss your automation needs.</p>
                
                {formError && (
                  <div className="mb-4 text-[#ef4444] text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    {formError}
                  </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                  
                  <AnimatePresence mode="wait">
                    {formStep === 1 && (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                      >
                        {/* Name */}
                        <input 
                          type="text" 
                          placeholder="e.g. Leonardo DiCaprio" 
                          required 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isSubmitting}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors disabled:opacity-50" 
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
                            disabled={isSubmitting}
                            className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 outline-none transition-colors focus:bg-white disabled:opacity-50 ${
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
                              disabled={isSubmitting}
                              onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                              className="flex items-center justify-between w-[100px] h-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors disabled:opacity-50"
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
                            value={phone}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              setPhone(val);
                            }}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors disabled:opacity-50" 
                          />
                        </div>

                        <button 
                          type="button" 
                          onClick={handleNextStep1}
                          className="mt-4 bg-electric-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_25px_rgba(59,130,246,0.4)] hover:-translate-y-1"
                        >
                          Next
                        </button>
                      </motion.div>
                    )}

                    {formStep === 2 && (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                      >
                        <input 
                          type="text" 
                          placeholder="Business/Company Name" 
                          required 
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors" 
                        />
                        
                        <input 
                          type="url" 
                          placeholder="e.g. yourbusiness.com (optional)" 
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors" 
                        />

                        <select 
                          required 
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors appearance-none"
                        >
                          <option value="" disabled>Company Size</option>
                          <option value="Just me">Just me</option>
                          <option value="2-10 people">2-10 people</option>
                          <option value="11-50 people">11-50 people</option>
                          <option value="50+ people">50+ people</option>
                        </select>

                        <div className="flex gap-3 mt-4">
                          <button 
                            type="button" 
                            onClick={() => setFormStep(1)}
                            className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold py-4 rounded-xl transition-all"
                          >
                            Back
                          </button>
                          <button 
                            type="button" 
                            onClick={handleNextStep2}
                            className="flex-[2] bg-electric-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_25px_rgba(59,130,246,0.4)] hover:-translate-y-1"
                          >
                            Next
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {formStep === 3 && (
                      <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                      >
                        <div className="mb-2">
                          <span className="text-gray-900 font-bold mb-3 block">What do you want to automate?</span>
                          <div className="flex flex-wrap gap-2">
                            {['AI Customer Support', 'Lead Scoring', 'Data Engines', 'Custom Internal Tools', 'Motion & Ad Creatives'].map(option => (
                              <button
                                key={option}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => setService(option)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                                  service === option 
                                    ? 'bg-electric-blue border-electric-blue text-white' 
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-electric-blue hover:bg-blue-50'
                                } disabled:opacity-50`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <textarea 
                          placeholder="e.g. We're losing leads because follow-ups take too long..."
                          value={problemDescription}
                          onChange={(e) => setProblemDescription(e.target.value)}
                          disabled={isSubmitting}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-electric-blue focus:bg-white transition-colors resize-none h-[120px] disabled:opacity-50"
                          required={service === 'Other'}
                        />

                        <div className="flex gap-3 mt-4">
                          <button 
                            type="button" 
                            disabled={isSubmitting}
                            onClick={() => setFormStep(2)}
                            className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold py-4 rounded-xl transition-all disabled:opacity-50"
                          >
                            Back
                          </button>
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-[2] bg-electric-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_25px_rgba(59,130,246,0.4)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="flex flex-col items-center justify-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-green-500 text-5xl">check</span>
                </div>
                <h3 className="font-headline-md text-3xl mb-2 text-gray-900 text-center">Request Submitted!</h3>
                <p className="text-gray-500 text-center">We'll be in touch within 24 hours.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

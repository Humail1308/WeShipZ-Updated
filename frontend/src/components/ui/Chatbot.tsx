import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getResponse = (input: string) => {
  const msg = input.toLowerCase();
  
  if(msg.includes('price') || msg.includes('cost') || 
     msg.includes('rate') || msg.includes('how much') ||
     msg.includes('charges') || msg.includes('fee')) {
    return "Our packages start from $350 for Starter, $500 for Growth, and Custom Quote for Scale. Pakistan-based clients get special PKR pricing. Book a free audit to get an exact quote for your needs!";
  }
  
  if(msg.includes('service') || msg.includes('what do you') || 
     msg.includes('offer') || msg.includes('provide') ||
     msg.includes('build') || msg.includes('make')) {
    return "We offer: AI Automation & Workflows, Lead Capture Systems, AI Customer Support, Motion & Ad Creatives, Custom Internal Tools, and Data Engines. Which one interests you?";
  }
  
  if(msg.includes('time') || msg.includes('long') || 
     msg.includes('days') || msg.includes('weeks') ||
     msg.includes('deliver') || msg.includes('fast')) {
    return "Most automation systems are delivered in 2-4 weeks. Simple workflows can be ready in under a week. We move fast!";
  }
  
  if(msg.includes('pakistan') || msg.includes('karachi') || 
     msg.includes('pkr') || msg.includes('local')) {
    return "Yes! We're based in Karachi, Pakistan 🇵🇰 We work with local and international clients. PKR pricing available for Pakistan-based businesses.";
  }
  
  if(msg.includes('whatsapp') || msg.includes('contact') || 
     msg.includes('reach') || msg.includes('talk') ||
     msg.includes('call') || msg.includes('speak')) {
    return "You can reach us on WhatsApp directly or book a free audit call through our website. We typically respond within a few hours!";
  }
  
  if(msg.includes('portfolio') || msg.includes('example') || 
     msg.includes('work') || msg.includes('sample') ||
     msg.includes('previous') || msg.includes('done')) {
    return "Check out our Portfolio section on this page! We've built an E-Commerce Listing Generator, Resume Rewriter, and Automated Shorts Creator. More projects coming soon!";
  }
  
  if(msg.includes('automation') || msg.includes('automate') || 
     msg.includes('workflow') || msg.includes('n8n') ||
     msg.includes('make') || msg.includes('zapier')) {
    return "We specialize in building custom AI automation workflows using n8n, Make, OpenAI, and more. Tell us what you want to automate and we'll engineer the perfect solution!";
  }
  
  if(msg.includes('ai') || msg.includes('artificial') || 
     msg.includes('intelligent') || msg.includes('chatbot') ||
     msg.includes('bot')) {
    return "We build custom AI systems — not just generic chatbots. Think intelligent lead capture, smart customer support, AI-powered content pipelines, and more. All custom-engineered for your business.";
  }
  
  if(msg.includes('hello') || msg.includes('hi') || 
     msg.includes('hey') || msg.includes('salam') ||
     msg.includes('assalam')) {
    return "Hey! 👋 Welcome to WeShipZ. I'm here to help you learn about our AI automation services. What would you like to know — our services, pricing, or how to get started?";
  }
  
  if(msg.includes('start') || msg.includes('begin') || 
     msg.includes('get started') || msg.includes('how to')) {
    return "Getting started is simple! 1) Book a free audit call 2) We analyze your business 3) We build your custom system. Click 'Book a Free Audit' to begin!";
  }
  
  if(msg.includes('refund') || msg.includes('guarantee') || 
     msg.includes('money back') || msg.includes('cancel')) {
    return "We work on a retainer basis with milestone-based delivery. All terms are agreed before work begins. We're committed to delivering results!";
  }

  // Default response
  return "Sorry, I don't have info on that — but our team definitely can help! Book a free audit call for a personalized answer.";
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hey! I'm the WESHIPZ support bot. Want to see how much manual work we can save you?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot reply
    setTimeout(() => {
      const botReply = getResponse(userMsg);
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[90vw] md:w-80 max-w-[360px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-50"
        >
          <div className="p-4 bg-electric-blue flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-label-mono text-[10px] text-white tracking-widest uppercase">WESHIPZ AI</span>
            </div>
            <span className="material-symbols-outlined text-white text-sm cursor-pointer hover:bg-white/20 rounded-full p-1 transition-colors" onClick={() => setIsOpen(false)}>close</span>
          </div>
          
          <div className="p-4 h-64 md:h-80 overflow-y-auto space-y-4 text-sm bg-gray-50 flex flex-col">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${msg.role === 'bot' ? 'bg-white border border-gray-100 text-gray-800 rounded-tr-xl self-start mr-8' : 'bg-electric-blue text-white rounded-tl-xl self-end ml-8'} p-3 rounded-b-xl shadow-sm leading-relaxed`}
              >
                {msg.content}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-electric-blue text-white p-3 rounded-tr-xl rounded-b-xl shadow-sm self-start mr-8 flex gap-1 items-center h-[44px]"
              >
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                />
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
            <input 
              className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue text-sm w-full placeholder:text-gray-400 outline-none text-gray-800 transition-all" 
              placeholder="Type a message..." 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-electric-blue text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

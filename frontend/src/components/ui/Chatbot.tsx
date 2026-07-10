import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hey! I'm the WESHIPZ support bot. Want to see how much manual work we can save you?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    
    // Simulate bot reply
    setTimeout(() => {
      let botReply = "That sounds interesting. Let's book a free audit to discuss further!";
      if (userMsg.toLowerCase().includes('audit')) botReply = "Great! You can book an audit using the button on the top right.";
      if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('cost')) botReply = "Our pricing starts at $2,500/setup. Check out our Pricing section for more details.";
      
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
    }, 1000);
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

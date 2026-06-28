import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const AgriBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am the ISRO Agri-Bot. Ask me about moisture stress, irrigation, or crop health in the pilot region.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    
    // Mock bot response after a delay
    setTimeout(() => {
      let reply = "I'm analyzing the spatial data...";
      const query = input.toLowerCase();
      
      if (query.includes('stress') || query.includes('highest')) {
        reply = "Based on the latest Sentinel-1 SAR backscatter, the Southeast grid of Karnal is showing 'Severe' moisture stress. I recommend prioritizing irrigation there.";
      } else if (query.includes('water') || query.includes('irrigate')) {
        reply = "The current average water deficit across the pilot area is 18.5mm. Focus on the Wheat crops currently in the 'Tillering' stage for maximum yield protection.";
      } else if (query.includes('yield') || query.includes('loss')) {
        reply = "If the current water deficit persists, our models predict an 11% yield drop, roughly equating to ₹4.2 Lakhs in economic impact for the 12,500ha command area.";
      } else {
        reply = "I'm pulling up that data. The Random Forest classification shows Wheat is the dominant crop with 92% confidence.";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999,
          background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%',
          width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)', cursor: 'pointer', transition: 'transform 0.2s'
        }}
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999,
      width: '350px', height: '500px', background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bot color="#60a5fa" size={24} />
          <strong style={{ color: 'white', fontSize: '1rem' }}>Agri-Bot Assistant</strong>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%', background: msg.role === 'user' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
            padding: '10px 14px', borderRadius: '12px', fontSize: '0.9rem', color: 'white',
            borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
            borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '12px',
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about crop health..."
          style={{
            flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '10px', color: 'white', outline: 'none'
          }}
        />
        <button onClick={handleSend} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '0 15px', cursor: 'pointer' }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AgriBot;

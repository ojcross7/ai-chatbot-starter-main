'use client';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { MdClose, MdChatBubble } from 'react-icons/md';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I assist you today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: input }], stream: false }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      const { result } = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: result }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble. Please try again.' }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-xs md:max-w-sm lg:max-w-md">
      {/* Minimize / Expand Button */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 fixed bottom-4 right-4"
      >
        {isMinimized ? <MdChatBubble size={24} /> : <MdClose size={24} />}
      </button>

      {/* Chat Window */}
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col h-[400px] w-full max-w-xs md:max-w-sm lg:max-w-md"
        >
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 text-center font-semibold">AI Chatbot</div>

          {/* Messages Display */}
          <div className="p-4 flex-1 overflow-y-auto">
            {messages.map((msg, index) => (
              <motion.div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isLoading && <div className="text-gray-500">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="border-t p-2 flex items-center">
            <input
              type="text"
              className="flex-1 px-2 py-1 border rounded-md"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="ml-2 text-blue-500 disabled:opacity-50" disabled={isLoading}>
              <AiOutlineSend size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;

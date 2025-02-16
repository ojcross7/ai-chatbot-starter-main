'use client';

import { useState, useEffect, useRef } from 'react';
import { AiOutlineSend, AiOutlineMinus, AiOutlineExpand, AiOutlineMessage } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  status?: 'loading' | 'complete';
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      sender: 'bot',
      text: 'Hello! I can access real-time web information. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: '',
        status: 'loading',
      },
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages
            .filter((m) => m.status !== 'loading')
            .map((m) => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text,
            }))
            .concat({ role: 'user', content: input.trim() }),
        }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;

          const jsonData = line.replace('data: ', '').trim();
          if (jsonData === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonData);
            botResponse += parsed;

            setMessages((prev) =>
              prev.map((msg) =>
                msg.status === 'loading' ? { ...msg, text: botResponse } : msg
              )
            );
          } catch (error) {
            console.error('Error parsing chunk:', error);
          }
        }
      }

      setMessages((prev) =>
        prev.map((msg) => (msg.status === 'loading' ? { ...msg, status: 'complete' } : msg))
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.status === 'loading'
            ? { ...msg, text: 'Unable to generate response. Please try again.', status: 'complete' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return isOpen ? (
    <motion.div
      className={`fixed bottom-4 right-4 ${
        isExpanded ? 'w-[800px] h-[600px]' : 'w-96 h-[500px]'
      } bg-white shadow-xl rounded-xl flex flex-col z-50`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center rounded-t-xl">
        <h1 className="font-semibold">AI Assistant</h1>
        <div className="flex gap-2">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-white/10 p-1 rounded transition-colors">
            <AiOutlineExpand size={18} />
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
            <AiOutlineMinus size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                {message.status === 'loading' && <div className="mt-2">...</div>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button onClick={handleSend} disabled={isLoading} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50">
            <AiOutlineSend size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all">
      <AiOutlineMessage size={24} />
    </motion.button>
  );
}

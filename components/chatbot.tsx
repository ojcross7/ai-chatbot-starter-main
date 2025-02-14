'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user's message to the conversation
    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Construct the payload
    const payload = {
      messages: [
        ...messages.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
        { role: 'user', content: input },
      ],
      stream: true,
    };

    try {
      // Make the API call to your route
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      const botMessage = { sender: 'bot', text: '' }; // Changed to const
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      // Read the streaming response
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        const chunk = decoder.decode(value);
        // Process the SSE data
        const lines = chunk
          .split('\n')
          .filter((line) => line.trim() !== '');
        for (const line of lines) {
          const message = line.replace(/^data: /, '');
          // Check for [DONE] message
          if (message === '[DONE]') {
            setIsLoading(false);
            break;
          }
          // Update bot's message
          botMessage.text += JSON.parse(message);
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = botMessage;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Oops! Something went wrong. Please try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-lg font-semibold">Chat with us!</h2>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              } rounded-lg p-2 max-w-xs`}
            >
              <p>{msg.text}</p>
            </motion.div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-2 flex justify-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-200 rounded-lg p-2 max-w-xs"
            >
              <p>Typing...</p>
            </motion.div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center border-t p-2">
        <input
          type="text"
          className="flex-1 px-2 py-1 border rounded-md focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button
          onClick={handleSend}
          className={`ml-2 text-blue-500 hover:text-blue-600 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          <AiOutlineSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

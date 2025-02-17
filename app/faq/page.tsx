'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How do I use this chatbot?',
    answer: 'Simply type your question in the input box and press send. The chatbot will respond in real-time.',
  },
  {
    question: 'What kind of information can the chatbot provide?',
    answer: 'The chatbot can provide general information, real-time updates, and assist with various queries.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we prioritize user data privacy and security, ensuring compliance with industry standards.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 transition"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="p-4 border-t bg-white">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Chatbot from '@/components/chatbot';
import Footer from '@/components/Footer';

const MyComponent = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Navigation */}
      <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="text-xl font-bold">
          <Link href="/">My Website | ChatBot</Link>
        </div>
        <div className="space-x-6">
          <Link href="#about" className="hover:text-blue-500">
            About
          </Link>
          <Link href="#features" className="hover:text-blue-500">
            Features
          </Link>
          <Link href="#contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 md:py-32 bg-blue-500 text-white mt-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold"
        >
          Welcome to My Website & AI ChatBot
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-xl"
        >
          Discover innovative solutions crafted just for you.
        </motion.p>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="text-center mb-10 px-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold"
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-lg text-gray-700"
          >
            I am passionate and dedicated to delivering excellence in every project.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 text-lg text-gray-700"
          >
            My mission is to drive innovation and help businesses thrive in a digital world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-left max-w-3xl mx-auto space-y-6"
          >
            <p>
              <strong>Mission:</strong> To provide cutting-edge solutions that empower 
              businesses to reach their full potential.
            </p>
            <p>
              <strong>Vision:</strong> To be a global leader in technology services, 
              recognized for my commitment to quality and innovation.
            </p>
            <p>
              With expertise across various industries, I tailor my services to meet 
              your unique needs, ensuring you stay ahead in a competitive landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-100">
        <div className="text-center mb-10 px-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold"
          >
            Features
          </motion.h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Custom Software Development</h3>
              <p className="text-gray-700">
                Crafting bespoke software solutions that align perfectly 
                with your business goals and operational needs.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Cloud Integration</h3>
              <p className="text-gray-700">
                Seamless integration of cloud services to enhance scalability, 
                flexibility, and accessibility of your systems.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Data Analytics</h3>
              <p className="text-gray-700">
                Utilizing advanced analytics to transform your data into
                actionable insights for strategic decision-making.
              </p>
            </motion.div>
            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Cybersecurity Solutions</h3>
              <p className="text-gray-700">
                Implementing robust security measures to protect 
                your digital assets from evolving cyber threats.
              </p>
            </motion.div>
            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Mobile App Development</h3>
              <p className="text-gray-700">
                Creating intuitive and engaging mobile applications 
                that enhance customer engagement and grow your business.
              </p>
            </motion.div>
            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">IT Consulting</h3>
              <p className="text-gray-700">
                Providing expert guidance to optimize your IT infrastructure
                and align it with your strategic objectives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold"
        >
          Contact me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lg text-gray-700 max-w-xl mx-auto"
        >
          <p>
            I am here to answer any questions you might have. 
            Reach out to me, and I'll respond as soon as I can.
          </p>
          <div className="mt-6 space-y-2">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:michaelogyiri1@gmail.com" className="text-blue-600 hover:underline">
                michaelogyiri1@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+233598160082" className="text-blue-600 hover:underline">
                +233 (598) 160-082
              </a>
            </p>
          </div>
        </motion.div>
        {/* ... (keep existing form content) */}
      </section>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default MyComponent;
'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} My Web ChatBot. All rights reserved.</p>
        </div>
        <div className="space-x-6">
          <Link href={'/privacy' as Route} className="hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link href={'/terms' as Route} className="hover:text-gray-400">
            Terms of Service
          </Link>
          <Link href="#contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

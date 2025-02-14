'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 bg-white/90 backdrop-blur-md border-b z-50 dark:bg-gray-800">
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CareerAI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </Link>

            <Link href="/signin" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/features" className="block text-gray-600 hover:text-blue-600">
                Features
              </Link>
              <Link href="/pricing" className="block text-gray-600 hover:text-blue-600">
                Pricing
              </Link>

              <Link href="/signin" className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 block text-center">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

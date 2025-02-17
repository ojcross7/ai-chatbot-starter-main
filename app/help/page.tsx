'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
      <p className="mb-4">Need assistance? Here are some ways to get help:</p>

      <div className="space-y-6">
        <div className="p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">📖 Documentation</h2>
          <p>
            Visit our <a href="/docs" className="text-blue-600 underline">documentation</a> for more details.
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">✉️ Contact Support</h2>
          <p>
            Reach out to us at{' '}
            <a href="mailto:support@example.com" className="text-blue-600 underline">
              support@example.com
            </a>.
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">💬 Community Forum</h2>
          <p>
            Join our <a href="/community" className="text-blue-600 underline">community forum</a> to connect with others.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600">Looking for answers?</p>
        <Link
          href="/FAQ"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Check the FAQ Page
        </Link>
      </div>
    </div>
  );
}

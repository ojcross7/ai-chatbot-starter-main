import { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🆘 Help & Support</h1>
      <p className="text-lg text-gray-700 mb-6">
        Need assistance? Here you'll find resources, guides, and support for troubleshooting common issues.
      </p>

      {/* Quick Links */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">🔗 Quick Links</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <Link href="/faq" className="text-blue-500 hover:underline">
              Frequently Asked Questions (FAQ)
            </Link>
          </li>
          <li>
            <Link href="/docs" className="text-blue-500 hover:underline">
              📖 Documentation & User Guide
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-blue-500 hover:underline">
              📩 Contact Support
            </Link>
          </li>
        </ul>
      </div>

      {/* Troubleshooting Guide */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">⚙️ Troubleshooting Guide</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">❓ Why isn't my chatbot responding?</h3>
            <p className="text-gray-700">
              Ensure your API key is correct and the chatbot service is running. Visit{' '}
              <Link href="/docs/chatbot-setup" className="text-blue-500 hover:underline">
                Chatbot Setup Guide
              </Link>{' '}
              for more details.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">❓ How do I integrate this with my website?</h3>
            <p className="text-gray-700">
              Check our{' '}
              <Link href="/docs/integration" className="text-blue-500 hover:underline">
                Integration Guide
              </Link>{' '}
              for step-by-step instructions.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">❓ I'm getting API errors. What should I do?</h3>
            <p className="text-gray-700">
              Visit{' '}
              <Link href="/docs/api-reference" className="text-blue-500 hover:underline">
                API Reference
              </Link>{' '}
              for error codes and solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Sample Documents Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">📂 Sample Documents</h2>
        <p className="text-gray-700 mb-4">Download sample documents to help you get started.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <a href="/files/sample-config.json" download className="text-blue-500 hover:underline">
              🔹 Sample Configuration File (JSON)
            </a>
          </li>
          <li>
            <a href="/files/sample-api-request.txt" download className="text-blue-500 hover:underline">
              🔹 API Request Sample
            </a>
          </li>
          <li>
            <a href="/files/sample-integration-guide.pdf" download className="text-blue-500 hover:underline">
              🔹 Integration Guide (PDF)
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">💬 Need More Help?</h2>
        <p className="text-gray-700">
          If you need further assistance, feel free to{' '}
          <Link href="/contact" className="text-blue-500 hover:underline">
            Contact Support
          </Link>.
        </p>
      </div>
    </div>
  );
}

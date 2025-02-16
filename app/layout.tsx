import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { GeistSans, GeistMono } from 'geist/font'

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: 'CareerAI - Empower Your Career',
  description: 'Navigate and enhance your professional journey with AI-powered insights.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'CareerAI',
    description: 'Empower your career path with AI-driven guidance.',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CareerAI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
    title: 'CareerAI',
    description: 'Empower your career path with AI-driven guidance.',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Header />
        <main className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
          {children}
        </main>
        
        {/* Optional: Add footer or analytics scripts here */}
      </body>
    </html>
  )
}
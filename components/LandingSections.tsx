'use client'

import { motion } from 'framer-motion'
import { Briefcase, Star, MessageSquare, Rocket } from 'lucide-react'

const features = [
  {
    icon: <Briefcase size={40} />,
    title: "Smart Job Matching",
    description: "AI-powered job recommendations based on your skills and preferences"
  },
  {
    icon: <Star size={40} />,
    title: "Resume Optimization",
    description: "Get real-time feedback to improve your resume's ATS score"
  },
  {
    icon: <MessageSquare size={40} />,
    title: "Interview Prep",
    description: "Practice with AI-powered mock interviews and feedback"
  },
  {
    icon: <Rocket size={40} />,
    title: "Career Growth",
    description: "Personalized learning paths to advance your career"
  }
]

export default function LandingSections() {
  return (
    <section className="py-20">
      {/* Features Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose CareerAI?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-blue-50 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Start Your Free Trial Today</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of professionals who have accelerated their career growth with CareerAI
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  )
}
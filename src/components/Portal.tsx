'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  DocumentArrowUpIcon,
  ChartBarSquareIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function Portal() {
  const portalFeatures = [
    {
      icon: DocumentArrowUpIcon,
      title: "Upload DPR",
      description: "Submit your project documents for AI-powered assessment"
    },
    {
      icon: ChartBarSquareIcon,
      title: "View Results",
      description: "Access detailed analysis reports and risk predictions"
    },
    {
      icon: UserGroupIcon,
      title: "Collaborate",
      description: "Share insights with stakeholders and team members"
    }
  ];

  return (
    <section id="portal" className="relative bg-gray-900 py-20">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Assessment Portal
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Access the DPR assessment system and start evaluating your projects today.
          </p>
        </motion.div>

        {/* Portal Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {portalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="p-4 bg-blue-600/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 mb-6">
              Access the assessment portal and begin evaluating your DPR documents with AI-powered insights.
            </p>
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center">
              Launch Portal
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
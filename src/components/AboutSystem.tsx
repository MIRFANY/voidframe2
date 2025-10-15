'use client';

import { motion } from 'framer-motion';
import { 
  CpuChipIcon,          // AI Processing / Automation
  ShieldCheckIcon,      // Security / Accuracy
  ClockIcon,            // Speed / Efficiency
  DocumentMagnifyingGlassIcon, // Automated Extraction
  SparklesIcon,         // NLP Quality Checks
  SignalSlashIcon       // Offline Compatibility
} from '@heroicons/react/24/outline';

import { GlowCard } from './ui/spotlight-card';

export default function AboutSystem() {
  const features = [
  
    {
      icon: CpuChipIcon,
      title: "AI Analysis",
      description: "Smart project evaluation with 98% accuracy"
    },
    {
      icon: ShieldCheckIcon,
      title: "Risk Detection",
      description: "Early identification of project risks"
    },
    {
      icon: ClockIcon,
      title: "Fast Processing",
      description: "Assessment in hours, not weeks"
    },  {
      icon: SignalSlashIcon,
      title: "Offline Compatibilty",
      description: "Smart project evaluation being offline"
    },  {
      icon: SparklesIcon,
      title: "NLP Quality Checks",
      description: "Uses NLP modules for Reading Docs"
    },
    {
      icon: DocumentMagnifyingGlassIcon,
      title: "Automated Extraction",
      description: "No Human Intervention"
    },
  ];

  return (
    <section id="about" className="relative">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Content Container */}
      <div className="relative py-32 pb-20">
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
            About System
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            AI-powered DPR assessment system for Northeast India development projects.
          </p>
        </motion.div>

        {/* Features Grid with GlowCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.slice(0, 6).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlowCard 
                glowColor={index === 0 ? 'blue' : index === 1 ? 'purple' : 'green'}
                customSize={true}
                className="w-full h-48 p-6"
              >
                <div className="flex flex-col items-center text-center space-y-3 h-full justify-center">
                  <feature.icon className="w-10 h-10 text-white" />
                  <h3 className="text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlowCard>
              
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">95%</div>
              <div className="text-sm text-gray-400">Fast Results</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">98%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">8</div>
              <div className="text-sm text-gray-400">States</div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
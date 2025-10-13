'use client';

import { motion } from 'framer-motion';

export default function MinimalChart() {
  const data = [
    { label: 'Assessment Speed', value: 95, color: 'bg-blue-500' },
    { label: 'Accuracy Rate', value: 98, color: 'bg-green-500' },
    { label: 'Risk Detection', value: 87, color: 'bg-purple-500' },
    { label: 'Process Efficiency', value: 92, color: 'bg-cyan-500' }
  ];

  return (
    <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
          System Performance
        </h3>
        <p className="text-gray-400 text-sm">Real-time analytics overview</p>
      </div>

      {/* Histogram Section */}
      <div className="flex items-end justify-around h-64 mt-6">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: index * 0.2,
              ease: 'easeOut'
            }}
            className="flex flex-col items-center justify-end space-y-3"
            style={{ transformOrigin: 'bottom' }}
          >
            {/* Bar */}
            <div
              className={`relative w-14 sm:w-16 ${item.color} rounded-t-2xl shadow-lg overflow-hidden`}
              style={{ height: `${item.value * 1.8}px` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-60"></div>

              {/* Animated Glow */}
              <motion.div
                className="absolute inset-0 bg-white/10"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
              />
            </div>

            {/* Labels */}
            <div className="text-center space-y-1">
              <span className="block text-sm font-medium text-gray-300">
                {item.label}
              </span>
              <span className="block text-xs font-bold text-white">
                {item.value}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-10 pt-6 border-t border-gray-800">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-2xl font-bold text-blue-400">1.2K+</div>
            <div className="text-xs text-gray-500">Projects Analyzed</div>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-2xl font-bold text-green-400">8</div>
            <div className="text-xs text-gray-500">States Covered</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

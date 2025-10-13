'use client';

import React from 'react';

const PortalContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Assessment Portal
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Welcome to the AI-powered DPR Quality Assessment and Risk Prediction System
        </p>
        
        {/* Status */}
        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/30 rounded-xl p-8 mb-8 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-yellow-400 font-semibold text-lg">System Initialization</span>
          </div>
          <p className="text-gray-300 text-lg">
            Portal functionality is currently being developed and will be available soon.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">🔍 Quality Assessment</h3>
            <p className="text-gray-400 text-sm">AI-powered analysis of DPR documents</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">⚠️ Risk Prediction</h3>
            <p className="text-gray-400 text-sm">Predictive insights for project risks</p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PortalContent;
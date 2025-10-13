'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-black">
      {/* Government Header Bar - Dark Style */}
      <div className="bg-gray-900">
        <div className="w-full px-8 lg:px-12 py-2">
          <div className="text-center text-gray-300 text-xs font-medium">
            <span>Government of India</span>
            <span className="mx-2">|</span>
            <span>Ministry of Development of North Eastern Region</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Dark Background */}
      <div className="bg-black py-16 border-t border-gray-800">
        <div className="w-full px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Ministry Information - Matching Navigation Logo Style */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image
                  src="/mdoner-logo-dark.png"
                  alt="Ministry of Development of North Eastern Region"
                  width={48}
                  height={48}
                  className="mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Ministry of Development</h3>
                  <h4 className="text-base font-semibold text-gray-300">of North Eastern Region</h4>
                  <p className="text-gray-400 text-sm font-medium">Government of India</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Empowering the North Eastern Region through innovative AI-powered 
                solutions, transparent governance, and accelerated development initiatives.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <MapPinIcon className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                  <span>Vigyan Bhawan Annexe, New Delhi - 110011</span>
                </div>
                <div className="flex items-center text-sm">
                  <EnvelopeIcon className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                  <a href="mailto:support@mdoner.gov.in" className="text-gray-300 hover:text-white transition-colors">
                    support@mdoner.gov.in
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <PhoneIcon className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                  <a href="tel:+911123093000" className="text-gray-300 hover:text-white transition-colors">
                    +91-11-23093000
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-base font-bold text-white mb-4">Quick Links</h5>
              <ul className="space-y-3">
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="text-gray-400 hover:text-white transition-colors text-sm">
                    DPR Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Reports & Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Project Management
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Government Resources */}
            <div>
              <h5 className="text-base font-bold text-white mb-4">Government Resources</h5>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://india.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    India.gov.in
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://digitalindia.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    Digital India
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://mygov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    MyGov.in
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://data.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    Open Data Portal
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://pmjay.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    PM-JAY
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Northeast Specific Links */}
            <div>
              <h5 className="text-base font-bold text-white mb-4">Northeast India</h5>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://mdoner.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    MDoNER Official
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://necouncil.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    NE Council
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://nedfi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    NEDFI
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://nlcpr.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  >
                    NLCPR
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About Northeast
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Dark Style */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="w-full px-8 lg:px-12 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Ministry of Development of North Eastern Region, Government of India. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
              <a 
                href="https://web.archive.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center"
              >
                Archive
                <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
              </a>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

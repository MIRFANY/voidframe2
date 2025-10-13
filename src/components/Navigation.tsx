'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Add & Manage DPR', href: '#manage-dpr' },
    { name: 'AI Chatbot', href: '#offline-feature' },
    { name: 'Demo Video', href: '#offline-feature' },
    { name: 'How to Analyze DPR', href: '#offline-feature' },
    { name: 'Offline', href: '#offline-feature' },
  ];

  const handleScrollTo = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(targetId);
    }
  };

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  ];
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(auth.isAuthenticated());
    };
    checkAuth();

    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname]);

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-md bg-black/30 border-b border-white/20 shadow-lg rounded-b-2xl transition-all duration-300">
        <div className="flex items-center justify-between px-6 md:px-12 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/mdoner-logo-dark.png"
              alt="DPR Assessment Logo"
              width={280}
              height={84}
              className="h-12 w-auto object-contain hover:opacity-80 transition-opacity duration-200"
              priority
            />
            <div className="hidden md:flex flex-col">
              <h1 className="text-lg font-bold text-white">DPR Assessment System</h1>
              <p className="text-xs text-gray-300">Quality Assessment & Risk Prediction Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScrollTo(item.href)}
                  className={`relative text-sm font-medium px-2 py-1 transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-300'
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                </button>
              ))}
            </nav>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/30 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="font-semibold">{currentLanguage.nativeName}</span>
                <svg
                  className={`h-4 w-4 text-gray-300 transition-transform duration-300 ${
                    isLanguageMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLanguage(lang);
                            setIsLanguageMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-all duration-200 ${
                            currentLanguage.code === lang.code
                              ? 'bg-blue-600/60 text-white font-semibold'
                              : 'text-gray-200 hover:bg-white/20'
                          }`}
                        >
                          <span>{lang.nativeName} ({lang.name})</span>
                          {currentLanguage.code === lang.code && (
                            <svg className="h-4 w-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105 shadow-lg"
              >
                Login to Access
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-blue-300 p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/20 rounded-b-2xl"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      handleScrollTo(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-300 hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ))}

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium mt-3 transition-transform transform hover:scale-105 shadow-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium mt-3 transition-transform transform hover:scale-105 shadow-lg text-center"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navigation;

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
  const [currentLanguage, setCurrentLanguage] = useState({ code: 'en', name: 'English', nativeName: 'English' });

  const router = useRouter();
  const pathname = usePathname();

  //-------------------------------------
  // 🔔 Notification System State
  //-------------------------------------
  interface Notification {
    id: number;
    userId: number;
    message: string;
    read: boolean;
    createdAt: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  //-------------------------------------
  // 🔔 Fetch Notifications Function
  //-------------------------------------
  const loadNotifications = async () => {
    try {
      const userId = auth.getUser(); // <--- CHANGE THIS if needed

      if (!userId) return;

      const res = await fetch(`http://localhost:3000/api/notifications/${userId}`);
      const data = await res.json();

      setNotifications(data);
      setUnreadCount(data.filter((n: Notification[] ) => !n).length);
    } catch (err) {
      console.error('Failed to load notifications', err);
    }
  };

  //-------------------------------------
  // 🔔 Poll every 10 seconds
  //-------------------------------------
  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  //-------------------------------------
  // Authentication Check
  //-------------------------------------
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(auth.isAuthenticated());
    };
    checkAuth();

    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname]);

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
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(targetId);
    }
  };

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  ];

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
                  className={`relative text-sm font-medium px-2 py-1 ${activeSection === item.href.substring(1)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-300'
                    }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/30 transition-all duration-300 shadow-md"
              >
                <span className="font-semibold">{currentLanguage.nativeName}</span>
              </button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50"
                  >
                    <div className="py-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLanguage(lang);
                            setIsLanguageMenuOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-sm ${currentLanguage.code === lang.code
                              ? 'bg-blue-600/60 text-white font-semibold'
                              : 'text-gray-200 hover:bg-white/20'
                            }`}
                        >
                          {lang.nativeName} ({lang.name})
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🔔 Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 hover:bg-white/20 rounded-xl transition"
              >
                {/* Bell */}
                <svg
                  className="h-6 w-6 text-gray-200 hover:text-blue-300 transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
                </svg>

                {/* Unread Badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-3 z-50"
                  >
                    <h3 className="text-gray-200 text-sm font-semibold mb-2">Notifications</h3>

                    {notifications.length === 0 ? (
                      <p className="text-gray-300 text-sm text-center py-3">
                        No new notifications
                      </p>
                    ) : (
                      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                        {notifications.map((n, i) => (
                          <div
                            key={i}
                            className="bg-white/10 border border-white/10 text-gray-200 p-2 rounded-xl text-sm"
                          >
                            {n.message}
                          </div>
                        ))}
                      </div>
                    )}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;

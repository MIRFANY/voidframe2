"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { name: "Add & Manage DPR", href: "#manage-dpr" },
    { name: "AI Chatbot", href: "/chatbot" },
    { name: "Demo Video", href: "#offline-feature" },
    { name: "How to Analyze DPR", href: "#offline-feature" },
    { name: "Offline", href: "#offline-feature" },
  ];

  const handleScrollTo = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(targetId);
    }
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith("/")) router.push(href);
    else handleScrollTo(href);
  };

  const languages = [
    { code: "en", nativeName: "English" },
    { code: "hi", nativeName: "हिंदी" },
    { code: "as", nativeName: "অসমীয়া" },
    { code: "bn", nativeName: "বাংলা" },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());

    const storageListener = () => setIsAuthenticated(auth.isAuthenticated());
    window.addEventListener("storage", storageListener);
    return () => window.removeEventListener("storage", storageListener);
  }, [pathname]);

  const handleLogout = () => {
    auth.logout();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-md bg-black/30 border-b border-white/20 shadow-lg rounded-b-2xl">
        <div className="flex items-center justify-between px-6 md:px-12 h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/mdoner-logo-dark.png"
              alt="DPR Portal Logo"
              width={260}
              height={80}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="relative text-sm font-medium text-gray-300 hover:text-blue-400"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Language Drop-down */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-xl"
              >
                {currentLanguage.nativeName}
              </button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white/10 p-2 rounded-2xl"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang);
                          setIsLanguageMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded-md"
                      >
                        {lang.nativeName}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-md text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 px-4 py-2 rounded-md text-white"
              >
                Login to Access
              </Link>
            )}

          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div className="md:hidden px-4 py-4 bg-black/80">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavigation(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-300 text-left py-2"
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navigation;

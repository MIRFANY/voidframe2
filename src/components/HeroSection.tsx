'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { FlipWordsSimple } from '@/components/ui/flip-words-simple';

type Translation = {
  headline: string[];
  subtitle: string[];
  madeSimple: string[];
  stats: { number: string[]; label: string[] }[];
  cta: string[];
};

export default function HeroSection() {
  const languages = ["English", "हिंदी", "অসমীয়া", "বাংলা"];

  const translations: Record<string, Translation> = {
    English: {
      headline: ["DPR ASSESSMENT IN", "PROJECT ANALYSIS IN", "DETAILED REPORT IN"],
      subtitle: [
        "AI-powered project evaluation supporting all Northeast Indian languages and communities",
        "Smart project insights across India's Northeast states",
        "Empowering regional innovation with AI-driven assessments"
      ],
      madeSimple: ["MADE SIMPLE", "SIMPLIFIED FOR YOU", "FASTER. SMARTER. EASIER."],
      stats: [
        { number: ["120+", "150+", "200+"], label: ["Projects Evaluated", "Projects Reviewed", "Assessments Completed"] },
        { number: ["8", "9", "7"], label: ["States Covered", "Regions Reached", "Zones Supported"] },
        { number: ["5+", "10+", "15+"], label: ["Schemes Supported", "Government Schemes", "Development Initiatives"] },
      ],
      cta: ["Start Assessment", "Begin Now", "Let's Go"],
    },
    हिंदी: {
      headline: ["डीपीआर मूल्यांकन", "परियोजना विश्लेषण", "विस्तृत रिपोर्ट"],
      subtitle: [
        "पूर्वोत्तर भारत की सभी भाषाओं और समुदायों के लिए एआई-संचालित परियोजना मूल्यांकन",
        "पूर्वोत्तर राज्यों में स्मार्ट परियोजना अंतर्दृष्टि",
        "एआई-आधारित आकलनों के साथ क्षेत्रीय नवाचार को सशक्त बनाना"
      ],
      madeSimple: ["आसान बनाया गया", "आपके लिए सरल", "तेज़. स्मार्ट. आसान."],
      stats: [
        { number: ["१२०+", "१५०+", "२००+"], label: ["परियोजनाओं का मूल्यांकन", "परियोजनाओं की समीक्षा", "पूर्ण आकलन"] },
        { number: ["८", "९", "७"], label: ["राज्य कवर", "क्षेत्र पहुँचे", "क्षेत्र समर्थित"] },
        { number: ["५+", "१०+", "१५+"], label: ["योजनाएं समर्थित", "सरकारी योजनाएं", "विकास पहल"] },
      ],
      cta: ["मूल्यांकन शुरू करें", "अभी प्रारंभ करें", "चलिए शुरू करें"],
    },
    অসমীয়া: {
      headline: ["ডিপিআৰ মূল্যায়ন", "প্ৰকল্প বিশ্লেষণ", "বিস্তারিত প্ৰতিবেদন"],
      subtitle: [
        "উত্তৰ পূৰ্ব ভাৰতৰ সকলো ভাষা আৰু সমাজৰ বাবে AI-ভিত্তিক প্ৰকল্প মূল্যায়ন",
        "উত্তৰ পূৰ্ব ৰাজ্যসমূহত বুদ্ধিমান প্ৰকল্প অন্তৰ্দৃষ্টি",
        "AI-চালিত মূল্যায়নৰ জৰিয়তে আঞ্চলিক উদ্ভাৱন শক্তিশালীকৰণ"
      ],
      madeSimple: ["সহজ কৰা হৈছে", "আপোনাৰ বাবে সহজ", "দ্ৰুত. বুদ্ধিমান. সহজ."],
      stats: [
        { number: ["১২০+", "১৫০+", "২০০+"], label: ["প্ৰকল্প মূল্যায়ন", "প্ৰকল্প পৰ্যালোচনা", "সম্পন্ন মূল্যায়ন"] },
        { number: ["৮", "৯", "৭"], label: ["আবৃত ৰাজ্য", "পৌঁছা অঞ্চল", "সমৰ্থিত জোন"] },
        { number: ["৫+", "১০+", "১৫+"], label: ["সমৰ্থিত আঁচনি", "সরকাৰী আঁচনি", "বিকাশ উদ্যোগ"] },
      ],
      cta: ["মূল্যায়ন আৰম্ভ কৰক", "এতিয়া আৰম্ভ কৰক", "চলো যাওঁ"],
    },
    বাংলা: {
      headline: ["ডিপিআর মূল্যায়ন", "প্রকল্প বিশ্লেষণ", "বিস্তারিত প্রতিবেদন"],
      subtitle: [
        "উত্তর-পূর্ব ভারতের সব ভাষা ও সম্প্রদায়ের জন্য এআই-চালিত প্রকল্প মূল্যায়ন",
        "উত্তর-পূর্ব রাজ্যগুলিতে স্মার্ট প্রকল্প অন্তর্দৃষ্টি",
        "এআই-চালিত মূল্যায়নের মাধ্যমে আঞ্চলিক উদ্ভাবনকে শক্তিশালী করা"
      ],
      madeSimple: ["সহজ করে তোলা", "আপনার জন্য সহজ", "দ্রুত. স্মার্ট. সহজ."],
      stats: [
        { number: ["১২০+", "১৫০+", "২০০+"], label: ["মূল্যায়িত প্রকল্প", "সমীক্ষিত প্রকল্প", "সম্পূর্ণ মূল্যায়ন"] },
        { number: ["৮", "৯", "৭"], label: ["রাজ্য কভার", "অঞ্চল পৌঁছেছে", "সমর্থিত অঞ্চল"] },
        { number: ["৫+", "১০+", "১৫+"], label: ["সহায়ক প্রকল্প", "সরকারি প্রকল্প", "উন্নয়ন উদ্যোগ"] },
      ],
      cta: ["মূল্যায়ন শুরু করুন", "এখনই শুরু করুন", "চলুন যাই"],
    },
  };

  const [activeLangIndex, setActiveLangIndex] = useState(0);
  const currentLang = languages[activeLangIndex];
  const t = translations[currentLang];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLangIndex((prev) => (prev + 1) % languages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuroraBackground id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="/images/northeast-map.svg"
          alt="Northeast India Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 flex flex-col gap-8 items-center justify-center px-6 h-full w-full pt-16"
      >
        {/* Headline */}
        <div className="space-y-1 text-center max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight space-y-2">
            <FlipWordsSimple words={t.headline} duration={1200} className="text-white" />

            <div className="flex justify-center items-center min-h-[5rem] lg:min-h-[6rem] py-2">
              <FlipWordsSimple
                words={languages}
                duration={1200}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent font-bold text-6xl lg:text-8xl"
              />
            </div>

            <FlipWordsSimple words={t.madeSimple} duration={1200} className="text-white" />
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            <FlipWordsSimple words={t.subtitle} duration={1200} className="text-gray-300" />
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 text-white text-center">
          {t.stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-4xl font-bold">
                <FlipWordsSimple words={item.number} duration={1200} />
              </h2>
              <p className="text-sm">
                <FlipWordsSimple words={item.label} duration={1200} />
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8"
        >
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FlipWordsSimple words={t.cta} duration={1200} className="text-gray-900 font-semibold" />
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </motion.div>

     
    </AuroraBackground>
  );
}

import type { Metadata } from "next";
import { Poppins, Inter, Noto_Sans_Bengali, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari", 
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DPR Quality Assessment & Risk Prediction System | MDoNER",
  description: "AI-Powered Detailed Project Report Quality Assessment and Risk Prediction System for Ministry of Development of North Eastern Region, India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${notoSansBengali.variable} ${notoSansDevanagari.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-poppins), var(--font-inter), var(--font-bengali), var(--font-devanagari), system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}

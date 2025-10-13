"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showAuroraEffect?: boolean;
  showRadialGradient?: boolean;
  slideshowInterval?: number; // seconds
}

export const AuroraBackground = ({
  className,
  children,
  showAuroraEffect = true,
  showRadialGradient = true,
  slideshowInterval = 6,
  ...props
}: AuroraBackgroundProps) => {
  const images = ["/image4.png", "/image1.png" ,"/image2.png", "/image3.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, slideshowInterval * 1000);
    return () => clearInterval(interval);
  }, [slideshowInterval]);

  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-black text-white transition-bg overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Background images slideshow */}
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Background ${index + 1}`}
              fill
              priority={index === 0}
              className={cn(
                "object-cover transition-opacity duration-[2000ms]",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>

        {/* Optional aurora gradient overlay */}
        {showAuroraEffect && (
          <div
            className={cn(
              `
              absolute inset-0 overflow-hidden
              [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
              [background-image:var(--dark-gradient),var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[10px]
              animate-aurora
              opacity-50
              pointer-events-none
              `,
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
            )}
          ></div>
        )}

        {/* Main content */}
        <div className="relative z-10">{children}</div>
      </div>
    </main>
  );
};

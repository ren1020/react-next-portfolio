"use client";
import { useEffect } from "react";

export default function ParallaxEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxTitle = document.querySelector(".parallaxTitle") as HTMLElement;
      const parallaxSubtitle = document.querySelector(".parallaxSubtitle") as HTMLElement;

      if (parallaxTitle) {
        parallaxTitle.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      if (parallaxSubtitle) {
        parallaxSubtitle.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

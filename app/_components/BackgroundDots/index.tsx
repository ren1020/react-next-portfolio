"use client";

import React, { useMemo, useEffect } from "react";
import styles from "./index.module.css";

// Make animation more intense by default
const DOT_COUNT = 28;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function BackgroundDots() {
  const dots = useMemo(() => {
    return Array.from({ length: DOT_COUNT }).map(() => ({
      left: `${rand(0, 100).toFixed(2)}%`,
      top: `${rand(0, 100).toFixed(2)}%`,
      size: `${rand(8, 80).toFixed(2)}px`,
      delay: `${rand(0, 4).toFixed(2)}s`,
      duration: `${rand(4, 12).toFixed(2)}s`,
      opacity: `${rand(0.06, 0.28).toFixed(2)}`,
      hue: Math.floor(rand(10, 60)),
      rotate: `${rand(0, 360).toFixed(2)}deg`,
    }));
  }, []);

  // When intense animation is active, remove page decorative background so dots are visible
  useEffect(() => {
    const cls = "no-bg";
    document.documentElement.classList.add(cls);
    return () => {
      document.documentElement.classList.remove(cls);
    };
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className={styles.dot}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: d.duration,
            opacity: d.opacity,
            background: `hsla(${d.hue}, 70%, 58%, 1)`,
            transform: `translate(-50%, -50%) rotate(${d.rotate})`,
            filter: "blur(8px) brightness(1.15)",
          }}
        />
      ))}
    </div>
  );
}

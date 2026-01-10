"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./index.module.css";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // ページ読み込み完了後にローダーを非表示
    const timer = window.setTimeout(() => {
      const proxy = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });

      // アニメーション: 数字を 0 -> 100 にしつつ、プログレスバーを伸ばす
      tl.to(
        proxy,
        {
          value: 100,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            setPercent(Math.round(proxy.value));
          },
        },
        0
      );

      tl.to(
        `.${styles.loaderProgress}`,
        {
          width: "100%",
          duration: 0.9,
          ease: "power2.out",
        },
        0
      ).to(
        `.${styles.loader}`,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "+=0.1"
      );
    }, 300); // 300ms後に開始

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  const R = 36; // circle radius
  const C = 2 * Math.PI * R;
  const dashOffset = C - (C * percent) / 100;

  return (
    <div className={styles.loader}>
      <div className={styles.loaderContent}>
        <div className={styles.loaderLogo}>loading</div>

        <div className={styles.loaderPercentWrap} aria-live="polite">
          <svg
            className={styles.loaderRing}
            width="84"
            height="84"
            viewBox="0 0 84 84"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="loaderGradient" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#e3a889" />
                <stop offset="100%" stopColor="#c87f5a" />
              </linearGradient>
            </defs>
            <circle
              className={styles.ringBg}
              cx="42"
              cy="42"
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="8"
            />
            <circle
              className={styles.ringFg}
              cx="42"
              cy="42"
              r={R}
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 42 42)`}
            />
          </svg>

          <div className={styles.loaderPercentInner}>
            <span className={styles.loaderPercentNumber}>{percent}</span>
            <span className={styles.loaderPercentSign}>%</span>
          </div>
        </div>

        <div className={styles.loaderProgressBar}>
          <div className={styles.loaderProgress}></div>
        </div>
      </div>
    </div>
  );
}

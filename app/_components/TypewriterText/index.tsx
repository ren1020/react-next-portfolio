"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
};

declare global {
  interface Window {
    __pageLoaderDone?: boolean;
  }
}

export default function TypewriterText({
  text,
  speed = 90,
  startDelay = 0,
  className,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const startedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const delayRef = useRef<number | null>(null);
  const fallbackRef = useRef<number | null>(null);

  const startTyping = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setDisplayed("");
    let i = 0;

    const begin = () => {
      timerRef.current = window.setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      }, speed);
    };

    if (startDelay > 0) {
      delayRef.current = window.setTimeout(begin, startDelay);
    } else {
      begin();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // コンポーネント再マウント時にリセット
    startedRef.current = false;
    setDisplayed("");

    const onLoaderDone = () => {
      if (fallbackRef.current) {
        window.clearTimeout(fallbackRef.current);
        fallbackRef.current = null;
      }
      startTyping();
    };

    if (window.__pageLoaderDone) {
      // ローダー完了済みなら即座に開始
      startTyping();
    } else {
      // 初回ロード時はイベントを待つ
      window.addEventListener("page-loader:done", onLoaderDone, {
        once: true,
      });
      fallbackRef.current = window.setTimeout(() => {
        startTyping();
      }, 1200);
    }

    return () => {
      window.removeEventListener("page-loader:done", onLoaderDone);
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (delayRef.current) window.clearTimeout(delayRef.current);
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={`${styles.typewriter} ${className ?? ""}`.trim()}>
      <span className={styles.text} aria-label={text}>
        {displayed}
      </span>
      <span className={styles.caret} aria-hidden="true" />
    </span>
  );
}

"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

// 色々な猫の種類
const CAT_EMOJIS = ["🐱", "🐈", "😺", "😸", "😻", "😼", "😽", "🐈‍⬛"];

export default function RandomCat() {
  const [cats, setCats] = useState<Array<{ id: number; direction: string; top: string; emoji: string }>>([]);

  useEffect(() => {
    const showCat = () => {
      const id = Date.now();
      const direction = Math.random() > 0.5 ? "left" : "right";
      const top = `${Math.random() * 60 + 20}%`; // 20%〜80%の位置
      const emoji = CAT_EMOJIS[Math.floor(Math.random() * CAT_EMOJIS.length)];

      setCats((prev) => [...prev, { id, direction, top, emoji }]);

      // 猫を削除（アニメーション終了後）
      setTimeout(() => {
        setCats((prev) => prev.filter((cat) => cat.id !== id));
      }, 8000);
    };

    // 初回表示（15-30秒後）
    const initialDelay = Math.random() * 15000 + 15000;
    const initialTimer = setTimeout(showCat, initialDelay);

    // 定期的に猫を表示（30-60秒間隔）
    const interval = setInterval(() => {
      if (Math.random() > 0.15) { // 85%の確率で表示
        showCat();
      }
    }, Math.random() * 30000 + 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {cats.map((cat) => (
        <div
          key={cat.id}
          className={`${styles.cat} ${styles[cat.direction]}`}
          style={{ top: cat.top }}
          onClick={(e) => {
            e.currentTarget.classList.add(styles.jumped);
          }}
          title="にゃー！"
        >
          <div className={styles.catBody}>
            <span className={styles.catEmoji}>{cat.emoji}</span>
          </div>
        </div>
      ))}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styles from './index.module.css';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ページ読み込み完了後にローダーを非表示
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        }
      });

      tl.to(`.${styles.loaderProgress}`, {
        width: '100%',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .to(`.${styles.loader}`, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }, 300); // 300ms後に開始

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.loaderContent}>
        <div className={styles.loaderLogo}>loading</div>
        <div className={styles.loaderProgressBar}>
          <div className={styles.loaderProgress}></div>
        </div>
      </div>
    </div>
  );
}

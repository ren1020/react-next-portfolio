'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import styles from './index.module.css';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (children !== displayChildren) {
      setIsTransitioning(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children);
          setIsTransitioning(false);
        }
      });
      
      // 画面を覆う
      tl.to(`.${styles.transition}`, {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.4,
        ease: 'power3.inOut',
      })
      // 少し待機
      .to({}, { duration: 0.1 })
      // 画面を開く
      .to(`.${styles.transition}`, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.4,
        ease: 'power3.inOut',
      });

      return () => {
        tl.kill();
      };
    }
  }, [children, displayChildren]);

  return (
    <>
      <div className={styles.transition}></div>
      <div className={styles.content} style={{ opacity: isTransitioning ? 0 : 1 }}>
        {displayChildren}
      </div>
    </>
  );
}

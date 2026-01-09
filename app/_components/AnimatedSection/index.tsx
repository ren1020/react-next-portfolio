'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './index.module.css';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  animation = 'fade',
  delay = 0,
  className = ''
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const element = sectionRef.current;
    
    // アニメーションの初期状態を設定
    const initialState: any = { opacity: 0 };
    const animateState: any = { opacity: 1, duration: 1, delay };

    switch (animation) {
      case 'slideUp':
        initialState.y = 60;
        animateState.y = 0;
        break;
      case 'slideLeft':
        initialState.x = 60;
        animateState.x = 0;
        break;
      case 'slideRight':
        initialState.x = -60;
        animateState.x = 0;
        break;
      case 'scale':
        initialState.scale = 0.8;
        animateState.scale = 1;
        break;
    }

    gsap.set(element, initialState);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 95%',
      end: 'bottom 15%',
      onEnter: () => {
        gsap.to(element, {
          ...animateState,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [animation, delay]);

  return (
    <div ref={sectionRef} className={`${styles.section} ${className}`}>
      {children}
    </div>
  );
}

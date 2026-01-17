"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
  className?: string;
  src: string;
  alt?: string;
  size?: number;
  priority?: boolean;
};

export default function ProfileAvatar({ className, src, alt = "", size = 180, priority = false }: Props) {
  const [useFallback, setUseFallback] = useState(false);
  const finalSrc = useFallback ? "/images/profile-placeholder.svg" : src;

  return (
    <div className={`${styles.avatarWrapper} ${className || ''}`}>
      <Image
        src={finalSrc}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        onError={() => setUseFallback(true)}
        className={styles.avatar}
      />
    </div>
  );
}

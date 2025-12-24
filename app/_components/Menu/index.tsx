"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import styles from "./index.module.css";

export default function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  return (
    <div className={styles.wrapper}>
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link href="/Profile">Profile</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <button className={cx(styles.button, styles.close)} onClick={close}>
          <Image
            src="/close.svg"
            alt="閉じる"
            width={24}
            height={24}
            className={styles.icon}
            priority
          />
        </button>
      </nav>
      <button className={styles.button} onClick={toggle}>
        <Image
          src="/menu.svg"
          alt="メニュー"
          width={24}
          height={24}
          className={styles.icon}
        />
      </button>
    </div>
  );
}

import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <Link href="/Profile">Profile</Link>
          </li>
          <li className={styles.item}>
            <Link href="/blog">Blog</Link>
          </li>
          <li className={styles.item}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.socials}>
        <a
          href="https://www.instagram.com/r10.kfk/"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          <img src="/icons/instagram.svg" alt="" className={styles.socialIcon} aria-hidden />
          <span className={styles.srOnly}>Instagram</span>
        </a>
        <a
          href="https://github.com/ren1020"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          <img src="/icons/github.svg" alt="" className={styles.socialIcon} aria-hidden />
          <span className={styles.srOnly}>GitHub</span>
        </a>
      </div>
      <p className={styles.cr}>© 2025 Ren Okita. All Rights Reserved.</p>
    </footer>
  );
}

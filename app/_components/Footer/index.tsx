import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <Link href="/news">News</Link>
          </li>
          <li className={styles.item}>
            <Link href="/Profile">Profile</Link>
          </li>
          <li className={styles.item}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.cr}>© SIMPLE. ALL Rights Reserved 2024</p>
    </footer>
  );
}

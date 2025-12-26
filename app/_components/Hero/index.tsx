import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  title: string;
  sub: string;
  withBackground?: boolean;
  currentPage?: "home" | "blog" | "contact" | "profile";
};

export default function Hero({ title, sub, withBackground = true, currentPage }: Props) {
  const showProfile = currentPage !== "profile";
  const showBlog = currentPage !== "blog";
  const showContact = currentPage !== "contact";

  return (
    <section
      className={`${styles.container} ${!withBackground ? styles.noBg : ""}`.trim()}
    >
      {withBackground && (
        <>
          <Image
            className={styles.bgimg}
            src="/img-mv.jpg"
            alt="hero background"
            width={4000}
            height={1200}
            priority
          />
          <div className={styles.overlay} />
        </>
      )}
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>{sub}</p>
        <div className={styles.ctaGroup}>
          {showProfile && (
            <Link href="/Profile" className={styles.btn}>
              プロフィール
            </Link>
          )}
          {showBlog && (
            <Link href="/blog" className={styles.btn}>
              ブログ一覧
            </Link>
          )}
          {showContact && (
            <Link href="/contact" className={styles.btn}>
              お問い合わせ
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  title: string;
  sub: string;
  withBackground?: boolean;
};

export default function Hero({ title, sub, withBackground = true }: Props) {
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
          <Link href="/contact" className={styles.btn}>
            お問い合わせ
          </Link>
          <Link href="/blog" className={styles.btn}>
            ブログ一覧へ
          </Link>
        </div>
      </div>
    </section>
  );
}

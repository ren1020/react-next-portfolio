import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  title: string;
  sub: string;
};

export default function Hero({ title, sub }: Props) {
  return (
    <section className={styles.container}>
      <Image
        className={styles.bgimg}
        src="/img-mv.jpg"
        alt="hero background"
        width={4000}
        height={1200}
        priority
      />
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>{sub}</p>
        <div className={styles.ctaGroup}>
          <Link href="/contact" className={styles.btn}>
            お問い合わせ
          </Link>
          <Link href="/news" className={styles.btn}>
            最新情報を見る
          </Link>
        </div>
      </div>
    </section>
  );
}

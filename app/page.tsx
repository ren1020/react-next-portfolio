import styles from "./page.module.css";
import ButtonLink from "@/app/_components/ButtonLink";

export const revalidate = 60;

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.welcome}>
        <div className={styles.welcomeInner}>
          <p className={styles.kicker}>Welcome to My Portfolio</p>
          <h1 className={styles.title}>Hello</h1>
          <p className={styles.description}>
            ポートフォリオへようこそ。明るく使いやすいフロントエンド体験をつくる
            ことに、心を込めて取り組んでいます。
          </p>
          <p className={styles.description}>
            Next.js と TypeScript を軸に、設計から実装・改善まで。
            ユーザーの笑顔が見える UI/UX をめざします。
          </p>
          <div className={styles.tags}>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>UI/UX Design</span>
          </div>
          <p className={styles.scrollHint}>下へスクロール →</p>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.sectionKicker}>PROFILE</p>
          <h2 className={styles.sectionTitle}>プロフィールへご案内</h2>
          <p className={styles.sectionLead}>
            経歴やスキルセット、取り組んできた内容をまとめています。まずは私の
            ことを知ってください。
          </p>
        </div>
        <div className={styles.panelAction}>
          <ButtonLink href="/Profile">Profile</ButtonLink>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.sectionKicker}>BLOG</p>
          <h2 className={styles.sectionTitle}>ブログを読む</h2>
          <p className={styles.sectionLead}>
            学びや制作の気づきをブログにまとめています。実装の工夫や振り返りを
            ぜひチェックしてください。
          </p>
        </div>
        <div className={styles.panelAction}>
          <ButtonLink href="/blog">Blog</ButtonLink>
        </div>
      </section>
    </main>
  );
}

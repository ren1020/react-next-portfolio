import styles from "./page.module.css";
import ProfileAvatar from "@/app/_components/ProfileAvatar";
import ButtonLink from "@/app/_components/ButtonLink";

export const revalidate = 60;

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.welcome}>
        <div className={styles.welcomeInner}>
          <h1 className={styles.welcomeTitle}>Portfolio</h1>
          <h1 className={styles.welcomeSubtitle}>ご覧いただきありがとうございます</h1>
        </div>
      </section>

      <section className={styles.profileSection}>
        <div className={styles.profileInner}>
          <ProfileAvatar
            className={styles.profileAvatar}
            src="/profile.png"
            alt="プロフィール画像"
            size={220}
            priority
          />
          <div className={styles.panelHeader}>
            <p className={styles.sectionKicker}>PROFILE</p>
            <h2 className={styles.sectionTitle}>プロフィール</h2>
            <p className={styles.sectionLead}>
              経歴や資格、取り組んできた内容をまとめています。</p>
          </div>
          <div className={styles.panelAction}>
            <ButtonLink href="/Profile">Profile</ButtonLink>
          </div>
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

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.sectionKicker}>CONTACT</p>
          <h2 className={styles.sectionTitle}>お問い合わせ</h2>
          <p className={styles.sectionLead}>
            制作のご依頼やご相談はお気軽にご連絡ください。目的やイメージを伺い、
            最適な進め方をご提案します。
          </p>
        </div>
        <div className={styles.panelAction}>
          <ButtonLink href="/contact">Contact</ButtonLink>
        </div>
      </section>
    </main>
  );
}

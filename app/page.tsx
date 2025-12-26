import styles from "./page.module.css";
import ProfileAvatar from "@/app/_components/ProfileAvatar";
import ButtonLink from "@/app/_components/ButtonLink";
import { getBlogList } from "@/app/_libs/microcms";
import Link from "next/link";
import Category from "@/app/_components/Category";
import Date from "@/app/_components/Date";

export const revalidate = 60;

export default async function Home() {
  const { contents: blogs } = await getBlogList({
    limit: 3,
  });
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
          <p className={styles.sectionLead}>
            学びや制作の気づきをブログにまとめています。
          </p>
        </div>
        <ul className={styles.blogList}>
          {blogs.map((blog) => (
            <li key={blog.id} className={styles.blogItem}>
              <Link href={`/blog/${blog.id}`} className={styles.blogLink}>
                <span className={styles.blogTitle}>{blog.title}</span>
                <div className={styles.blogMeta}>
                  <Category category={blog.category} />
                  <Date date={blog.time ?? blog.publishedAt ?? blog.createdAt} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.panelAction}>
          <ButtonLink href="/blog">もっと見る</ButtonLink>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.sectionKicker}>CONTACT</p>
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

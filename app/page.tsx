import styles from "./page.module.css";
import type { Metadata } from "next";
import ProfileAvatar from "@/app/_components/ProfileAvatar";
import ButtonLink from "@/app/_components/ButtonLink";
import { getBlogList } from "@/app/_libs/microcms";
import Link from "next/link";
import Category from "@/app/_components/Category";
import Date from "@/app/_components/Date";
import AnimatedSection from "@/app/_components/AnimatedSection";
import { projects } from "@/app/projects/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio",
  description: "学びや制作の気づきをまとめたポートフォリオサイトです。",
  openGraph: {
    title: "Portfolio",
    description: "学びや制作の気づきをまとめたポートフォリオサイトです。",
    images: ["/ogp.png"],
  },
};

export default async function Home() {
  const { contents: blogs } = await getBlogList({
    limit: 3,
    orders: "-time",
  });

  return (
    <main className={styles.page}>
      {/* ========== セクション 1: ウェルカム ==========*/}
      <section className={styles.welcome}>
        <div className={styles.welcomeInner}>
          <h1 className={styles.welcomeTitle}>Portfolio</h1>
          <h1 className={styles.welcomeSubtitle}>
            ご覧いただきありがとうございます
          </h1>
        </div>
      </section>

      {/* ========== セクション 2: プロフィール ==========*/}
      <AnimatedSection animation="slideUp" delay={0}>
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
                経歴や資格、取り組んできた内容をまとめています。
              </p>
            </div>
            <div className={styles.panelAction}>
              <ButtonLink href="/Profile">Profileへ</ButtonLink>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ========== セクション 3: 作品（Projects） ==========*/}
      <AnimatedSection animation="slideUp" delay={0.08}>
        <section className={styles.projectsSection}>
          <div className={styles.projectsSectionInner}>
            <div className={styles.blogHeader}>
              <p className={styles.blogKicker}>PROJECTS</p>
              <p className={styles.blogLead}>
                制作した作品の一部を掲載しています。
              </p>
            </div>
            <ul className={styles.blogList}>
              {projects.slice(0, 3).map((p, index) => (
                <li
                  key={p.id}
                  className={styles.blogItem}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <Link href={`/projects/${p.id}`} className={styles.blogLink}>
                    <span className={styles.blogTitle}>{p.title}</span>
                    <div className={styles.blogMeta}>
                      <span className={styles.blogKicker}>
                        {p.tech.join(" ・ ")}
                      </span>
                    </div>
                    <p className={styles.blogLead}>{p.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.blogAction}>
              <ButtonLink href="/projects">作品一覧へ</ButtonLink>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ========== セクション 4: ブログ ==========*/}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className={styles.blogSection}>
          <div className={styles.blogSectionInner}>
            <div className={styles.blogHeader}>
              <p className={styles.blogKicker}>BLOG</p>
              <p className={styles.blogLead}>
                学びや制作の気づきをブログにまとめています。
              </p>
            </div>
            <ul className={styles.blogList}>
              {blogs.map((blog, index) => (
                <li
                  key={blog.id}
                  className={styles.blogItem}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link href={`/blog/${blog.id}`} className={styles.blogLink}>
                    <span className={styles.blogTitle}>{blog.title}</span>
                    <div className={styles.blogMeta}>
                      <Category category={blog.category} />
                      <Date
                        date={blog.time ?? blog.publishedAt ?? blog.createdAt}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.blogAction}>
              <ButtonLink href="/blog">もっと見る</ButtonLink>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ========== セクション 4: コンタクト ==========*/}
      <AnimatedSection animation="slideUp" delay={0.15}>
        <section className={styles.contactSection}>
          <div className={styles.contactInner}>
            <div className={styles.contactHeader}>
              <p className={styles.contactKicker}>CONTACT</p>
              <p className={styles.contactLead}>
                制作のご依頼やご相談はお気軽にご連絡ください。
              </p>
            </div>
            <div className={styles.contactAction}>
              <ButtonLink href="/contact">お問い合わせはこちら</ButtonLink>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}

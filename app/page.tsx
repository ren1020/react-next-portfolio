import styles from "./page.module.css";
import type { Metadata } from "next";
import ProfileAvatar from "@/app/_components/ProfileAvatar";
import ButtonLink from "@/app/_components/ButtonLink";
import { getBlogList } from "@/app/_libs/microcms";
import Link from "next/link";
import Image from "next/image";
import Category from "@/app/_components/Category";
import Date from "@/app/_components/Date";
import AnimatedSection from "@/app/_components/AnimatedSection";
import { getProjectsList } from "@/app/_libs/microcms";
import BackgroundDots from "@/app/_components/BackgroundDots";
import ParallaxEffect from "@/app/_components/ParallaxEffect";
import RandomCat from "@/app/_components/RandomCat";
import TypewriterText from "@/app/_components/TypewriterText";

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
  const projData = await getProjectsList({ limit: 3, orders: "-createdAt" });
  const projects = projData.contents ?? [];

  return (
    <main className={styles.page}>
      <BackgroundDots />
      <ParallaxEffect />
      <RandomCat />
      {/* ========== セクション 1: ウェルカム ==========*/}
      <section className={styles.welcome}>
        <div className={styles.welcomeInner}>
          <h1
            className={`${styles.welcomeTitle} ${styles.welcomeTitleTyping} ${styles.parallaxTitle}`}
          >
            <TypewriterText text="Portfolio" speed={130} />
          </h1>
          <h1
            className={`${styles.welcomeSubtitle} ${styles.parallaxSubtitle}`}
          >
            <TypewriterText
              text="ご覧いただきありがとうございます！"
              speed={130}
              startDelay={130 * "Portfolio".length + 200}
            />
          </h1>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollMouse}>
              <div className={styles.scrollWheel}></div>
            </div>
          </div>
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
              {projects.map((p, index) => (
                <li
                  key={p.id}
                  className={`${styles.blogItem} ${styles.cardHover}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <Link
                    href={`/projects/${p.id}`}
                    className={`${styles.blogLink} ${styles.projectCard}`}
                  >
                    {(p as any).thumbnail ? (
                      <Image
                        src={(p as any).thumbnail.url}
                        alt={(p as any).name ?? "project"}
                        width={160}
                        height={96}
                        style={{ width: 160, height: "auto", borderRadius: 12 }}
                      />
                    ) : (
                      <Image
                        src="/no-image.png"
                        alt="No Image"
                        width={160}
                        height={96}
                        style={{ width: 160, height: "auto", borderRadius: 12 }}
                      />
                    )}
                    <span className={styles.blogTitle}>
                      {(p as any).name ?? ""}
                    </span>
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
                  className={`${styles.blogItem} ${styles.cardHover}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={`/blog/${blog.id}`}
                    className={`${styles.blogLink} ${styles.blogCardLink}`}
                  >
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

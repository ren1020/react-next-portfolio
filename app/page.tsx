import styles from "./page.module.css";
import ButtonLink from "@/app/_components/ButtonLink";

export const revalidate = 60;

type Project = {
  title: string;
  description: string;
  tech?: string[];
  href?: string;
};

const projects: Project[] = [
  {
    title: "ポートフォリオサイト",
    description:
      "このサイト自体。Next.js + TypeScript で作成。レスポンシブ対応、静的生成。",
    tech: ["Next.js", "TypeScript", "CSS Modules"],
    href: "/",
  },
  {
    title: "Project Alpha",
    description: "API と連携するダッシュボード。データ可視化・認証を実装。",
    tech: ["React", "Chart.js", "Node.js"],
    href: "#",
  },
  {
    title: "Open Source Library",
    description: "小さなユーティリティライブラリ。テストと CI を備えています。",
    tech: ["TypeScript", "Jest"],
    href: "#",
  },
];

export default function Home() {
  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>沖田</h1>
          <p className={styles.description}>
            京都デザイン＆テクノロジー専門学校/ホワイトハッカー専攻
          </p>
          <p className={styles.description} style={{ marginTop: "1rem" }}>
            ユーザー体験を大切にするフロントエンド実装が得意です。Next.js
            を用いた静的サイトや SPA、タイプセーフなコードを心がけています。
          </p>
        </div>
      </section>

      <section className={styles.news}>
        <h2 className={styles.newsTitle}>Projects</h2>
        <div className={styles.projects}>
          {projects.map((p) => (
            <article key={p.title} className={styles.card}>
              <h3>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
              {p.tech && (
                <p className={styles.cardTech}>{p.tech.join(" ・ ")}</p>
              )}
              <div style={{ marginTop: "12px" }}>
                <ButtonLink href={p.href ?? "#"}>詳細を見る</ButtonLink>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.newsLink}>
          <ButtonLink href="/contact">Contact</ButtonLink>
        </div>
      </section>
    </>
  );
}

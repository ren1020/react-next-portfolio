import styles from "./page.module.css";
import profileStyles from "@/app/Profile/page.module.css";
import blogStyles from "@/app/_components/BlogList/index.module.css";
import Hero from "@/app/_components/Hero";
import ButtonLink from "@/app/_components/ButtonLink";
import Link from "next/link";
import Image from "next/image";
import { getProjectsList } from "@/app/_libs/microcms";

export const revalidate = 60;

export default async function ProjectsPage() {
  const data = await getProjectsList({ limit: 100, orders: "-createdAt" });
  const projects = data.contents ?? [];

  return (
    <main className={styles.page}>
      <Hero
        title="Projects"
        sub="作品一覧"
        withBackground={false}
        currentPage="projects"
      />

      <section>
        <div className={profileStyles.container}>
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Projects</h1>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ButtonLink href="/projects">作品一覧へ</ButtonLink>
              </div>
            </div>

            <ul className={blogStyles.list}>
              {projects.map((p) => (
                <li key={p.id} className={blogStyles.item}>
                  <Link href={`/projects/${p.id}`} className={blogStyles.link}>
                    {p.thumbnail ? (
                      <Image
                        src={p.thumbnail.url}
                        alt={p.name}
                        width={160}
                        height={96}
                        className={blogStyles.image}
                      />
                    ) : (
                      <Image
                        className={blogStyles.image}
                        src="/no-image.png"
                        alt="No Image"
                        width={160}
                        height={96}
                      />
                    )}
                    <dl className={blogStyles.contents}>
                      <dt className={blogStyles.title}>{p.name}</dt>
                      <dd className={blogStyles.meta}>
                        <span className={styles.badge}>{p.description}</span>
                      </dd>
                    </dl>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 16,
            }}
          >
            <ButtonLink href="/projects">もっと見る</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

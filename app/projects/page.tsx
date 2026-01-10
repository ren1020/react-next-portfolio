import styles from "./page.module.css";
import profileStyles from "@/app/Profile/page.module.css";
import Hero from "@/app/_components/Hero";
import Link from "next/link";
import Image from "next/image";
import { projects } from "./data";

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <Hero
        title="Projects"
        sub="作品一覧"
        withBackground={false}
        currentPage="projects"
      />
      <header className={styles.header}>
        <h1 className={styles.title}>作品 / Projects</h1>
      </header>

      <section>
        <div className={styles.list}>
          <div className={profileStyles.text}>
            <p className={profileStyles.name}>作品一覧</p>
          </div>
          <div className={profileStyles.container}>
            <ul>
              {projects.map((p) => (
                <li key={p.id} className={profileStyles.list}>
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={240}
                      height={160}
                      className={profileStyles.image}
                    />
                  ) : (
                    <div className={profileStyles.imagePlaceholder}>
                      No Image
                    </div>
                  )}
                  <dl>
                    <dt className={profileStyles.name}>{p.title}</dt>
                    <dd className={profileStyles.position}>
                      {p.tech.join(" ・ ")}
                    </dd>
                    <dd className={profileStyles.profile}>{p.summary}</dd>
                    <dd>
                      <Link
                        href={`/projects/${p.id}`}
                        className={styles.cardLink}
                      >
                        詳細を見る →
                      </Link>
                    </dd>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

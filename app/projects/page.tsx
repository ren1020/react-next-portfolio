import styles from "./page.module.css";
import profileStyles from "@/app/Profile/page.module.css";
import blogStyles from "@/app/_components/BlogList/index.module.css";
import Link from "next/link";
import Image from "next/image";
import { getProjectsList } from "@/app/_libs/microcms";

export const revalidate = 60;

export default async function ProjectsPage() {
  const data = await getProjectsList({ limit: 100, orders: "-createdAt" });
  const projects = data.contents ?? [];

  return (
    <main className={styles.page}>
      {/* Hero はレイアウト側で表示しているためここでは見出しをコンテンツ外に表示 */}
      <div className={profileStyles.container} style={{ margin: "8px 0" }}>
        <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Projects</h2>
      </div>

      <section>
        <div className={profileStyles.container}>
          <div className={styles.card}>
            {/* spacing adjusted: removed empty wrapper to reduce vertical space */}

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
          {/* ページ上部の Hero にナビがあるため、ここでの重複リンクは不要 */}
        </div>
      </section>
    </main>
  );
}

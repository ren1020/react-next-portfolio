import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { projects } from "../data";

type Props = {
  params: { id: string };
};

export default function ProjectDetail({ params }: Props) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{project.title}</h1>
      <div className={styles.meta}>{project.tech.join(" ・ ")}</div>
      <div className={styles.description}>{project.description}</div>
      <div className={styles.links}>
        {project.github && (
          <div>
            GitHub: <a href={project.github}>{project.github}</a>
          </div>
        )}
        {project.live && (
          <div>
            Live: <a href={project.live}>{project.live}</a>
          </div>
        )}
      </div>

      <Link href="/projects" className={styles.back}>
        ← 作品一覧へ戻る
      </Link>
    </main>
  );
}

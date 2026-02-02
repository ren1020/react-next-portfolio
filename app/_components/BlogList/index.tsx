import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.css";
import Category from "../Category";
import Date from "../Date";
import { Blog } from "@/app/_libs/microcms";

type Props = {
  blogs: Blog[];
};

export default function BlogList({ blogs }: Props) {
  if (blogs.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul className={styles.list}>
      {blogs.map((article) => (
        <li key={article.id} className={styles.item}>
          <Link href={`/blog/${article.id}`} className={styles.link}>
            {(article as any).image?.url || article.thumbnail ? (
              <Image
                src={(article as any).image?.url || article.thumbnail.url}
                alt=""
                className={styles.image}
                width={140}
                height={80}
              />
            ) : (
              <Image
                className={styles.image}
                src="/no-image.png"
                alt="No Image"
                width={140}
                height={80}
              />
            )}
            <dl className={styles.contents}>
              <dt className={styles.title}>{article.title}</dt>
              <dd className={styles.meta}>
                <Category category={article.category} />
                <Date date={article.time ?? article.publishedAt ?? article.createdAt} />
              </dd>
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import Image from "next/image";
import { getMembersList } from "@/app/_libs/microcms";
import { MEMBERS_LIST_LIMIT } from "@/app/_constants";
import styles from "./page.module.css";

export default async function Page() {
  let contents = [] as Awaited<ReturnType<typeof getMembersList>>['contents'];
  let hasError = false;

  try {
    const data = await getMembersList({ limit: MEMBERS_LIST_LIMIT });
    contents = data.contents ?? [];
  } catch (e) {
    hasError = true;
  }

  return (
    <div className={styles.container}>
      {hasError ? (
        <p className={styles.empty}>プロフィールの取得に失敗しました。しばらくしてから再度お試しください。</p>
      ) : contents.length === 0 ? (
        <p className={styles.empty}>No profiles registered.</p>
      ) : (
        <ul>
          {contents.map((member) => (
            <li key={member.id} className={styles.list}>
              {member.image ? (
                <Image
                  src={member.image.url}
                  alt=""
                  width={member.image.width}
                  height={member.image.height}
                  className={styles.image}
                />
              ) : (
                <div className={styles.imagePlaceholder}>No Image</div>
              )}
              <dl>
                <dt className={styles.name}>{member.name}</dt>
                <dd className={styles.position}>{member.position}</dd>
                <dd className={styles.profile}>{member.profile}</dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

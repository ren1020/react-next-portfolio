import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/_libs/utils";
import {
  getMembersList,
  getQualificationsList,
  getCareerList,
} from "@/app/_libs/microcms";
import {
  MEMBERS_LIST_LIMIT,
  QUALIFICATIONS_LIST_LIMIT,
  CAREERS_LIST_LIMIT,
} from "@/app/_constants";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function Page() {
  let contents = [] as Awaited<ReturnType<typeof getMembersList>>['contents'];
  let qualifications = [] as Awaited<ReturnType<typeof getQualificationsList>>['contents'];
  let careers = [] as Awaited<ReturnType<typeof getCareerList>>['contents'];
  let hasError = false;
  let qualError = false;
  let careerError = false;

  try {
    const data = await getMembersList({ limit: MEMBERS_LIST_LIMIT });
    contents = data.contents ?? [];
  } catch (e) {
    hasError = true;
  }

  try {
    const data = await getQualificationsList({
      limit: QUALIFICATIONS_LIST_LIMIT,
      orders: "-issuedAt",
    });
    qualifications = data.contents ?? [];
  } catch (e) {
    qualError = true;
  }

  try {
    const data = await getCareerList({
      limit: CAREERS_LIST_LIMIT,
      orders: "time",
    });
    careers = data.contents ?? [];
  } catch (e) {
    careerError = true;
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
      <section className={styles.qualifications}>
        <h2 className={styles.sectionTitle}>資格</h2>
        {qualError ? (
          <p className={styles.empty}>資格の取得に失敗しました。しばらくしてから再度お試しください。</p>
        ) : qualifications.length === 0 ? (
          <p className={styles.empty}>資格はまだ登録されていません。</p>
        ) : (
          <ul className={styles.qualList}>
            {qualifications.map((item) => (
              <Link
                key={item.id}
                href={`/Profile/qualifications/${item.id}`}
                className={styles.qualLink}
              >
                <li className={styles.qualItem}>
                  <div className={styles.qualName}>{item.qualifications}</div>
                  {item.time && (
                    <div className={styles.qualTime}>{formatDate(item.time)}</div>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </section>
      <section className={styles.careers}>
        <h2 className={styles.sectionTitle}>経歴</h2>
        {careerError ? (
          <p className={styles.empty}>経歴の取得に失敗しました。しばらくしてから再度お試しください。</p>
        ) : careers.length === 0 ? (
          <p className={styles.empty}>経歴はまだ登録されていません。</p>
        ) : (
          <ul className={styles.careerList}>
            {careers.map((item, index) => (
              <li key={item.id} className={styles.careerItem}>
                <div className={styles.careerDot}></div>
                <div className={styles.careerContent}>
                  {item.time && (
                    <div className={styles.careerTime}>{formatDate(item.time)}</div>
                  )}
                  <div className={styles.careerName}>{item.name}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

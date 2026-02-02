import Image from "next/image";
import { formatDate } from "@/app/_libs/utils";
import { getQualificationsList, getCareerList } from "@/app/_libs/microcms";
import { members } from "./data";
import {
  QUALIFICATIONS_LIST_LIMIT,
  CAREERS_LIST_LIMIT,
} from "@/app/_constants";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function Profile() {
  // members is now static and imported from ./data
  let qualifications: any[] = [];
  let careers: any[] = [];
  let qualError = false;
  let careerError = false;

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
    <>
      <div className="pageTitleWrap">
        <h1 className="pageTitle">Profile</h1>
      </div>

      <div className={styles.card}>
        <section className={styles.profileSection}>
          <div className={styles.containerInner}>
            <ul>
              {members.map((member) => (
                <li key={member.id} className={styles.list}>
                  {member.image ? (
                    typeof member.image === "string" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.image} alt="" className={styles.image} />
                    ) : (
                      <Image
                        src={member.image.url}
                        alt=""
                        width={member.image.width || 160}
                        height={member.image.height || 160}
                        className={styles.image}
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 240px"
                        priority={false}
                      />
                    )
                  ) : (
                    <div className={styles.imagePlaceholder}>No Image</div>
                  )}
                  <dl>
                    <dt className={styles.name}>{member.name}</dt>
                    {member.position && (
                      <dd className={styles.position}>{member.position}</dd>
                    )}
                    {member.profile && (
                      <dd className={styles.profile}>{member.profile}</dd>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.qualifications}>
          <h2 className={styles.sectionTitle}>資格</h2>
          {qualError ? (
            <p className={styles.empty}>
              資格の取得に失敗しました。しばらくしてから再度お試しください。
            </p>
          ) : qualifications.length === 0 ? (
            <p className={styles.empty}>資格はまだ登録されていません。</p>
          ) : (
            <ul className={styles.qualList}>
              {qualifications.map((item) => (
                <li key={item.id} className={styles.qualItem}>
                  <div className={styles.qualName}>{item.qualifications}</div>
                  {item.time && (
                    <div className={styles.qualTime}>
                      {formatDate(item.time)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.careers}>
          <h2 className={styles.sectionTitle}>経歴と人生</h2>
          {careerError ? (
            <p className={styles.empty}>
              経歴の取得に失敗しました。しばらくしてから再度お試しください。
            </p>
          ) : careers.length === 0 ? (
            <p className={styles.empty}>経歴はまだ登録されていません。</p>
          ) : (
            <ul className={styles.careerList}>
              {careers.map((item) => (
                <li key={item.id} className={styles.careerItem}>
                  <div className={styles.careerDot}></div>
                  <div className={styles.careerContent}>
                    {item.time && (
                      <div className={styles.careerTime}>
                        {formatDate(item.time)}
                      </div>
                    )}
                    <div className={styles.careerName}>{item.name}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Duplicate qualifications and careers sections removed (already displayed inside the card) */}
    </>
  );
}

import { getQualificationsList } from "@/app/_libs/microcms";
import { formatDate } from "@/app/_libs/utils";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { contents: qualifications } = await getQualificationsList({
    limit: 1,
  });

  const qualification = qualifications.find((q) => q.id === params.id);

  if (!qualification) {
    return <p className={styles.empty}>資格が見つかりません。</p>;
  }

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <h1 className={styles.title}>{qualification.qualifications}</h1>
        {qualification.time && (
          <p className={styles.time}>{formatDate(qualification.time)}</p>
        )}
        {qualification.description && (
          <div className={styles.description}>{qualification.description}</div>
        )}
      </article>
      <div className={styles.footer}>
        <ButtonLink href="/Profile">プロフィールに戻る</ButtonLink>
      </div>
    </div>
  );
}

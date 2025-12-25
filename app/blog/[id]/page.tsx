import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    dk?: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  try {
    const data = await getBlogDetail(params.id, {
      draftKey: searchParams.dk,
    });

    return {
      title: data.title,
      description: data.description,
      openGraph: {
        title: data.title,
        description: data.description,
        images: [data?.thumbnail?.url ?? ""],
      },
    };
  } catch (e) {
    // 記事が見つからない場合は 404 を返す
    notFound();
  }
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getBlogDetail(params.id, {
    draftKey: searchParams.dk,
  }).catch(() => notFound());

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/blog">ブログ一覧へ</ButtonLink>
      </div>
    </>
  );
}

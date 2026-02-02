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
        images: [(data as any)?.image?.url || data?.thumbnail?.url || ""],
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

  // Check if this is an overseas training blog (title contains "海外研修")
  const reverseVideoContent = data.title.includes("海外研修");

  return (
    <>
      <Article data={data} reverseVideoContent={reverseVideoContent} />
      <div className={styles.footer}>
        <ButtonLink href="/blog">ブログ一覧へ</ButtonLink>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
  params: { id: string };
  searchParams: { dk?: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  try {
    const data = await getProjectDetail(params.id, {
      draftKey: searchParams.dk,
    });
    return {
      title: data.name,
      description: data.description ?? undefined,
      openGraph: {
        title: data.name,
        description: data.description ?? undefined,
        images: [data?.thumbnail?.url ?? ""],
      },
    };
  } catch (e) {
    notFound();
  }
}

export default async function ProjectDetail({ params, searchParams }: Props) {
  const data = await getProjectDetail(params.id, {
    draftKey: searchParams.dk,
  }).catch(() => notFound());

  // Map project fields to the Article component shape
  const articleLike = {
    title: (data as any).name,
    description: (data as any).description ?? "",
    content: (data as any).content ?? "",
    thumbnail: (data as any).thumbnail ?? undefined,
  } as any;

  return (
    <>
      <Article data={articleLike} />
      <div className={styles.footer}>
        <ButtonLink href="/projects">作品一覧へ</ButtonLink>
      </div>
    </>
  );
}

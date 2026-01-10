import { getBlogList } from "@/app/_libs/microcms";
import BlogList from "@/app/_components/BlogList";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import ButtonLink from "@/app/_components/ButtonLink";
import { BLOG_LIST_LIMIT } from "@/app/_constants";

export default async function Page() {
  const { contents: blogs, totalCount } = await getBlogList({
    limit: BLOG_LIST_LIMIT,
    orders: "-time",
  });

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}
      >
        <ButtonLink href="/projects">作品一覧へ</ButtonLink>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Blog</h1>
      </div>
      <SearchField />
      <BlogList blogs={blogs} />
      <Pagination totalCount={totalCount} />
    </>
  );
}

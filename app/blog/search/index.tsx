import { getBlogList } from "@/app/_libs/microcms";
import { BLOG_LIST_LIMIT} from "@/app/_constants";
import BlogList from "@/app/_components/BlogList";
import SearchField from "@/app/_components/SearchField";
import { get } from "http";

type Props = {
    searchParams: {
        q?: string;
    };
};

export default async function Page({ searchParams }: Props) {
    const { contents: blogs }= await getBlogList({
        limit: BLOG_LIST_LIMIT,
        q: searchParams.q,
        orders: "-time",
    });

    return (
        <>
           <SearchField />
           <BlogList blogs={blogs} />
        </>
    );
}
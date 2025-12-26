import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Qualification = {
  qualifications: string;
  time?: string;
  description?: string;
  thumbnail?: string;
} & MicroCMSListContent;

export type Career = {
  company: string;
  position: string;
  description?: string;
  startDate?: string;
  endDate?: string;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type Blog = {
  title: string;
  description: string;
  content: string;
  time?: string;
  thumbnail?: MicroCMSImage;
  category?: Category | null;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Member>({
    endpoint: "profile",
    queries,
  });
  return listData;
};

export const getQualificationsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Qualification>({
    endpoint: "qualifications",
    queries,
    customRequestInit: {
      next: { revalidate: 0 },
    },
  });
  return listData;
};

export const getCareerList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Career>({
    endpoint: "careers",
    queries,
    customRequestInit: {
      next: { revalidate: 0 },
    },
  });
  return listData;
};

export const getBlogList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blog",
    queries,
    customRequestInit: {
      next: { revalidate: 60 },
    },
  });
  return listData;
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detaiData = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId,
    queries,
    customRequestInit: {
      next: { revalidate: 60 },
    },
  });
  return detaiData;
};

// slug から記事を取得するヘルパ（slug を URL に使っている場合はこちらを利用）
export const getBlogBySlug = async (
  slug: string,
  queries?: MicroCMSQueries
) => {
  // queries に既に filters がある場合は結合する。簡易実装では既存 filters を上書きしないように組み立てる。
  const existingFilters = (queries as any)?.filters;
  const slugFilter = `slug[equals]${slug}`;
  const filters = existingFilters
    ? `${existingFilters} && ${slugFilter}`
    : slugFilter;

  const listData = await client.getList<Blog>({
    endpoint: "blog",
    queries: {
      ...(queries ?? {}),
      filters,
      limit: 1,
    } as unknown as MicroCMSQueries,
    customRequestInit: {
      next: { revalidate: 60 },
    },
  });

  if (!listData.contents || listData.contents.length === 0) {
    // 見つからない場合は呼び出し元で notFound() を投げせるためのエラー
    throw new Error("NotFound");
  }

  return listData.contents[0];
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};

export const getAllBlogList = async () => {
  const listData = await client.getAllContents<Blog>({
    endpoint: "blog",
  });
  return listData;
};

export const getAllCategoryList = async () => {
  const listData = await client.getAllContents<Category>({
    endpoint: "categories",
  });
  return listData;
};

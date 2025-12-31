import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/app/_libs/microcms";
import { convertYoutubeLinksToEmbeds, extractYoutubeId, getEmbedUrl } from "@/app/_libs/youtube";
import Date from "../Date";
import Category from "../Category";
import styles from "./index.module.css";

type Props = {
    data: Blog;
}

export default function Article({ data }: Props) {
    const contentWithYoutubeEmbeds = convertYoutubeLinksToEmbeds(data.content);
    
    // videoUrl が視聴ページURLの場合、埋め込みURLに変換
    const videoEmbedUrl = data.videoUrl ? (() => {
        const videoId = extractYoutubeId(data.videoUrl);
        return videoId ? getEmbedUrl(videoId) : data.videoUrl;
    })() : null;

    return (
        <main>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.description}>{data.description}</p>
            <div className={styles.meta}>
                {data.category ? (
                    <Link
                      href={`/blog/category/${data.category.id}`}
                      className={styles.categoryLink}
                    >
                        <Category category={data.category} />
                    </Link>
                ) : (
                    <Category category={data.category} />
                )}
                <Date date={data.time ?? data.publishedAt ?? data.createdAt} />
            </div>
            { data.thumbnail && (
                <Image
                    src={data.thumbnail.url}
                    alt=""
                    className={styles.thumbnail}
                    width={data.thumbnail.width}
                    height={data.thumbnail.height}
                />
            )}
            { videoEmbedUrl && (
                <iframe
                    src={videoEmbedUrl}
                    className={styles.video}
                    allowFullScreen
                />
            )}
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                    __html: contentWithYoutubeEmbeds,
                }}
            />
        </main>
    );
}
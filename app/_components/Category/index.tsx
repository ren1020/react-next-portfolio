import type { Category } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
    category?: Category | null;
};
export default function Category({ category }: Props) {
    const label = category?.name ?? "未分類";
    return <span className={styles.tag}>{label}</span>;
}
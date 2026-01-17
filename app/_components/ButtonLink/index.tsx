"use client";
import styles from "./index.module.css";

type Props = {
    href: string;
    children: React.ReactNode;
};

export default function ButtonLink({ href, children }: Props) {
    return (
        <a href={href} className={styles.button}>
            <span className={styles.buttonText}>{children}</span>
            <span className={styles.buttonRipple}></span>
        </a>
    );
}
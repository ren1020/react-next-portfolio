import styles from "./page.module.css";
import ContactForm from "@/app/_components/ContactForm";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.pageTopBar}>
        <div className={styles.headerRight} />
      </div>
      <div className={styles.pageHeader}>
        <h1 className="pageTitle">Contact</h1>
      </div>
      <p className={styles.text}>
        ご質問やご依頼は下記フォームよりお問い合わせください。
        <br />
        内容確認後、ご連絡いたします。
      </p>
      <ContactForm />
    </div>
  );
}

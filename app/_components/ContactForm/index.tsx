"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createContactData } from "@/app/_actions/contact";
import { useFormState } from "react-dom";
import styles from "./index.module.css";

const initialState = {
  status: "",
  message: "",
};

const ContactSchema = z.object({
  lastname: z.string().nonempty({ message: "姓を入力してください。" }),
  firstname: z.string().nonempty({ message: "名を入力してください。" }),
  company: z.string().optional(),
  email: z.string().email({ message: "メールアドレスの形式が誤っています。" }),
  message: z.string().nonempty({ message: "メッセージを入力してください。" }),
  hp: z.string().optional(),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const [state, formAction] = useFormState(createContactData, initialState);
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(ContactSchema) });

  // We validate with react-hook-form/zod, then if valid submit the native form
  const handleClientValidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // run validation for all fields
    const valid = await trigger();
    if (!valid) {
      // focus first errored field
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        const el = e.currentTarget.querySelector(
          `#${firstKey}`
        ) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

    // If honeypot field filled, stop submission
    const fd = new FormData(e.currentTarget);
    const hp = (fd.get("hp") ?? "").toString();
    if (hp) {
      // treat as bot
      return;
    }

    // all good -> submit the form to server action
    // use requestSubmit to trigger native submit with action={formAction}
    (e.currentTarget as HTMLFormElement).requestSubmit();
  };

  if (state.status === "success") {
    return (
      <p className={styles.success}>
        お問い合わせありがとうございます。
        <br />
        お返事まで今しばらくお待ちください。
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      action={formAction}
      onSubmit={handleClientValidate}
    >
      <div className={styles.horizontal}>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="lastname">
            性<span className={styles.required}>※</span>
          </label>
          <input
            className={styles.textfield}
            type="text"
            id="lastname"
            {...register("lastname")}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="firstname">
            名<span className={styles.required}>※</span>
          </label>
          <input
            className={styles.textfield}
            type="text"
            id="firstname"
            {...register("firstname")}
          />
        </div>
      </div>
      <div className={styles.item}>
        <label className={styles.label} htmlFor="company">
          会社名
        </label>
        <input
          className={styles.textfield}
          type="text"
          id="company"
          {...register("company")}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label} htmlFor="email">
          メールアドレス<span className={styles.required}>※</span>
        </label>
        <input
          className={styles.textfield}
          type="email"
          id="email"
          {...register("email")}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label} htmlFor="message">
          メッセージ<span className={styles.required}>※</span>
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          {...register("message")}
          rows={6}
        ></textarea>
      </div>
      {/* honeypot field to reduce spam bots */}
      <input
        type="text"
        id="hp"
        {...register("hp")}
        aria-hidden="true"
        tabIndex={-1}
        className={styles.honeypot}
        defaultValue=""
      />
      <div className={styles.actions}>
        {/* validation messages: prefer zod/react-hook-form errors first, then server errors */}
        {Object.keys(errors).length > 0 && (
          <p className={styles.error}>
            {
              // pick first error message
              errors[Object.keys(errors)[0] as keyof typeof errors]
                ?.message as string
            }
          </p>
        )}
        {state.status === "error" && (
          <p className={styles.error}>{state.message}</p>
        )}
        <input type="submit" value="送信する" className={styles.button} />
      </div>
    </form>
  );
}

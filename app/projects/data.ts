export type Project = {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  image?: string;
  description: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: "portfolio-site",
    title: "Portfolio Site",
    summary: "Next.js と TypeScript を使った個人ポートフォリオサイト",
    tech: ["Next.js", "TypeScript", "microCMS"],
    image: "/profile.png",
    description:
      "このサイト自体の実装。App Router / metadata / OGP / レスポンシブ対応を重視して作成しました。ブログやプロフィール、問い合わせフォームを含みます。",
    github: "https://github.com/yourname/portfolio",
  },
  {
    id: "todo-app",
    title: "Simple Todo App",
    summary: "学習用に作ったシンプルなTodoアプリ",
    tech: ["React", "LocalStorage", "CSS Modules"],
    image: "/img-mv.jpg",
    description:
      "タスクの追加・編集・削除・完了管理ができるシンプルなアプリ。UI/UXの基礎を学ぶために作成しました。",
    github: "https://github.com/yourname/todo-app",
    live: "https://todo.example.com",
  },
];

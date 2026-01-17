import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";

export const metadata = {
  title: "Projects",
};

type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function ProjectsLayout({ children }: Props) {
  return (
    <>
      <Hero
        title="Projects"
        sub="作品一覧"
        withBackground={false}
        currentPage="projects"
      />
      <Sheet>{children}</Sheet>
    </>
  );
}

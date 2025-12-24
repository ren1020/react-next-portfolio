import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";

export const metadata = {
    title: "ブログ",
};

type Props = {
    children: React.ReactNode;
};

export const revalidate = 60;

export default function BlogLayout({ children }: Props) {
    return (
        <>
        <Hero title="BLOG" sub="ブログ" withBackground={false} />
        <Sheet>{children}</Sheet>
        </>
    );
}
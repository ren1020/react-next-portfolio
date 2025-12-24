import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

export const metadata = {
  title: "Profile",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Profile" sub="Profile" withBackground={false} />
      <Sheet>{children}</Sheet>
    </>
  );
}

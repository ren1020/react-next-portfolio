import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";
import { title } from "process";

export const metadata = {
  title: "Profile",
};

type Proos = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Proos) {
  return (
    <>
      <Hero title="Members" sub="Profile" />
      <Sheet>{children}</Sheet>
    </>
  );
}

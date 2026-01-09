import "./globals.css";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import PageTransition from "./_components/PageTransition";
import PageLoader from "./_components/PageLoader";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | Portfolio",
    default: "Portfolio",
  },
  description:
    "学びや制作の気づきをまとめたポートフォリオサイトです。",
  openGraph: {
    title: "Portfolio",
    description:
      "学びや制作の気づきをまとめたポートフォリオサイトです。",
    images: ["/ogp.png"],
  },
  alternates: {
    canonical: "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="app">
        <PageLoader />
        <PageTransition>
          <Header />
          {children}
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}

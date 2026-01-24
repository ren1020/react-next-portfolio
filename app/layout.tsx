import "./globals.css";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import PageTransition from "./_components/PageTransition";
import PageLoader from "./_components/PageLoader";
import BackgroundDots from "./_components/BackgroundDots";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | Portfolio",
    default: "Portfolio",
  },
  description: "学びや制作の気づきをまとめたポートフォリオサイトです。",
  openGraph: {
    title: "Portfolio",
    description: "学びや制作の気づきをまとめたポートフォリオサイトです。",
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
        <BackgroundDots />
        <div className="content">
          <PageTransition>
            <div className="container">
              <Header />
              {children}
              <Footer />
            </div>
          </PageTransition>
        </div>
      </body>
    </html>
  );
}

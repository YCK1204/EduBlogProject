import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import LangFAB from "@/components/LangFAB";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: "DevNote - 개발 공부 블로그",
  description: "자료구조, 알고리즘, CS기초, 프로그래밍을 공부하는 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <div className="sticky top-0 z-50 shrink-0">
              <Header />
            </div>
            <MainWrapper>{children}</MainWrapper>
            <LangFAB />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

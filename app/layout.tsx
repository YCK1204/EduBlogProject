import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import LangFAB from "@/components/LangFAB";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: "AIkido - AI 시대의 필수 CS 지식",
  description: "AI가 코드를 작성해줘도, 더 나은 결과를 위해서는 개발자의 기초 지식이 필요합니다. 언제 어떤 기법을 쓸지, 성능 문제는 어디서 생기는지를 알고 있어야 AI와 효과적으로 협업할 수 있습니다.",
  openGraph: {
    title: "AIkido - AI 시대의 필수 CS 지식",
    description: "AI와 효과적으로 협업하기 위한 CS 기초지식을 학습하세요",
    type: "website",
    siteName: "AIkido",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
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

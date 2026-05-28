"use client";

import { usePathname } from "next/navigation";
import FooterText from "./FooterText";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/dev")) {
    return <div className="flex-1 overflow-hidden flex flex-col">{children}</div>;
  }

  return (
    <>
      <main className="flex-1 px-[10%] py-10">{children}</main>
      <footer className="shrink-0 mt-20 border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="flex items-center justify-center">
          <FooterText />
        </div>
      </footer>
    </>
  );
}

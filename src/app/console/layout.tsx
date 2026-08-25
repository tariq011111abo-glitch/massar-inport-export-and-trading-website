import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Massar Console",
  robots: { index: false, follow: false },
};

export default function ConsoleRootLayout({ children }: { children: ReactNode }) {
  return children;
}

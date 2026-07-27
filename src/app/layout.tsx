import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Analyzer — AI-Powered CV Feedback",
  description:
    "Upload your CV and get instant, AI-powered feedback on scoring, strengths, improvements, and suitable roles.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("resume-analyzer-theme");
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${inter.className} min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

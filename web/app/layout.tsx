import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-jbm", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Plinth: decks with an argument",
  description:
    "A Claude skill that builds pitch decks and talks with one claim per slide, then lints the words. Built on data from 5,428 Colosseum hackathon projects.",
  icons: { icon: { url: "/logo.svg", type: "image/svg+xml" } },
  openGraph: {
    title: "Plinth: decks with an argument",
    description: "A Claude skill for pitch decks and talks. Headlines first, slides second, lint last.",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body>
        {/* Shared with the static site, copied unchanged from site/ by scripts/sync-public.mjs */}
        <Script src="/lint-core.js" strategy="beforeInteractive" />
        <Script src="/i18n.js" strategy="beforeInteractive" />
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

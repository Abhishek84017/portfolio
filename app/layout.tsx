import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import { profile } from "@/data/profile";
import { themeInitScript } from "@/lib/theme-script";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Senior Flutter Developer with 4+ years shipping cross-platform apps to 20,000+ users — 6+ production apps across solar, healthcare, wellness and education, including HIPAA-aware healthcare work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.socials.github }],
  creator: profile.name,
  keywords: [
    "Abhishek Patel",
    "Senior Flutter Developer",
    "Flutter",
    "Dart",
    "Cross-platform mobile",
    "BLoC",
    "HIPAA",
    "Surat",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0b0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-full bg-elevated px-4 py-2 text-sm text-fg ring-1 ring-line transition-transform duration-200 ease-out-expo focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <div aria-hidden className="ambient">
          <div
            className="animate-orbit absolute -top-[20vh] -left-[10vw] size-[70vw] max-h-[56rem] max-w-[56rem] rounded-full"
            style={{ background: "radial-gradient(circle, var(--ambient-1), transparent 65%)" }}
          />
          <div
            className="animate-orbit absolute top-[35vh] -right-[20vw] size-[60vw] max-h-[48rem] max-w-[48rem] rounded-full"
            style={{ background: "radial-gradient(circle, var(--ambient-2), transparent 65%)", animationDelay: "-14s" }}
          />
        </div>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

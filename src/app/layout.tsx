import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Metrika from "@/components/Metrika";
import { themeInitScript, THEME_BAR_COLORS } from "@/lib/theme";
import { SITE_URL, YANDEX_VERIFICATION, GOOGLE_VERIFICATION } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const description =
  "Creative Rights — юристы для музыкантов. Проверка и составление договоров с лейблом, дистрибьютором, продюсером и соавторами за 24 часа: ИИ размечает риски, юрист проверяет и объясняет простыми словами.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CreativeRights — юристы для музыкантов",
    template: "%s — CreativeRights",
  },
  description,
  applicationName: "CreativeRights",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "CreativeRights",
    title: "CreativeRights — юристы для музыкантов",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CreativeRights" }],
  },
  verification: {
    yandex: YANDEX_VERIFICATION || undefined,
    google: GOOGLE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={THEME_BAR_COLORS.light} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Metrika />
      </body>
    </html>
  );
}

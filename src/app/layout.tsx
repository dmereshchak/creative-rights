import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Metrika from "@/components/Metrika";
import { themeInitScript } from "@/lib/theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "CreativeRights — юристы для музыкантов",
  description:
    "Проверка договора с лейблом, дистрибьютором или продюсером за 24 часа. ИИ размечает риски, юрист проверяет и объясняет простыми словами.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Metrika />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "../styles/globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  style: "normal",
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: "normal",
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gbox",
  description:
    "Gbox unifies your Google and Outlook emails into a single, clutter-free space. Fast, secure, and built with simplicity at its core. so you can focus on conversations, not chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

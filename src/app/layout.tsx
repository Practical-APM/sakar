import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "nes.css/css/nes.min.css";
import "./globals.css";

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "PRODUCT QUEST — Sakar Baxi",
  description:
    "8-bit portfolio of Sakar Baxi, AI Product Manager. Projects, experience, and contact.",
  openGraph: {
    title: "PRODUCT QUEST — Sakar Baxi",
    description:
      "8-bit portfolio of Sakar Baxi, AI Product Manager in Gurugram.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixel.variable} h-full`}>
      <body className="min-h-full pixel-body">{children}</body>
    </html>
  );
}

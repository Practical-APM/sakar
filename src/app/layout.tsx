import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Great_Vibes } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const signature = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sakar Baxi — Product Thinker",
  description:
    "I stitch problems, systems and people into meaningful products.",
  openGraph: {
    title: "Sakar Baxi — Product Thinker",
    description:
      "I stitch problems, systems and people into meaningful products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${display.variable} ${body.variable} ${signature.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/textures/linen-hero.jpg"
          type="image/jpeg"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakar Baxi — Product Manager & Builder",
  description:
    "Product Manager with experience shipping AI solutions, API integrations, and scalable onboarding flows. Currently at TartanHQ in Gurugram, India.",
  keywords: [
    "Sakar Baxi",
    "Product Manager",
    "TartanHQ",
    "Portfolio",
    "B2B SaaS",
    "AI",
    "Product Strategy",
  ],
  authors: [{ name: "Sakar Baxi" }],
  openGraph: {
    title: "Sakar Baxi — Product Manager & Builder",
    description:
      "Product Manager turning product goals into shipped improvements across AI solutions and B2B enterprise accounts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Calendly Popup Widget Assets */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

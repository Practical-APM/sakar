import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sakarbaxi.com"),
  title: "Sakar Baxi — Product Manager & Builder",
  description:
    "Product Manager with experience shipping AI solutions, API integrations, and scalable onboarding flows. Currently at TartanHQ in Gurugram, India.",
  keywords: [
    "Sakar Baxi",
    "Product Manager",
    "TartanHQ",
    "Portfolio",
    "B2B SaaS",
    "AI FinOps",
    "Product Strategy",
    "Gurugram",
  ],
  authors: [{ name: "Sakar Baxi" }],
  creator: "Sakar Baxi",
  openGraph: {
    title: "Sakar Baxi — Product Manager & Builder",
    description:
      "Product Manager turning product goals into shipped improvements across AI solutions and B2B enterprise accounts.",
    url: "https://sakarbaxi.com",
    siteName: "Sakar Baxi Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1080,
        height: 1080,
        alt: "Sakar Baxi — Product Manager & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakar Baxi — Product Manager & Builder",
    description:
      "Product Manager turning product goals into shipped improvements across AI solutions and B2B enterprise accounts.",
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg",
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
        {/* JSON-LD Structured Data for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sakar Baxi",
              jobTitle: "Product Manager",
              worksFor: {
                "@type": "Organization",
                name: "TartanHQ",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gurugram",
                addressCountry: "India",
              },
              url: "https://sakarbaxi.com",
              sameAs: [
                "https://github.com/Practical-APM",
                "https://linkedin.com/in/sakar-baxi",
              ],
              description:
                "Product Manager with experience shipping AI solutions, API integrations, and scalable onboarding flows.",
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hrseo.io"),

  title: {
    default: "HRSEO - SEO Tool",
    template: "%s | HRSEO",
  },
  description:
    "Hazlo Rentable - HRSEO a SEO tools package. Productive keyword research, SERP analysis, rank tracking and backlink analysis thanks to super easy to use tools.",

  keywords: [
    "HRSEO",
    "SEO Tool",
    "Keyword Research",
    "SEO Analysis",
    "Search Engine Optimization",
    "Digital Marketing",
    "Content Optimization",
    "Backlink Analysis",
    "Website Audit",
    "Rank Tracking",
  ],

  authors: [{ name: "HRSEO", url: "https://hrseo.io" }],

  creator: "Hazlo Rentable",
  publisher: "Hazlo Rentable",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hrseo.io",
    siteName: "HRSEO",
    title: "HRSEO - SEO Tool",
    description:
      "Hazlo Rentable - HRSEO a SEO Tool for Keyword research with modern SEO needs",
    images: [
      {
        url: "https://yourdomain.com/og-image-1200x630.jpg", // 1200x630px required
        width: 1200,
        height: 630,
        alt: "hrseo - Feature Preview",
        type: "image/jpeg",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://hrseo.io",
    languages: {
      "en-US": "https://hrseo.io/en-us",
    },
  },

  verification: {
    google: "HRSEO_GOOGLE_VERIFICATION_CODE",
    yandex: "HRSEO_YANDEX_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

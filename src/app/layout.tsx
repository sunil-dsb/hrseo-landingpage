import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Primary font - Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// Modern alternative font - Inter
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Custom local font - HRSEO
const hrseoFont = localFont({
  src: [
    {
      path: "../../public/fonts/hrseo.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-hrseo",
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

  // Favicon configuration
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512", 
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",

  openGraph: {
    type: "website",
    url: "https://hrseo.io",
    siteName: "HRSEO",
    title: "HRSEO - SEO Tool",
    description:
      "Hazlo Rentable - HRSEO a SEO Tool for Keyword research with modern SEO needs",
    images: [
      {
        url: "/logo.png", // Use your existing logo for now
        width: 1200,
        height: 630,
        alt: "HRSEO - SEO Tool Preview",
        type: "image/png",
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
  },

  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${inter.variable} ${hrseoFont.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="hrseo-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

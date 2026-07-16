import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { business } from "@/lib/config";
import { getNonce } from "@/lib/nonce";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Exterior & Trash Bin Cleaning in Miami-Dade`,
    template: `%s | ${business.name}`,
  },
  description:
    "Professional exterior cleaning and trash bin cleaning services for homes and businesses in Hialeah, Miami Lakes, Miami Gardens, Miramar and surrounding Miami-Dade areas.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: business.name,
  telephone: business.phoneDisplay,
  email: business.email,
  url: business.siteUrl,
  areaServed: business.serviceAreas.map((area) => ({
    "@type": "City",
    name: area,
  })),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const nonce = await getNonce();

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

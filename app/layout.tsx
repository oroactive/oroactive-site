import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { PwaRegister } from "@/components/PwaRegister";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OroActive | Compro oro premium, quotazioni live e Academy",
    template: "%s | OroActive"
  },
  description: "OroActive unisce compro oro premium, tecnologia, quotazioni live, formazione Academy e servizi franchising.",
  applicationName: "OroActive",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "OroActive",
    description: "Compro oro tecnologico, premium e trasparente.",
    url: siteUrl,
    siteName: "OroActive",
    type: "website",
    locale: "it_IT"
  },
  twitter: {
    card: "summary_large_image",
    title: "OroActive",
    description: "Compro oro premium e tecnologia gestionale proprietaria."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${space.variable}`}>
      <body className="font-sans antialiased">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}

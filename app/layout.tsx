import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nefe Clarke | Customer Success Specialist & AI Automation Engineer",
  description:
    "Portfolio of Nefe Clarke (Damatie Ufuomanefe) — Customer Success Specialist, Project Manager, and AI Automation Engineer with 5+ years of experience driving retention, satisfaction, and revenue through human-first solutions.",
  keywords: [
    "Nefe Clarke",
    "Damatie Ufuomanefe",
    "Customer Success Specialist",
    "Project Manager",
    "AI Automation Engineer",
    "Customer Support",
    "Email Marketing",
    "CRM",
    "HubSpot",
    "Lagos Nigeria",
  ],
  authors: [{ name: "Nefe Clarke", url: "https://www.linkedin.com/in/nefe-damatie-/" }],
  creator: "Nefe Clarke",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nefe Clarke | Customer Success Specialist & AI Automation Engineer",
    description:
      "Customer-focused professional transforming support into strategic growth. 5+ years driving retention, satisfaction, and revenue.",
    siteName: "Nefe Clarke Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nefe Clarke | Customer Success Specialist & AI Automation Engineer",
    description:
      "Customer-focused professional transforming support into strategic growth. 5+ years driving retention, satisfaction, and revenue.",
    creator: "@nefeclarke",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

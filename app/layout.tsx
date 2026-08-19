import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nefe Clarke | Communications & Marketing Specialist",
  description:
    "Nefe Clarke is a communications and marketing specialist in Lagos, Nigeria. Email and campaign strategy, content and storytelling, and virtual assistance for founders and small teams.",
  keywords: [
    "Nefe Clarke",
    "Damatie Ufuomanefe",
    "Communications Specialist",
    "Marketing Specialist",
    "Email Marketing",
    "Campaign Strategy",
    "Virtual Assistant",
    "Content Writer",
    "Storyteller",
    "Podcast Host",
    "Voiceover",
    "AI Content Systems",
    "Dawn at Dusk",
    "Lagos Nigeria",
  ],
  authors: [{ name: "Nefe Clarke" }],
  creator: "Nefe Clarke",
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
  openGraph: {
    title: "Nefe Clarke | Communications & Marketing Specialist",
    description:
      "Get heard. Get results. Get your time back. Email and campaign strategy, content and storytelling, and virtual assistance.",
    url: "https://nefeclarke.com",
    siteName: "Nefe Clarke",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nefe Clarke | Communications & Marketing Specialist",
    description:
      "Get heard. Get results. Get your time back. Email and campaign strategy, content and storytelling, and virtual assistance.",
    creator: "@nefeclarke",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

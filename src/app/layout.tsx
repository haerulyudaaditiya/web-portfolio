import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://haerulyuda.dev'),
  title: "Haerul Yuda Aditiya | Award-Winning Full Stack Developer",
  description: "National award-winning Full Stack Developer specializing in Laravel, React, and Mobile Development. Turning complex problems into elegant code.",
  keywords: ["Full Stack Developer", "Laravel", "React", "Web Developer", "Mobile Developer", "Indonesia", "Portfolio"],
  authors: [{ name: "Haerul Yuda Aditiya" }],
  openGraph: {
    type: "website",
    url: "https://haerulyuda.dev",
    title: "Haerul Yuda Aditiya | Full Stack Developer",
    description: "Award-winning developer building digital experiences that win.",
    images: ["/images/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haerul Yuda Aditiya | Full Stack Developer",
    description: "Turning complex problems into elegant code.",
    images: ["/images/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#06b6d4" />
        <link rel="canonical" href="https://haerulyuda.dev" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-white selection:bg-cyan-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
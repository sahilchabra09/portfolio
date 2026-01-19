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
  title: "Sahil Chabra | Frontend Developer",
  description: "Frontend-focused full stack developer specializing in React, Next.js, animations and modern UI systems. Building immersive web experiences.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Web Developer", "UI/UX", "Animations"],
  authors: [{ name: "Sahil Chabra" }],
  openGraph: {
    title: "Sahil Chabra | Frontend Developer",
    description: "Frontend-focused full stack developer specializing in React, Next.js, animations and modern UI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-[#e5e5e5]`}
      >
        {children}
      </body>
    </html>
  );
}

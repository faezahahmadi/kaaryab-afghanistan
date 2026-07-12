import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/header/NavBar";
import Footer from "@/components/footer/Footer";
import { OpportunityProvider } from "@/context/OpportunityContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KarYaab Afghanistan",
  description: "find Jobs and Opportunities in Afghanistan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OpportunityProvider>
          <NavBar />
          {children}
          <Footer />
        </OpportunityProvider>
      </body>
    </html>
  );
}

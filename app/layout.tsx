import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Inkwell — Stories Worth Reading",
    template: "%s | Inkwell",
  },
  description:
    "Inkwell is a modern blog platform featuring thoughtful articles on technology, culture, design, and the human experience.",
  keywords: ["blog", "articles", "technology", "culture", "design", "writing"],
  authors: [{ name: "Inkwell Editorial Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Inkwell",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-gray-900 font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
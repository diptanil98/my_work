import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const handwritingFont = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "For You | An Honest Apology",
  description: "A private letter and interactive reflection. Everything I couldn't say properly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${handwritingFont.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-[#08080D] text-[#F8F7F4] font-sans antialiased selection:bg-[#E05263]/30 selection:text-[#F8F7F4] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

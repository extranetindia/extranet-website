import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Extranet | Fiber Broadband & Customer Portal",
  description:
    "Reliable fiber broadband for homes and businesses. View plans, manage your connection, and pay bills online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-white font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}

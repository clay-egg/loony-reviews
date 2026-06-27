import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BabyLoony's Reviews",
    template: "%s | BabyLoony's Reviews 🎀"
  },
  description: "รวมพิกัดของรีวิวน่ารักๆ จาก TikTok ช้อปง่ายตรงปก ของแต่งห้อง เครื่องเขียน และบิวตี้ไอเท็มสุดคิวท์ พร้อมลิงก์ตรงจากร้านค้าในไทย 100% 🎀",
  keywords: ["BabyLoony", "รีวิวของน่ารัก", "พิกัด Shopee", "แต่งห้องมินิมอล", "เครื่องเขียนน่ารัก", "รีวิว TikTok", "ของกุ๊กกิ๊ก"],
  authors: [{ name: "BabyLoony" }],
  openGraph: {
    title: "BabyLoony's Reviews",
    description: "รวมพิกัดของรีวิวน่ารักๆ จาก TikTok ช้อปง่ายตรงปก ของแต่งห้อง เครื่องเขียน และบิวตี้ไอเท็มสุดคิวท์ พร้อมลิงก์ตรงจากร้านค้าในไทย 100% 🎀",
    type: "website",
    locale: "th_TH",
    siteName: "BabyLoony's Reviews"
  },
  twitter: {
    card: "summary_large_image",
    title: "BabyLoony's Reviews",
    description: "รวมพิกัดของรีวิวน่ารักๆ จาก TikTok ช้อปง่ายตรงปก พร้อมลิงก์ตรงจากร้านค้าในไทย 100% 🎀"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", figtree.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

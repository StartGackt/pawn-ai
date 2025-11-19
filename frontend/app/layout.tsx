import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "Pawn AI Analytics - ระบบวิเคราะห์ข้อมูลอัจฉริยะ สธค.",
  description: "ระบบวิเคราะห์ข้อมูลอัจฉริยะ + ระบบคาดการณ์ + AI Chatbot สำหรับสำนักงานธนานุเคราะห์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${sarabun.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

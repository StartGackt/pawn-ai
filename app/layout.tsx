import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-sans",
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
      <body className={`${prompt.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

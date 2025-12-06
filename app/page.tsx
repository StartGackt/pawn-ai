import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MessageSquare,
  TrendingUp,
  BarChart3,
  LayoutDashboard
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-linear-to-b from-background to-muted/50 px-4">
        <div className="absolute inset-0 bg-grid-white/10 bg-size-[20px_20px]" />
        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">AI Chatbot System</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            ระบบแชทบอทคาดการณ์
            <br />
            <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              สำนักงานธนานุเคราะห์
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            ผมสามารถช่วยคุณวิเคราะห์ข้อมูล คาดการณ์แนวโน้ม
            และตอบคำถามเกี่ยวกับข้อมูลต่างๆ ได้อย่างรวดเร็ว
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 px-8">
              <Link href="/chat">
                <MessageSquare className="h-5 w-5" />
                เริ่มแชทเลย
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 px-8">
              <Link href="/dashboard">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>คาดการณ์แนวโน้ม</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              <span>วิเคราะห์ข้อมูล</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>AI อัจฉริยะ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 สำนักงานธนานุเคราะห์ - Pawn AI Chatbot System</p>
        </div>
      </footer>
    </div>
  );
}

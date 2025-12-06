import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Shield,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-linear-to-b from-background to-muted/50 px-4">
        <div className="absolute inset-0 bg-grid-white/10 bg-size-[20px_20px]" />
        <div className="container relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">AI-Powered Analytics System</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            ระบบวิเคราะห์ข้อมูลอัจฉริยะ
            <br />
            <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              สำนักงานธนานุเคราะห์
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            ระบบคาดการณ์และวิเคราะห์ข้อมูลด้วย Machine Learning
            พร้อม AI Chatbot ที่จะช่วยตอบคำถามและให้คำแนะนำอัจฉริยะ
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/dashboard">
                <BarChart3 className="h-5 w-5" />
                เข้าสู่แดชบอร์ด
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/chat">
                <MessageSquare className="h-5 w-5" />
                ทดลอง AI Chatbot
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">ความสามารถของระบบ</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">คาดการณ์อัจฉริยะ</h3>
              <p className="text-muted-foreground">
                คาดการณ์ราคาทองคำและทรัพย์หลุดจำนำด้วย Machine Learning
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI Chatbot</h3>
              <p className="text-muted-foreground">
                ถาม-ตอบอัจฉริยะด้วย Hybrid LLM (Local + Cloud AI)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">วิเคราะห์ข้อมูล</h3>
              <p className="text-muted-foreground">
                Dashboard และกราฟวิเคราะห์ข้อมูลแบบ Real-time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">ML Models</h3>
              <p className="text-muted-foreground">
                โมเดล Time Series, Classification และ Regression
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <Shield className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">ปลอดภัย</h3>
              <p className="text-muted-foreground">
                รักษาความปลอดภัยข้อมูลตามมาตรฐาน PDPA
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">รวดเร็ว</h3>
              <p className="text-muted-foreground">
                ประมวลผลและแสดงผลแบบ Real-time
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 สำนักงานธนานุเคราะห์ - Pawn AI Analytics System</p>
        </div>
      </footer>
    </div>
  );
}

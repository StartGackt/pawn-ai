"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar as CalendarIcon, FileSpreadsheet, Printer, Eye, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const reportTemplates = [
    {
        id: "daily-summary",
        name: "รายงานสรุปรายวัน",
        description: "สรุปยอดการจำนำ การไถ่ถอน และทรัพย์หลุดจำนำประจำวัน",
        category: "daily",
        icon: FileText,
    },
    {
        id: "monthly-performance",
        name: "รายงานผลการดำเนินงานรายเดือน",
        description: "วิเคราะห์ผลการดำเนินงาน KPIs และเปรียบเทียบกับเป้าหมาย",
        category: "monthly",
        icon: FileSpreadsheet,
    },
    {
        id: "gold-price-analysis",
        name: "รายงานวิเคราะห์ราคาทอง",
        description: "แนวโน้มราคาทอง ความสัมพันธ์กับปัจจัยต่างๆ และการคาดการณ์",
        category: "analysis",
        icon: FileText,
    },
    {
        id: "forfeited-assets",
        name: "รายงานทรัพย์หลุดจำนำ",
        description: "รายการทรัพย์หลุดจำนำ การจัดการ และผลการขาย",
        category: "monthly",
        icon: FileText,
    },
    {
        id: "customer-analysis",
        name: "รายงานวิเคราะห์ลูกค้า",
        description: "การแบ่งกลุ่มลูกค้า พฤติกรรม และความเสี่ยง",
        category: "analysis",
        icon: FileSpreadsheet,
    },
    {
        id: "branch-comparison",
        name: "รายงานเปรียบเทียบสาขา",
        description: "ประสิทธิภาพและผลการดำเนินงานของแต่ละสาขา",
        category: "monthly",
        icon: FileText,
    },
    {
        id: "financial-summary",
        name: "รายงานสรุปทางการเงิน",
        description: "สรุปรายได้ ค่าใช้จ่าย และกำไร-ขาดทุน",
        category: "monthly",
        icon: FileIcon,
    },
    {
        id: "prediction-accuracy",
        name: "รายงานความแม่นยำการคาดการณ์",
        description: "ประเมินประสิทธิภาพโมเดล ML และความแม่นยำ",
        category: "analysis",
        icon: FileSpreadsheet,
    },
];

const recentReports = [
    { name: "รายงานสรุปรายวัน - 15 ม.ค. 2568", date: "15/01/2568", size: "2.4 MB", format: "PDF" },
    { name: "รายงานผลการดำเนินงาน - ธ.ค. 2567", date: "05/01/2568", size: "5.8 MB", format: "Excel" },
    { name: "รายงานวิเคราะห์ราคาทอง - Q4 2567", date: "02/01/2568", size: "3.1 MB", format: "PDF" },
    { name: "รายงานทรัพย์หลุดจำนำ - ธ.ค. 2567", date: "01/01/2568", size: "1.9 MB", format: "PDF" },
];

export default function ReportsPage() {
    const [selectedTemplate, setSelectedTemplate] = React.useState<string>("");
    const [dateFrom, setDateFrom] = React.useState("");
    const [dateTo, setDateTo] = React.useState("");
    const [selectedBranch, setSelectedBranch] = React.useState("all");
    const [reportFormat, setReportFormat] = React.useState("pdf");
    const [category, setCategory] = React.useState("all");

    const branches = ["ทุกสาขา", "สาขากลาง", "สาขาเหนือ", "สาขาใต้", "สาขาตะวันออก", "สาขาตะวันตก"];

    const filteredTemplates = category === "all"
        ? reportTemplates
        : reportTemplates.filter(t => t.category === category);

    const handleGenerateReport = () => {
        alert(`กำลังสร้างรายงาน: ${reportTemplates.find(t => t.id === selectedTemplate)?.name}\nรูปแบบ: ${reportFormat.toUpperCase()}\nช่วงเวลา: ${dateFrom || '-'} ถึง ${dateTo || '-'}\nสาขา: ${selectedBranch}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">รายงาน</h1>
                <p className="text-muted-foreground">
                    สร้างและจัดการรายงานต่างๆ
                </p>
            </div>

            <Tabs defaultValue="generate" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="generate">สร้างรายงาน</TabsTrigger>
                    <TabsTrigger value="recent">รายงานล่าสุด</TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="space-y-6 mt-6">
                    {/* Template Selection */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>เลือกแบบรายงาน</CardTitle>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="ประเภท" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">ทั้งหมด</SelectItem>
                                        <SelectItem value="daily">รายวัน</SelectItem>
                                        <SelectItem value="monthly">รายเดือน</SelectItem>
                                        <SelectItem value="analysis">วิเคราะห์</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredTemplates.map((template) => {
                                    const Icon = template.icon;
                                    return (
                                        <button
                                            key={template.id}
                                            onClick={() => setSelectedTemplate(template.id)}
                                            className={cn(
                                                "text-left p-4 rounded-lg border transition-all",
                                                selectedTemplate === template.id
                                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                    : "hover:border-primary/50 hover:bg-muted/50"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                <Icon className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-sm mb-1">{template.name}</h3>
                                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                                        {template.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Configuration */}
                    {selectedTemplate && (
                        <Card>
                            <CardHeader>
                                <CardTitle>ตั้งค่ารายงาน</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Date Range */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">วันที่เริ่มต้น</label>
                                        <Input
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">วันที่สิ้นสุด</label>
                                        <Input
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Branch Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">เลือกสาขา</label>
                                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกสาขา" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branches.map((branch, index) => (
                                                <SelectItem key={index} value={index === 0 ? "all" : branch}>
                                                    {branch}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Report Format */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">รูปแบบไฟล์</label>
                                    <Select value={reportFormat} onValueChange={setReportFormat}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกรูปแบบ" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">
                                                <div className="flex items-center gap-2">
                                                    <FileIcon className="h-4 w-4" />
                                                    <span>PDF</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="excel">
                                                <div className="flex items-center gap-2">
                                                    <FileSpreadsheet className="h-4 w-4" />
                                                    <span>Excel (.xlsx)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="csv">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4" />
                                                    <span>CSV</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <Button onClick={handleGenerateReport} className="flex-1">
                                        <Download className="mr-2 h-4 w-4" />
                                        สร้างและดาวน์โหลด
                                    </Button>
                                    <Button variant="outline">
                                        <Eye className="mr-2 h-4 w-4" />
                                        ดูตัวอย่าง
                                    </Button>
                                    <Button variant="outline">
                                        <Printer className="mr-2 h-4 w-4" />
                                        พิมพ์
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="recent" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>รายงานที่สร้างล่าสุด</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentReports.map((report, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            {report.format === "PDF" ? (
                                                <FileIcon className="h-8 w-8 text-red-500" />
                                            ) : (
                                                <FileSpreadsheet className="h-8 w-8 text-green-500" />
                                            )}
                                            <div>
                                                <h3 className="font-medium text-sm">{report.name}</h3>
                                                <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                                                    <span>📅 {report.date}</span>
                                                    <span>📦 {report.size}</span>
                                                    <Badge variant="outline" className="text-xs">
                                                        {report.format}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    รายงานสร้างเดือนนี้
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">45</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +12% จากเดือนก่อน
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    รายงานยอดนิยม
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold">รายงานสรุปรายวัน</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    สร้าง 18 ครั้ง
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    ขนาดรวม
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">124.5 MB</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    เดือนนี้
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

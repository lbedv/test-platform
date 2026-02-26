import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Users, Clock, CheckCircle2, FileText } from "lucide-react"
import type { CreatedTest, TestStats } from "../types"
import { ScoreDisplay } from "./score-display"
import { TestMetadata } from "./test-metadata"
import { StatItem } from "./stat-item"

interface StatsSummaryProps {
  test: CreatedTest
  stats: TestStats
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

export function StatsSummary({ test, stats }: StatsSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl font-bold text-foreground text-balance">
              {test.title}
            </CardTitle>
            <TestMetadata test={test} />
          </div>
          <ScoreDisplay score={stats.averageScore} label="Avg. Score" />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatItem
            icon={Users}
            iconColor="text-primary"
            iconBg="bg-primary/10"
            label="Total Attempts"
            value={stats.totalAttempts.toString()}
          />
          <StatItem
            icon={CheckCircle2}
            iconColor="text-success"
            iconBg="bg-success/10"
            label="Pass Rate"
            value={`${stats.passRate}%`}
          />
          <StatItem
            icon={FileText}
            iconColor="text-secondary"
            iconBg="bg-secondary/10"
            label="Completion Rate"
            value={`${stats.completionRate}%`}
          />
          <StatItem
            icon={Clock}
            iconColor="text-warning"
            iconBg="bg-warning/10"
            label="Avg. Time"
            value={formatTime(stats.averageTime)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

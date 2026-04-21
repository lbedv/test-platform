import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, CheckCircle2, FileText } from "lucide-react"
import { TestScoreDisplay } from "./test-score-display"
import { StatItem } from "./stat-item"
import { formatDuration } from "@/shared/lib/date"
import type { TestStats } from "../types"
import { CATEGORY_LABELS } from "@/shared/constants/labels"

interface StatsSummaryProps {
  stats: TestStats
}

/**
 * StatsSummary component - Overview card showing test statistics and performance metrics.
 * Displays test title with metadata, average score, and key metrics:
 * total attempts, pass rate, completion rate, and average time taken.
 */
export function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl font-bold text-foreground text-balance">
              {stats.testTitle}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {CATEGORY_LABELS[stats.testCategory]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {stats.questionsCount} questions
              </span>
              <span className="text-xs text-muted-foreground">
                Passing: {stats.passingPercentage}%
              </span>
            </div>
          </div>
          <TestScoreDisplay score={stats.averageScore} />
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
            value={formatDuration(stats.averageTime)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

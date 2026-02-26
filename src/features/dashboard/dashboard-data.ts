import type { TestItem, Attempt } from "./types"
import type { LucideIcon } from "lucide-react"
import { FileText, TrendingUp, Clock, Award } from "lucide-react"
import { BASE_TESTS, TEST_ATTEMPTS } from "@/data/mock-tests"

export const DASHBOARD_TESTS: TestItem[] = BASE_TESTS.map((test) => ({
  id: test.id,
  title: test.title,
  description: test.description,
  status: test.status,
  questions: test.questions,
  attempts: TEST_ATTEMPTS[test.id] ?? 0,
}))

export const RECENT_ATTEMPTS: Attempt[] = [
  {
    id: "a1",
    testId: "1",
    testTitle: "JavaScript Fundamentals",
    testCategory: "Programming",
    score: 27,
    totalPoints: 30,
    percentage: 90,
    timeTaken: "18m 42s",
    completedAt: "2 hours ago",
    passed: true,
  },
  {
    id: "a2",
    testId: "2",
    testTitle: "React Component Patterns",
    testCategory: "Frontend",
    score: 19,
    totalPoints: 25,
    percentage: 76,
    timeTaken: "22m 15s",
    completedAt: "Yesterday",
    passed: true,
  },
  {
    id: "a3",
    testId: "4",
    testTitle: "TypeScript Advanced Types",
    testCategory: "Programming",
    score: 12,
    totalPoints: 22,
    percentage: 55,
    timeTaken: "30m 00s",
    completedAt: "2 days ago",
    passed: false,
  },
  {
    id: "a4",
    testId: "6",
    testTitle: "SQL & Database Basics",
    testCategory: "Databases",
    score: 18,
    totalPoints: 20,
    percentage: 90,
    timeTaken: "14m 33s",
    completedAt: "3 days ago",
    passed: true,
  },
  {
    id: "a5",
    testId: "1",
    testTitle: "JavaScript Fundamentals",
    testCategory: "Programming",
    score: 22,
    totalPoints: 30,
    percentage: 73,
    timeTaken: "25m 10s",
    completedAt: "5 days ago",
    passed: true,
  },
  {
    id: "a6",
    testId: "4",
    testTitle: "TypeScript Advanced Types",
    testCategory: "Programming",
    score: 9,
    totalPoints: 22,
    percentage: 41,
    timeTaken: "28m 55s",
    completedAt: "1 week ago",
    passed: false,
  },
    {
    id: "a7",
    testId: "1",
    testTitle: "JavaScript Fundamentals",
    testCategory: "Programming",
    score: 27,
    totalPoints: 30,
    percentage: 90,
    timeTaken: "18m 42s",
    completedAt: "2 hours ago",
    passed: true,
  },
]

export interface StatItem {
  title: string
  value: string
  description: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export const STAT_ITEMS: StatItem[] = [
  {
    title: "Total Tests Taken",
    value: "24",
    description: "+3 this week",
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    title: "Average Score",
    value: "78%",
    description: "+5% from last month",
    icon: TrendingUp,
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  {
    title: "Tests Created",
    value: "8",
    description: "2 drafts, 6 published",
    icon: Award,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
  {
    title: "Recent Activity",
    value: "3h ago",
    description: "Completed JavaScript Basics",
    icon: Clock,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
]

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Real component imports from features
import { StatCard } from '@/features/dashboard/components/stat-card'
import { WelcomeHeader } from '@/features/dashboard/components/welcome-header'
import { AuthBackground } from '@/features/auth/components/auth-background'
import { CatalogToolbar } from '@/features/catalog/components/catalog-toolbar'
import { ProfileHeader } from '@/features/profile/components/profile-header'
import { StatItem } from '@/features/statistics/components/stat-item'
import { TestHeader } from '@/features/test-attempt/components/test-header'
import { ScoreCard } from '@/features/test-results/components/score-card'
import { TrueFalseAnswer } from '@/features/editor/components/answer-types/true-false-answer'
import type { CatalogFilterParams } from '@/features/catalog/types'
import type { AttemptResultsResponse } from '@test-platform/shared/schemas'
import { Users, Trophy } from 'lucide-react'

// Mock store
vi.mock('@/shared/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    user: { role: 'USER' }
  }))
}))

// TEST 1: StatCard - Displays statistics with icons
describe('StatCard Component', () => {
  it('renders stat card with title, value, and description', () => {
    render(
      <StatCard
        title="Total Tests"
        description="Tests completed"
        value="42"
      />
    )
    expect(screen.getByText('Total Tests')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('Tests completed')).toBeInTheDocument()
  })

  it('renders with custom icon color and background', () => {
    render(
      <StatCard
        title="Score"
        description="Average score"
        value="85%"
        iconColor="text-green-600"
        iconBg="bg-green-100"
      />
    )
    expect(screen.getByText('Score')).toBeInTheDocument()
    expect(screen.getByText('85%')).toBeInTheDocument()
  })
})

// TEST 2: WelcomeHeader - Shows user name or loading skeleton
describe('WelcomeHeader Component', () => {
  it('renders loading skeleton when firstName is missing', () => {
    const { container } = render(<WelcomeHeader />)
    // When no firstName is provided, skeleton elements are shown instead of the welcome message
    expect(screen.queryByText(/Welcome back/)).not.toBeInTheDocument()
    // Check that skeleton containers are rendered (they have animate-pulse class)
    const skeletonElements = container.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  it('renders welcome message with user initials when both names provided', () => {
    render(<WelcomeHeader firstName="John" lastName="Doe" />)
    expect(screen.getByText(/Welcome back, John/)).toBeInTheDocument()
    expect(screen.getByText(/Here are your recent test attempts/)).toBeInTheDocument()
    expect(screen.getByText('JD')).toBeInTheDocument() // Initials
  })

  it('displays correct initials for different names', () => {
    render(<WelcomeHeader firstName="Alice" lastName="Smith" />)
    expect(screen.getByText('AS')).toBeInTheDocument()
  })
})

// TEST 3: AuthBackground - Wraps children with gradient layout
describe('AuthBackground Component', () => {
  it('renders children inside the component', () => {
    render(
      <AuthBackground>
        <div data-testid="test-child">Auth Form Here</div>
      </AuthBackground>
    )
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Auth Form Here')).toBeInTheDocument()
  })

  it('provides full-height layout with proper structure', () => {
    const { container } = render(
      <AuthBackground>
        <form>Login Form</form>
      </AuthBackground>
    )
    const main = container.querySelector('main')
    expect(main).toHaveClass('min-h-screen')
    expect(main).toHaveClass('flex')
    expect(main).toHaveClass('items-center')
  })
})

// TEST 4: CatalogToolbar - Filter and search interactions
describe('CatalogToolbar Component', () => {
  it('renders all filter options and tabs', () => {
    const mockSearchChange = vi.fn()
    const mockClearFilters = vi.fn()
    const filterParams: CatalogFilterParams = {
      search: '',
      category: undefined,
      difficulty: undefined,
      ownership: 'public',
      sortBy: 'newest'
    }
    
    render(
      <CatalogToolbar
        resultCount={42}
        filterParams={filterParams}
        onSearchChange={mockSearchChange}
        clearFilters={mockClearFilters}
      />
    )
    
    // Check for tabs
    expect(screen.getByRole('tab', { name: /Public Catalog/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /My Tests/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /All Tests/i })).toBeInTheDocument()
  })

  it('calls onSearchChange when tabs are switched', async () => {
    const user = userEvent.setup()
    const mockSearchChange = vi.fn()
    const mockClearFilters = vi.fn()
    const filterParams: CatalogFilterParams = {
      search: '',
      category: undefined,
      difficulty: undefined,
      ownership: 'public',
      sortBy: 'newest'
    }
    
    render(
      <CatalogToolbar
        resultCount={10}
        filterParams={filterParams}
        onSearchChange={mockSearchChange}
        clearFilters={mockClearFilters}
      />
    )
    
    const myTestsTab = screen.getByRole('tab', { name: /My Tests/i })
    await user.click(myTestsTab)
    expect(mockSearchChange).toHaveBeenCalledWith('ownership', 'mine')
  })
})

// TEST 5: ProfileHeader - Displays user profile information
describe('ProfileHeader Component', () => {
  it('renders user name, email, and avatar with initials', () => {
    render(
      <ProfileHeader
        firstName="Jane"
        lastName="Doe"
        email="jane@example.com"
        registeredAt="2024-01-15"
      />
    )
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('JD')).toBeInTheDocument() // Initials
  })

  it('displays registration date', () => {
    render(
      <ProfileHeader
        firstName="John"
        lastName="Smith"
        email="john@example.com"
        registeredAt="2023-06-20"
      />
    )
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })
})

// TEST 6: StatItem - Displays statistic with icon
describe('StatItem Component', () => {
  it('renders label, value, and icon', () => {
    render(
      <StatItem
        icon={Users}
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
        label="Total Attempts"
        value="42"
      />
    )
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('Total Attempts')).toBeInTheDocument()
  })

  it('renders with different values and styling', () => {
    render(
      <StatItem
        icon={Trophy}
        iconColor="text-green-600"
        iconBg="bg-green-100"
        label="Tests Passed"
        value="15"
      />
    )
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('Tests Passed')).toBeInTheDocument()
  })
})

// TEST 7: TestHeader - Displays test progress during attempt
describe('TestHeader Component', () => {
  it('renders test title, category, and difficulty', () => {
    render(
      <TestHeader
        testTitle="JavaScript Basics"
        testCategory="programming"
        testDifficulty="easy"
        questionsCount={10}
        answeredCount={5}
        timeRemaining={300}
      />
    )
    expect(screen.getByText('JavaScript Basics')).toBeInTheDocument()
  })

  it('displays progress information', () => {
    render(
      <TestHeader
        testTitle="General Knowledge Quiz"
        testCategory="general_knowledge"
        testDifficulty="hard"
        questionsCount={20}
        answeredCount={12}
        timeRemaining={600}
      />
    )
    // Should show answered/total questions
    expect(screen.getByText(/12/)).toBeInTheDocument()
    expect(screen.getByText(/20/)).toBeInTheDocument()
  })
})

// TEST 8: TrueFalseAnswer - Answer input for true/false questions
describe('TrueFalseAnswer Component', () => {
  it('renders true and false radio options', () => {
    const mockChange = vi.fn()
    render(
      <TrueFalseAnswer
        correctAnswer={undefined}
        questionId="q1"
        onCorrectAnswerChange={mockChange}
      />
    )
    expect(screen.getByText('true')).toBeInTheDocument()
    expect(screen.getByText('false')).toBeInTheDocument()
  })

  it('calls onCorrectAnswerChange when option is selected', async () => {
    const user = userEvent.setup()
    const mockChange = vi.fn()
    render(
      <TrueFalseAnswer
        correctAnswer={undefined}
        questionId="q1"
        onCorrectAnswerChange={mockChange}
      />
    )
    const trueRadio = screen.getByRole('radio', { name: /true/i })
    await user.click(trueRadio)
    expect(mockChange).toHaveBeenCalledWith(true)
  })

  it('selects the correct answer when provided', () => {
    const mockChange = vi.fn()
    render(
      <TrueFalseAnswer
        correctAnswer={true}
        questionId="q1"
        onCorrectAnswerChange={mockChange}
      />
    )
    const trueRadio = screen.getByRole('radio', { name: /true/i })
    expect(trueRadio).toHaveAttribute('aria-checked', 'true')
  })
})

// TEST 9: ScoreCard - Displays test results summary
describe('ScoreCard Component', () => {
  const mockResults: AttemptResultsResponse = {
    id: 'attempt1',
    testId: 'test1',
    testTitle: 'Math Quiz',
    testCategory: 'mathematics' as const,
    testDifficulty: 'easy' as const,
    totalPoints: 20,
    timeLimitSeconds: 600,
    passingPercentage: 70,
    questionsCount: 2,
    pointsEarned: 10,
    percentage: 50,
    isPassed: false,
    timeTakenSeconds: 480,
    completedAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        questionText: 'Question 1',
        questionNumber: 1,
        questionType: 'textInput' as const,
        userAnswer: false,
        correctAnswer: false,
        pointsPossible: 10,
        answerOutcome: 'correct' as const,
      },
      {
        id: 'q2',
        questionText: 'Question 2',
        questionNumber: 2,
        questionType: 'textInput' as const,
        userAnswer: 'answer2',
        correctAnswer: 'answer1',
        pointsPossible: 10,
        answerOutcome: 'incorrect' as const,
      },
    ],
  }

  it('renders score information', () => {
    render(<ScoreCard results={mockResults} />)
    expect(screen.getByText(/50/)).toBeInTheDocument() // percentage
  })

  it('displays pass/fail status based on score', () => {
    const passedResults: AttemptResultsResponse = {
      ...mockResults,
      pointsEarned: 15,
      totalPoints: 20,
      percentage: 75,
      isPassed: true,
    }

    render(<ScoreCard results={passedResults} />)
    // Should show passed status
    expect(screen.getByText(/passed|Passed/i)).toBeInTheDocument()
  })
})

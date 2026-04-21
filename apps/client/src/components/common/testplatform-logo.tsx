/**
 * TestPlatformLogo component - Branded logo for the test platform.
 * Displays icon and text with optional sizing (default or small).
 */
export function TestPlatformLogo({ size = "default" }: { size?: "default" | "sm" }) {
  const iconSize = size === "sm" ? "h-8 w-8" : "h-10 w-10"
  const svgSize = size === "sm" ? 18 : 22
  const textSize = size === "sm" ? "text-xl" : "text-2xl"

  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex ${iconSize} items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/25`}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary-foreground"
          />
          <rect
            x="9"
            y="3"
            width="6"
            height="4"
            rx="1"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary-foreground"
          />
          <path
            d="M9 14l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          />
        </svg>
      </div>
      <span className={`${textSize} font-bold tracking-tight`}>
        <span className="text-primary">Test</span>
        <span className="text-secondary">Platform</span>
      </span>
    </div>
  )
}

/**
 * AuthBackground component - Layout wrapper with animated gradient background.
 * Provides different gradient for light and dark modes with decorative animated orbs.
 * Centers content with fade-in slide-up animation on mount.
 */
export function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Light mode gradient */}
      <div
        className="pointer-events-none absolute inset-0 dark:opacity-0 transition-opacity duration-500 bg-linear-to-br from-accent via-background via-50% to-secondary/15"
      />
      
      {/* Dark mode gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500 bg-linear-to-br from-foreground/10 via-background via-50% to-primary/5"
      />

      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="bg-primary pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl dark:opacity-10"
      />
      <div
        aria-hidden="true"
        className="bg-secondary pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-15 blur-3xl dark:opacity-10"
      />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-2 duration-700">
        {children}
      </div>
    </main>
  );
}
export function LoginBackground({ children }: { children: React.ReactNode }) {


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Light mode gradient */}
      <div
        className="pointer-events-none absolute inset-0 dark:opacity-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--background)) 50%, hsl(var(--secondary) / 0.15) 100%)",
        }}
      />
      {/* Dark mode gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--foreground) / 0.1) 0%, hsl(var(--background)) 50%, hsl(var(--primary) / 0.05) 100%)",
        }}
      />

      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl dark:opacity-10"
        style={{ background: "hsl(var(--primary))" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-15 blur-3xl dark:opacity-10"
        style={{ background: "hsl(var(--secondary))" }}
      />

      <div
        className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-2 duration-700"
      >
        {children}
      </div>
    </main>
  )
}

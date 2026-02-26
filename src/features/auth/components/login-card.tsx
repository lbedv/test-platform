import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { Button } from "@/components/ui/button"
import { FormInput, TestPlatformLogo } from "@/components/common"
import { Loader2Icon } from "lucide-react"
import { useLogin } from "../hooks/use-login"

const inputClassName =
  "h-11 rounded-xl bg-background/60 transition-all duration-200 focus:bg-background dark:bg-muted/30 dark:focus:bg-muted/50"

export function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const login = useLogin()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    login.mutate({ email, password })
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/70 p-8 shadow-lg backdrop-blur-xl dark:bg-card/50 dark:shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-3">
        <TestPlatformLogo />
        <p className="text-sm text-muted-foreground">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {login.error && (
          <p className="text-sm text-destructive text-center">
            {login.error.message}
          </p>
        )}

        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
          inputClassName={inputClassName}
        />

        <FormInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          required
          showPasswordToggle
          autoComplete="current-password"
          inputClassName={inputClassName}
          labelSuffix={
            <button
              type="button"
              onClick={() => alert("Feature coming soon!")}
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Forgot password?
            </button>
          }
        />

        <Button
          type="submit"
          disabled={login.isPending}
          className="h-11 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:hover:scale-100"
        >
          {login.isPending ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {"Don't have an account? "}
        <button
          onClick={() => navigate({ to: PathConstants.REGISTER })}
          className="font-semibold text-secondary hover:text-secondary/80 transition-colors"
          type="button"
        >
          Create one
        </button>
      </p>
    </div>
  )
}

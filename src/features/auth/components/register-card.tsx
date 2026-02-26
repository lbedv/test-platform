import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { Button } from "@/components/ui/button"
import { FormInput, TestPlatformLogo } from "@/components/common"
import { Loader2Icon } from "lucide-react"
import { useRegister } from "../hooks/use-register"

const inputClassName =
  "h-11 rounded-xl bg-background/60 transition-all duration-200 focus:bg-background dark:bg-muted/30 dark:focus:bg-muted/50"

export function RegisterCard() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const register = useRegister()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirmPassword) return
    register.mutate({ fullName: name, email, password })
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/70 p-8 shadow-lg backdrop-blur-xl dark:bg-card/50 dark:shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-3">
        <TestPlatformLogo />
        <p className="text-sm text-muted-foreground">Create a new account</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {register.error && (
          <p className="text-sm text-destructive text-center">
            {register.error.message}
          </p>
        )}

        <FormInput
          id="name"
          label="Full name"
          placeholder="Your name"
          value={name}
          onChange={setName}
          required
          inputClassName={inputClassName}
        />

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
          autoComplete="new-password"
          inputClassName={inputClassName}
        />

        <FormInput
          id="confirm-password"
          label="Confirm password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          required
          showPasswordToggle
          inputClassName={inputClassName}
        />

        <Button
          type="submit"
          disabled={register.isPending}
          className="h-11 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:hover:scale-100"
        >
          {register.isPending ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?&nbsp;
        <button
          onClick={() => navigate({ to: PathConstants.LOGIN })}
          className="font-semibold text-secondary hover:text-secondary/80 transition-colors"
          type="button"
        >
          Sign in
        </button>
      </p>
    </div>
  )
}

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PathConstants from "@/routes/path-constants"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { FormInput, TestPlatformLogo } from "@/components/common"
import { Loader2Icon } from "lucide-react"
import { LoginInputSchema, type LoginInput } from "@test-platform/shared/schemas"
import { useLogin } from "../hooks/use-login"

const inputClassName =
  "h-11 rounded-xl bg-background/60 transition-all duration-200 focus:bg-background dark:bg-muted/30 dark:focus:bg-muted/50"

/**
 * LoginCard component - A card that contains the login form.
 * Uses react-hook-form for form state management and zod for validation.
 */
export function LoginCard() {
  const { mutate: login, isPending, error: apiError } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginInputSchema),
  })

  const onSubmit = (data: LoginInput) => {
    login(data)
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/70 p-8 shadow-lg backdrop-blur-xl dark:bg-card/50 dark:shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-3">
        <TestPlatformLogo />
        <p className="text-sm text-muted-foreground">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          disabled={isPending}
          autoComplete="email"
          inputClassName={inputClassName}
          {...register("email")}
          error={errors.email?.message}
        />

        <FormInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          required
          showPasswordToggle
          disabled={isPending}
          autoComplete="current-password"
          inputClassName={inputClassName}
          {...register("password")}
          error={errors.password?.message}
        />

        {apiError && (
            <p className="text-sm font-medium text-destructive text-center">
              {apiError.message}
            </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:hover:scale-100"
        >
          {isPending ? (
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
        <Link
          to={PathConstants.REGISTER}
          className="font-semibold text-secondary hover:text-secondary/80 transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
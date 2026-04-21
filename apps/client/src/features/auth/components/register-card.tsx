import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PathConstants from "@/routes/path-constants"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { FormInput, TestPlatformLogo } from "@/components/common"
import { Loader2Icon } from "lucide-react"
import { RegisterFormSchema, type RegisterFormData } from "@test-platform/shared/schemas"
import { useRegister } from "../hooks/use-register"

const inputClassName =
  "h-11 rounded-xl bg-background/60 transition-all duration-200 focus:bg-background dark:bg-muted/30 dark:focus:bg-muted/50"

/**
 * RegisterCard component - A card that contains the registration form.
 * Uses react-hook-form for form state management and zod for validation.
*/
export function RegisterCard() {
  const { mutate: registerUser, isPending, error: apiError } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data)
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/70 p-8 shadow-lg backdrop-blur-xl dark:bg-card/50 dark:shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-3">
        <TestPlatformLogo />
        <p className="text-sm text-muted-foreground">Create a new account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-4">
            <FormInput
              id="firstName"
              label="First Name"
              placeholder="John"
              required
              disabled={isPending}
              inputClassName={inputClassName + " flex-1"}
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <FormInput
              id="lastName"
              label="Last Name"
              placeholder="Doe"
              required
              disabled={isPending}
              inputClassName={inputClassName + " flex-1"}
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

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
          autoComplete="new-password"
          inputClassName={inputClassName}
          {...register("password")}
          error={errors.password?.message}
        />

        <FormInput
          id="confirm-password"
          label="Confirm password"
          placeholder="Repeat your password"
          required
          showPasswordToggle
          disabled={isPending}
          inputClassName={inputClassName}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
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
              Creating...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?&nbsp;
        <Link
          to={PathConstants.LOGIN}
          className="font-semibold text-secondary hover:text-secondary/80 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
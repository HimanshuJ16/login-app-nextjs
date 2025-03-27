"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Define schema using Zod
const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Define type from schema
type RegisterFormData = z.infer<typeof registerSchema>

// API function to handle registration
const registerUser = async (data: Omit<RegisterFormData, "confirmPassword">) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Registration failed")
  }

  return response.json()
}

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // React Query mutation
  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) =>
      registerUser({
        email: data.email,
        password: data.password,
      }),
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully",
      })
      // Redirect to login page after successful registration
      router.push("/")
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  // Form submission handler
  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="w-full max-w-md px-4">
      <h1 className="mb-8 text-center text-3xl font-medium text-[#232323]">Create an account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="h-12 rounded-md border border-[#d6d6d6] px-4 text-[#232323]"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="h-12 rounded-md border border-[#d6d6d6] px-4 text-[#232323]"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="h-12 rounded-md border border-[#d6d6d6] px-4 text-[#232323]"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <Button
          type="submit"
          className="mt-4 h-12 w-full rounded-md bg-[#2b3a67] text-white hover:bg-[#2b3a67]/90"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating account..." : "Register"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/" className="text-[#2b3a67] underline">
          Login
        </Link>
      </div>
    </div>
  )
}


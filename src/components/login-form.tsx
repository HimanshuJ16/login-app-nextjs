"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Define schema using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define type from schema
type LoginFormData = z.infer<typeof loginSchema>;

// API function to handle login
const loginUser = async (data: LoginFormData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export default function LoginForm() {
  const { toast } = useToast();
  
  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // React Query mutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
      });
      // Handle successful login (e.g., redirect or set auth state)
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md px-4">
      <h1 className="mb-8 text-center text-3xl font-medium text-[#232323]">
        Welcome back!
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="h-12 rounded-md border border-[#d6d6d6] px-4 text-[#232323]"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="h-12 rounded-md border border-[#d6d6d6] px-4 text-[#232323]"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="mt-4 h-12 w-full rounded-md bg-[#2b3a67] text-white hover:bg-[#2b3a67]/90"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-[#2b3a67] underline">
          Register
        </Link>
      </div>
    </div>
  );
}

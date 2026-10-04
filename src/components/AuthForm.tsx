"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { btnPrimary, inputClass, labelClass } from "./styles";
import { Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import Reveal from "./Reveal";

interface AuthFormProps {
  type: "login" | "signup";
  initialError?: string;
}

export default function AuthForm({ type, initialError }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [notice, setNotice] = useState<string | null>(null);
  const isSignup = type === "signup";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("fullName") ?? "").trim();

    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      const supabase = createClient();
      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) return setError(signUpError.message);
        if (!data.session) return setNotice("Check your email to confirm your account, then log in.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) return setError(signInError.message);
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Reveal className="w-full max-w-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {isSignup && (
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className={labelClass}>
              Full name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className={`${inputClass} pl-10`}
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`${inputClass} pl-10`}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={isSignup ? 8 : undefined}
              required
              className={`${inputClass} pl-10`}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>
          {isSignup && (
            <p className="text-[11px] text-muted ml-1">At least 8 characters.</p>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {notice && (
          <div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-600 border border-green-500/20">
            <p>{notice}</p>
          </div>
        )}

        <button 
          type="submit" 
          className={`${btnPrimary} w-full mt-2`} 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            isSignup ? "Create account" : "Log in"
          )}
        </button>
      </form>
    </Reveal>
  );
}

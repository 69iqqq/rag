import AuthForm from "@/components/AuthForm";
import Logo from "@/components/Logo";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 relative">
      <div className="ambient-light bg-accent/10 w-[30vw] h-[30vw] left-[35%] top-[20%]" />
      
      <Reveal className="w-full max-w-md">
        <div className="glass-panel p-8 sm:p-12 w-full flex flex-col items-center">
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-fg text-center">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-subtle text-center mb-8">
            Enter your details to access your account.
          </p>

          <AuthForm type="login" />

          <p className="mt-8 text-center text-sm text-subtle">
            Don't have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline underline-offset-4 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </Reveal>
    </div>
  );
}

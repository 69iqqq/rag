import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl glass-strong px-6 shadow-sm transition-all duration-300">
        <Link href="/" className="text-sm font-semibold tracking-tight text-fg">
          Resume Builder
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/templates" className="text-[13px] font-medium text-subtle hover:text-fg transition-colors">
            Templates
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" className="text-[13px] font-medium text-subtle hover:text-fg transition-colors">
                Dashboard
              </Link>
              <div className="h-4 w-px bg-line" aria-hidden="true" />
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-[13px] font-medium text-subtle hover:text-fg transition-colors">
                Log in
              </Link>
              <Link href="/signup" className="text-[13px] font-medium bg-fg text-bg px-3 py-1.5 rounded-full hover:bg-fg/90 transition-colors">
                Create Resume
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";
import { btnPrimary, btnGhost } from "./styles";

/** 
 * Floating Glass Navigation.
 * Stays sticky at the top, blurring the content that passes underneath it.
 */
export default async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  let displayName = "Account";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    if (profile?.full_name) displayName = profile.full_name;
  }

  return (
    <header className="sticky top-0 z-50 w-full pt-4 px-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full glass-strong px-4 shadow-sm transition-all duration-300">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-[13px] font-medium text-fg hover:text-accent transition-colors">
                Dashboard
              </Link>
              <div className="h-4 w-px bg-line" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <span className="hidden text-[13px] text-muted sm:inline-block max-w-[120px] truncate">
                  {displayName}
                </span>
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className={btnGhost}>
                Log in
              </Link>
              <Link href="/signup" className={btnPrimary}>
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

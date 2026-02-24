"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* =============================================================================
 * DESIGNERS: Login Page
 * =============================================================================
 * Clean login form with ProUX branding. Submits via Supabase Auth.
 *
 * To update:
 * - Change form field labels and placeholder text below
 * - Update error message styling via the error state display
 * - Adjust button styles using the Button component variants
 * ========================================================================== */

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* DESIGNERS: Mobile-only logo (desktop logo is in the layout panel) */}
      <div className="mb-8 lg:hidden">
        <svg
          className="h-6 w-auto"
          fill="none"
          viewBox="0 0 132 22"
        >
          <g clipPath="url(#clip_login_logo)">
            <path
              d="M22.3151 0C21.473 7.89874 15.5786 10.8088 10.9473 10.8088V21.6176C27.3674 21.6176 33.2618 7.06729 33.2618 0H22.3151Z"
              fill="#B55331"
            />
            <path d="M10.9468 0H0V10.8088H10.9468V0Z" fill="#B55331" />
            <path
              d="M39.9531 21.6936V0.0529785H49.0373C50.6837 0.0529785 52.1047 0.36998 53.3001 1.00398C54.5028 1.63094 55.4298 2.50797 56.0812 3.63509C56.7326 4.75516 57.0583 6.05839 57.0583 7.54477C57.0583 9.0382 56.7255 10.3449 56.0597 11.465C55.4012 12.578 54.4598 13.441 53.2357 14.0539C52.0116 14.6667 50.5584 14.9732 48.8762 14.9732H43.2711V10.8521H47.8883C48.6901 10.8521 49.3594 10.7148 49.8963 10.44C50.4403 10.1653 50.8519 9.78139 51.1311 9.28828C51.4103 8.78812 51.5499 8.20695 51.5499 7.54477C51.5499 6.87555 51.4103 6.2979 51.1311 5.81183C50.8519 5.31872 50.4403 4.93832 49.8963 4.67063C49.3522 4.40294 48.6829 4.26909 47.8883 4.26909H45.2683V21.6936H39.9531Z"
              fill="#1A2130"
            />
            <path
              d="M59.6787 21.6936V5.46313H64.7791V8.42181H64.9509C65.2515 7.35105 65.7419 6.55502 66.422 6.03373C67.102 5.5054 67.893 5.24123 68.795 5.24123C69.0384 5.24123 69.2889 5.25884 69.5466 5.29406C69.8043 5.32224 70.0442 5.36803 70.2661 5.43143V9.92228C70.0155 9.83774 69.6862 9.77082 69.2782 9.72151C68.8773 9.6722 68.5194 9.64754 68.2044 9.64754C67.5816 9.64754 67.0197 9.78491 66.5186 10.0596C66.0247 10.3273 65.6345 10.7042 65.3482 11.1903C65.069 11.6693 64.9294 12.2329 64.9294 12.881V21.6936H59.6787Z"
              fill="#1A2130"
            />
            <path
              d="M79.2485 22C77.5161 22 76.0272 21.6513 74.7816 20.9539C73.5432 20.2495 72.5875 19.2703 71.9146 18.0164C71.2489 16.7554 70.916 15.2937 70.916 13.6312C70.916 11.9617 71.2489 10.4999 71.9146 9.24601C72.5875 7.98505 73.5432 7.00587 74.7816 6.30847C76.0272 5.60402 77.5161 5.2518 79.2485 5.2518C80.9808 5.2518 82.4662 5.60402 83.7046 6.30847C84.9502 7.00587 85.9059 7.98505 86.5716 9.24601C87.2445 10.4999 87.581 11.9617 87.581 13.6312C87.581 15.2937 87.2445 16.7554 86.5716 18.0164C85.9059 19.2703 84.9502 20.2495 83.7046 20.9539C82.4662 21.6513 80.9808 22 79.2485 22ZM79.2807 18.1009C79.9106 18.1009 80.444 17.9107 80.8806 17.5303C81.3173 17.1499 81.6502 16.6216 81.8792 15.9453C82.1155 15.269 82.2336 14.4871 82.2336 13.5995C82.2336 12.6978 82.1155 11.9088 81.8792 11.2325C81.6502 10.5563 81.3173 10.0279 80.8806 9.64754C80.444 9.26714 79.9106 9.07694 79.2807 9.07694C78.6293 9.07694 78.0781 9.26714 77.6271 9.64754C77.1833 10.0279 76.8432 10.5563 76.607 11.2325C76.3779 11.9088 76.2634 12.6978 76.2634 13.5995C76.2634 14.4871 76.3779 15.269 76.607 15.9453C76.8432 16.6216 77.1833 17.1499 77.6271 17.5303C78.0781 17.9107 78.6293 18.1009 79.2807 18.1009Z"
              fill="#1A2130"
            />
            <path
              d="M103.575 0.0529785H108.879V14.0116C108.879 15.6248 108.489 17.0301 107.709 18.2277C106.928 19.4182 105.84 20.341 104.444 20.9962C103.048 21.6443 101.427 21.9683 99.5801 21.9683C97.7117 21.9683 96.0796 21.6443 94.6837 20.9962C93.2878 20.341 92.2033 19.4182 91.4301 18.2277C90.657 17.0301 90.2705 15.6248 90.2705 14.0116V0.0529785H95.5857V13.5572C95.5857 14.3039 95.7503 14.9696 96.0796 15.5543C96.416 16.139 96.8849 16.5969 97.4862 16.928C98.0875 17.2591 98.7855 17.4246 99.5801 17.4246C100.375 17.4246 101.069 17.2591 101.663 16.928C102.265 16.5969 102.733 16.139 103.07 15.5543C103.406 14.9696 103.575 14.3039 103.575 13.5572V0.0529785Z"
              fill="#B55331"
            />
            <path
              d="M117.59 0.0529785L121.606 6.88963H121.778L125.837 0.0529785H131.785L125.149 10.8733L132 21.6936H125.901L121.778 14.783H121.606L117.483 21.6936H111.426L118.245 10.8733L111.598 0.0529785H117.59Z"
              fill="#B55331"
            />
          </g>
          <defs>
            <clipPath id="clip_login_logo">
              <rect fill="white" height="22" width="132" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* DESIGNERS: Login form heading */}
      <div className="mb-8">
        <h1 className="heading-2 text-proux-navy mb-2">Welcome back</h1>
        <p className="body-base">
          Log in to access your ProUX dashboard and courses.
        </p>
      </div>

      {/* DESIGNERS: Error message display */}
      {error && (
        <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* DESIGNERS: Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="h-11"
          />
        </div>

        {/* DESIGNERS: Password field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/login"
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="h-11"
          />
        </div>

        {/* DESIGNERS: Submit button — uses primary style */}
        <Button
          type="submit"
          className="w-full h-11 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Log In"}
        </Button>
      </form>

      {/* DESIGNERS: Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* DESIGNERS: Start Free Trial CTA */}
      <Button
        variant="outline"
        asChild
        className="w-full h-11 rounded-lg font-semibold"
      >
        <Link href="/signup">Start Free Trial</Link>
      </Button>

      {/* DESIGNERS: Footer link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-foreground hover:text-primary transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

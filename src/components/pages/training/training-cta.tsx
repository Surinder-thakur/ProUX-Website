"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WAITLIST_COUNT = "850+";

export function TrainingCta() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: email.trim(), source: "training" });
      if (error) throw error;

      setIsSubmitted(true);
      setEmail("");
      toast({
        title: "You're on the list!",
        description: "We'll notify you when enrollment opens.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us at hello@proux.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-proux-navy section-padding">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, hsl(var(--proux-copper)) 0%, transparent 50%)",
        }}
      />

      <div className="container-narrow relative text-center">
        <h2 className="heading-2 mb-4 text-white">
          Get Notified When Enrollment Opens
        </h2>
        <p className="body-large mx-auto mb-8 max-w-xl !text-white/70">
          Be the first to know. Waitlist members get early access and an
          exclusive launch discount.
        </p>

        {isSubmitted ? (
          <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-proux-copper" />
            <p className="text-sm font-medium text-white">
              You&apos;re on the waitlist. We&apos;ll be in touch!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 flex-1 rounded-full border-white/20 bg-white/10 px-5 text-white placeholder:text-white/50 focus-visible:ring-proux-copper focus-visible:border-white/30"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 rounded-full px-6 text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: "hsl(var(--proux-copper))" }}
            >
              {isSubmitting ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Notify Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}

        <p className="mt-5 text-sm text-white/50">
          Join{" "}
          <span className="font-semibold text-white/70">
            {WAITLIST_COUNT} designers
          </span>{" "}
          waiting for the launch.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function BootcampInterestPopup({
  open,
  onClose,
  bootcampTitle,
}: {
  open: boolean;
  onClose: () => void;
  bootcampTitle: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bootcamp-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bootcamp: bootcampTitle }),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setEmail("");
      setError("");
      setSuccess(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center px-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-[420px] rounded-2xl bg-card border border-[#e8e4d9] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0ece0] transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {success ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-bold text-foreground mb-2">
                  You&apos;re on the list!
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  We&apos;ll notify you as soon as <span className="font-semibold text-foreground">{bootcampTitle}</span> opens for enrollment.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[18px] md:text-[20px] font-bold text-foreground tracking-[-0.3px] mb-1.5 pr-6">
                  Register Interest
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
                  Be the first to know when <span className="font-semibold text-foreground">{bootcampTitle}</span> opens for enrollment.
                </p>

                <form onSubmit={handleSubmit}>
                  <label htmlFor="interest-email" className="text-[12px] font-semibold uppercase tracking-wider text-[#888] mb-2 block">
                    Email Address
                  </label>
                  <input
                    id="interest-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@company.com"
                    className="w-full h-[48px] rounded-xl border border-[#dfdbc9] bg-white px-4 text-[14px] text-foreground placeholder:text-[#aaa] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    autoFocus
                  />
                  {error && (
                    <p className="text-[12px] text-red-500 mt-1.5">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-shine w-full mt-4 rounded-[12px] h-[48px] text-[13px] font-semibold uppercase tracking-wide text-white bg-primary shadow-md transition-all hover:brightness-110 hover:shadow-xl cursor-pointer disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Notify Me"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

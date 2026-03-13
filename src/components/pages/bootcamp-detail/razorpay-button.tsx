"use client";

import { useEffect, useRef, useCallback } from "react";

export default function RazorpayButton({
  label = "Enroll Now",
  price,
  buttonId,
}: {
  label?: string;
  price?: number;
  buttonId: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;
    const form = wrapper.querySelector("form");
    if (!form) return;

    // Clean up old content before injecting new one
    form.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", buttonId);
    script.async = true;
    form.appendChild(script);

    return () => {
      form.innerHTML = "";
    };
  }, [buttonId]);

  const displayPrice = price ? ` — $${price}` : "";

  /** Find the Razorpay <a> tag inside the form and click it */
  const handleClick = useCallback(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;
    const form = wrapper.querySelector("form");
    if (!form) return;

    const anchor =
      form.querySelector<HTMLElement>(".razorpay-payment-button a") ??
      form.querySelector<HTMLElement>(".razorpay-payment-button button") ??
      form.querySelector<HTMLElement>(".razorpay-payment-button [type='submit']");

    if (anchor) {
      anchor.click();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "54px",
        minHeight: "54px",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      {/* Razorpay form — hidden, not interactive. We click its anchor programmatically. */}
      <form
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Branded button — visible, FULL WIDTH clickable */}
      <button
        type="button"
        onClick={handleClick}
        className="btn-shine"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          fontSize: "14px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "white",
          backgroundColor: "hsl(var(--primary))",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
          border: "none",
          cursor: "pointer",
        }}
      >
        {label}{displayPrice}
      </button>
    </div>
  );
}

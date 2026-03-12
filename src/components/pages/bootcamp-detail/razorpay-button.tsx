"use client";

import { useEffect, useRef } from "react";

export default function RazorpayButton({
  label = "Enroll Now",
  price,
}: {
  label?: string;
  price?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;
    const form = wrapper.querySelector("form");
    if (!form || form.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_SQNWPdh5L4Gf5w");
    script.async = true;
    form.appendChild(script);

    return () => {
      form.innerHTML = "";
    };
  }, []);

  const displayPrice = price ? ` — $${price}` : "";

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "54px", minHeight: "54px", borderRadius: "14px", overflow: "hidden" }}
    >
      {/* Razorpay form — invisible overlay that captures clicks */}
      <form
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          opacity: 0.01,
          cursor: "pointer",
          overflow: "hidden",
        }}
      />

      {/* Branded button — visible underneath */}
      <div
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
          pointerEvents: "none",
        }}
      >
        {label}{displayPrice}
      </div>
    </div>
  );
}

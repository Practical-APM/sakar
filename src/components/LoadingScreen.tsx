"use client";

import { useEffect, useRef, useState } from "react";

type SpoolLoadingProps = {
  onComplete: (handoff: number) => void;
};

/**
 * Rotating spool drops matte jute onto the page.
 * When ready, fades out and hands the thread tip to the page stitch.
 */
export function SpoolLoading({ onComplete }: SpoolLoadingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hiding, setHiding] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let start = 0;
    const duration = 900;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Soft linen plate behind spool
      ctx.fillStyle = "#EEE9DF";
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.28;
      const angle = now * 0.004;

      // Spool body
      ctx.save();
      ctx.translate(cx, cy);
      // Shadow
      ctx.beginPath();
      ctx.ellipse(4, 28, 52, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fill();

      // End caps — wood spool
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(side * 38, 0, 10, 34, 0, 0, Math.PI * 2);
        const cap = ctx.createLinearGradient(side * 38 - 10, -34, side * 38 + 10, 34);
        cap.addColorStop(0, "#e8d4b0");
        cap.addColorStop(0.5, "#c9a878");
        cap.addColorStop(1, "#9a7d4e");
        ctx.fillStyle = cap;
        ctx.fill();
      }

      // Wound jute cylinder — sandy natural jute
      ctx.save();
      ctx.rotate(angle * 0.15);
      for (let i = 0; i < 14; i++) {
        const yy = -28 + i * 4.2;
        ctx.beginPath();
        ctx.ellipse(0, yy, 36, 5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? "#dcc49a" : "#b8955c";
        ctx.lineWidth = 3.2;
        ctx.stroke();
      }
      ctx.restore();

      // Axle
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#3d2a14";
      ctx.fill();
      ctx.restore();

      // Falling jute cord
      const fall = Math.min(h * 0.55, 40 + t * h * 0.62);
      const sway = Math.sin(now * 0.003) * 8 * (1 - t * 0.5);
      ctx.save();
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx + 20, cy + 30);
      ctx.quadraticCurveTo(
        cx + 30 + sway,
        cy + fall * 0.45,
        cx + sway * 0.3,
        cy + fall,
      );
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 14;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 20, cy + 30);
      ctx.quadraticCurveTo(
        cx + 28 + sway,
        cy + fall * 0.45,
        cx + sway * 0.3,
        cy + fall,
      );
      ctx.strokeStyle = "#b8955c";
      ctx.lineWidth = 7;
      ctx.stroke();

      for (let s = 0; s < 3; s++) {
        ctx.beginPath();
        ctx.moveTo(cx + 18 + s, cy + 30);
        ctx.quadraticCurveTo(
          cx + 26 + sway + s * 2,
          cy + fall * 0.45,
          cx + sway * 0.3 + (s - 1) * 2,
          cy + fall,
        );
        ctx.strokeStyle = s === 1 ? "#e8d4b0" : "#9a7d4e";
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(cx + sway * 0.3, cy + fall, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#c9a878";
      ctx.fill();

      ctx.fillStyle = "#20231F";
      ctx.font = "500 28px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("S/B", cx, h * 0.12);
      ctx.font = "500 11px system-ui, sans-serif";
      ctx.fillStyle = "#A97916";
      ctx.letterSpacing = "0.2em";
      ctx.fillText("THREADING", cx, h * 0.16);

      if (t >= 1 && !doneRef.current) {
        doneRef.current = true;
        setHiding(true);
        window.setTimeout(() => onComplete(1), 320);
      } else {
        raf = requestAnimationFrame(paint);
      }
    };

    resize();
    raf = requestAnimationFrame(paint);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  return (
    <div
      className={`loading-screen spool-loading ${hiding ? "is-hiding" : ""}`}
      role="status"
      aria-live="polite"
    >
      <canvas ref={canvasRef} className="spool-loading__canvas" aria-hidden />
    </div>
  );
}

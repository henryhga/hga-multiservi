"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./BeforeAfterComparison.module.css";

export default function BeforeAfterComparison({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  altBefore = "Before cleaning",
  altAfter = "After cleaning",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  altBefore?: string;
  altAfter?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  }

  function onPointerUp() {
    draggingRef.current = false;
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + step));
      e.preventDefault();
    } else if (e.key === "Home") {
      setPosition(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setPosition(100);
      e.preventDefault();
    }
  }

  return (
    <div
      ref={containerRef}
      className={styles.wrap}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className={styles.imageLayer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={afterSrc} alt={altAfter} className={styles.image} loading="lazy" />
        <span className={`${styles.tag} ${styles.tagAfter}`}>{afterLabel}</span>
      </div>

      <div className={styles.imageLayer} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={altBefore} className={styles.image} loading="lazy" />
        <span className={`${styles.tag} ${styles.tagBefore}`}>{beforeLabel}</span>
      </div>

      <div className={styles.divider} style={{ left: `${position}%` }} aria-hidden="true" />

      <button
        type="button"
        className={styles.handle}
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before, ${Math.round(100 - position)}% after`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

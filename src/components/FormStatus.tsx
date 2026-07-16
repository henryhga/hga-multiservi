import type { ReactNode } from "react";
import styles from "./FormStatus.module.css";

export function SuccessMessage({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.status} ${styles.success}`} role="status" aria-live="polite">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p>{children}</p>
    </div>
  );
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.status} ${styles.error}`} role="alert">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p>{children}</p>
    </div>
  );
}

export function LoadingState({ children = "Submitting…" }: { children?: ReactNode }) {
  return (
    <span className={styles.loading} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      {children}
    </span>
  );
}

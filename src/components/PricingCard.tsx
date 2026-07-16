import Button from "./Button";
import styles from "./PricingCard.module.css";
import type { BillingInterval } from "@/lib/config";

export default function PricingCard({
  planKey,
  name,
  badge,
  firstBin,
  secondBin,
  description,
  features,
  ctaLabel,
}: {
  planKey: BillingInterval;
  name: string;
  badge?: string;
  firstBin: number;
  secondBin: number;
  description: string;
  features: readonly string[];
  ctaLabel: string;
}) {
  return (
    <div className={`${styles.card} ${badge ? styles.featured : ""}`}>
      {badge && <span className={styles.badge}>{badge}</span>}

      <h3 className={styles.name}>{name}</h3>

      <div className={styles.price}>
        <span className={styles.amount}>${firstBin.toFixed(2)}</span>
        <span className={styles.period}>/ first bin</span>
      </div>
      <p className={styles.secondBin}>+${secondBin.toFixed(2)} second bin</p>
      <p className={styles.description}>{description}</p>

      <ul className={styles.features}>
        {features.map((f) => (
          <li key={f}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button href={`/bin-cleaning/signup?plan=${planKey}`} variant={badge ? "primary" : "secondary"} size="lg" className={styles.cta}>
        {ctaLabel}
      </Button>
    </div>
  );
}

import type { Metadata } from "next";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import { business } from "@/lib/config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Your Plan",
  description: "Manage your HGA Multiservi bin cleaning subscription.",
  alternates: { canonical: "/manage-plan" },
  robots: { index: false, follow: true },
};

const upcoming = [
  "Update your payment method",
  "View past invoices and receipts",
  "Change your cleaning frequency",
  "Cancel your subscription",
];

export default function ManagePlanPage() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Account"
          title="Manage Your Plan"
          description="Self-service subscription management is coming soon. In the meantime, our team can help you directly."
        />

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Coming Soon</h2>
            <ul className={styles.list}>
              {upcoming.map((item) => (
                <li key={item}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              This self-service customer portal will be available once secure account access is
              connected. It will only ever show your own subscription — never anyone else&apos;s.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Need Help Now?</h2>
            <p className={styles.helpText}>
              Call, text or email us and we&apos;ll update your payment method, adjust your
              frequency or cancel your plan for you.
            </p>
            <div className={styles.actions}>
              <Button href={business.phoneHref} variant="primary" size="lg">
                Call or Text {business.phoneDisplay}
              </Button>
              <Button href={`mailto:${business.email}`} variant="secondary" size="lg">
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

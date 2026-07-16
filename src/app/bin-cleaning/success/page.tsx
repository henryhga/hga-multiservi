import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { business, binPlans, type BillingInterval } from "@/lib/config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Signup Received",
  robots: { index: false, follow: false },
};

function isBillingInterval(value: string | undefined): value is BillingInterval {
  return !!value && value in binPlans;
}

export default async function BinCleaningSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; plan?: string }>;
}) {
  const params = await searchParams;
  const isWaitlist = params.status === "waitlist";
  const plan = isBillingInterval(params.plan) ? binPlans[params.plan] : null;

  return (
    <section className={`section ${styles.wrap}`}>
      <div className={`container ${styles.card}`}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <h1 className={styles.title}>
          {isWaitlist ? "You're on the Waiting List" : "Signup Request Received"}
        </h1>

        {isWaitlist ? (
          <p className={styles.text}>
            Thanks for signing up! Your ZIP code isn&apos;t in our active service area yet. We&apos;ve
            added you to our waiting list and will reach out at the email or phone number you
            provided as soon as service becomes available. You have not been charged.
          </p>
        ) : (
          <p className={styles.text}>
            Thanks{plan ? ` for choosing the ${plan.name} plan` : ""}! We received your signup
            details. Our team will confirm service availability and follow up with a secure
            payment link before your first cleaning is scheduled — you have not been charged yet.
          </p>
        )}

        <p className={styles.subtext}>
          Questions in the meantime? Call or text us at{" "}
          <a href={business.phoneHref}>{business.phoneDisplay}</a> or email{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a>.
        </p>

        <div className={styles.actions}>
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Link href="/bin-cleaning" className={styles.secondaryLink}>
            View Bin Cleaning Plans
          </Link>
        </div>
      </div>
    </section>
  );
}

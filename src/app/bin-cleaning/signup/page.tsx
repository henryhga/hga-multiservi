import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";
import { binPlans, type BillingInterval } from "@/lib/config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sign Up for Bin Cleaning",
  description: "Complete your HGA Multiservi trash bin cleaning signup.",
  alternates: { canonical: "/bin-cleaning/signup" },
  robots: { index: false, follow: true },
};

function isBillingInterval(value: string | undefined): value is BillingInterval {
  return !!value && value in binPlans;
}

export default async function BinCleaningSignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const initialPlan: BillingInterval = isBillingInterval(params.plan) ? params.plan : "monthly";

  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="signup-heading">
      <div className="container">
        <h1 id="signup-heading" className={styles.heading}>
          Complete Your Bin Cleaning Signup
        </h1>
        <p className={styles.subheading}>
          Review your plan, confirm service availability in your area, and submit your details.
        </p>
        <SignupForm initialPlan={initialPlan} />
      </div>
    </section>
  );
}

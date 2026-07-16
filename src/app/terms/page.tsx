import type { Metadata } from "next";
import { business } from "@/lib/config";
import styles from "@/styles/legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${business.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.updated}>Last updated: July 16, 2026</p>
        </div>

        <div className={styles.draftNotice} role="note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M12 9v4M12 16.5h.01M10.3 3.9 2.7 17a1.8 1.8 0 0 0 1.6 2.7h15.4a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            Draft content — legal review required before publishing. This page is not a
            substitute for advice from a qualified attorney.
          </span>
        </div>

        <div className={styles.prose}>
          <h2>Acceptance of Terms</h2>
          <p>
            By requesting a quote, booking, or using services from {business.name}, you agree to
            these Terms of Service. For trash bin cleaning subscriptions, the{" "}
            <a href="/bin-cleaning-terms">Bin Cleaning Terms</a> also apply.
          </p>

          <h2>Services</h2>
          <p>
            We provide exterior cleaning services (including house washing, driveway cleaning,
            roof cleaning, commercial cleaning, window cleaning and solar panel cleaning) and
            trash bin cleaning services within our published service areas.
          </p>

          <h2>Quotes &amp; Scheduling</h2>
          <p>
            Quotes provided before an on-site inspection are estimates. Final pricing may be
            confirmed after reviewing the property. Scheduling is subject to availability and
            weather conditions.
          </p>

          <h2>Payments</h2>
          <p>
            Payments are processed securely through Stripe. We do not store full payment card
            details on our own systems.
          </p>

          <h2>Cancellations</h2>
          <p>
            You may reschedule or cancel a service appointment by contacting us in advance.
            Recurring bin cleaning subscriptions are governed by the{" "}
            <a href="/bin-cleaning-terms">Bin Cleaning Terms</a>.
          </p>

          <h2>Property Access</h2>
          <p>
            You are responsible for providing safe and reasonable access to the areas being
            cleaned, including any required water or power source when applicable.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the extent permitted by law, {business.legalDisclaimerName} is not liable for
            pre-existing damage, indirect damages, or issues arising from inaccessible or unsafe
            property conditions.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our services after
            changes are posted constitutes acceptance of the updated terms.
          </p>

          <h2>Contact</h2>
          <ul>
            <li>Email: {business.email}</li>
            <li>Phone: {business.phoneDisplay}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

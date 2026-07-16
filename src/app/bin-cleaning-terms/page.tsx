import type { Metadata } from "next";
import { business } from "@/lib/config";
import styles from "@/styles/legal.module.css";

export const metadata: Metadata = {
  title: "Bin Cleaning Terms",
  description: `Bin cleaning service terms for ${business.name}.`,
  alternates: { canonical: "/bin-cleaning-terms" },
};

export default function BinCleaningTermsPage() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Bin Cleaning Terms</h1>
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
          <h2>Service Frequency</h2>
          <p>
            Bin cleaning is provided according to the plan you select: monthly, every two months,
            or a single one-time visit.
          </p>

          <h2>Pricing</h2>
          <p>
            Pricing for each plan is displayed at signup and applies to the first bin. Prices are
            set centrally and are not affected by values entered in your browser.
          </p>

          <h2>Second Bin</h2>
          <p>
            A second bin may be added for the listed second-bin surcharge shown for your selected
            plan at signup.
          </p>

          <h2>Automatic Renewal</h2>
          <p>
            Monthly and Every 2 Months plans renew automatically at the interval selected until
            cancelled. One-Time Cleaning does not renew and involves no recurring billing.
          </p>

          <h2>Cancellation</h2>
          <p>
            You may cancel a recurring plan at any time by contacting us or, once available,
            through your account at <a href="/manage-plan">Manage Plan</a>. Cancellation takes
            effect at the end of the current billing period unless otherwise stated.
          </p>

          <h2>Failed Payments</h2>
          <p>
            If a scheduled payment fails, we will attempt to notify you and may pause future
            cleanings until payment is resolved.
          </p>

          <h2>Refunds</h2>
          <p>
            Refund requests are reviewed on a case-by-case basis, generally for cleanings that
            were paid for but not performed due to our error.
          </p>

          <h2>Inaccessible Bins</h2>
          <p>
            If our team cannot access your bins at the scheduled time, the visit may be recorded
            as a missed cleaning. Repeated inaccessibility may result in a pause or cancellation
            of service.
          </p>

          <h2>Bins Not Emptied</h2>
          <p>
            Bins must be emptied of household trash before cleaning. We are not able to clean
            bins that are full or that were not put out for regular collection.
          </p>

          <h2>Hazardous &amp; Heavy Waste</h2>
          <p>
            Bins must be free of hazardous materials, chemicals, sharp objects, construction
            debris and other prohibited or excessively heavy items before cleaning.
          </p>

          <h2>Prohibited Items</h2>
          <p>
            We reserve the right to skip a cleaning if a bin contains items that are unsafe or
            inappropriate to clean around.
          </p>

          <h2>Pre-Existing Damage</h2>
          <p>
            We are not responsible for pre-existing damage, cracks, odors or staining present on
            a bin before our first cleaning.
          </p>

          <h2>Weather Conditions</h2>
          <p>
            Cleanings affected by unsafe weather will be rescheduled to the next available date at
            no extra charge.
          </p>

          <h2>Route Changes</h2>
          <p>
            Scheduled cleaning days may occasionally change due to route adjustments. We will make
            reasonable efforts to notify affected customers in advance.
          </p>

          <h2>Property Access</h2>
          <p>
            You are responsible for providing safe, reasonable access to your bins, including
            accurate gate codes or access instructions provided at signup.
          </p>

          <h2>Customer Responsibility</h2>
          <p>
            You are responsible for placing bins in the agreed location on your scheduled cleaning
            day and keeping your account and property details up to date.
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

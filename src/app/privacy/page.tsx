import type { Metadata } from "next";
import { business } from "@/lib/config";
import styles from "@/styles/legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${business.name}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
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
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including your name, email
            address, phone number, service address and any details you include in a quote
            request, signup form or message to us.
          </p>

          <h2>Why We Collect It</h2>
          <p>
            We use this information to respond to quote requests, schedule and provide exterior
            cleaning and trash bin cleaning services, process payments, and communicate with you
            about your service.
          </p>

          <h2>Forms</h2>
          <p>
            Quote request and signup forms on this site are submitted through Web3Forms, a
            third-party form delivery service, so that your request reaches our team by email.
          </p>

          <h2>Payments Processed by Stripe</h2>
          <p>
            When online payment collection is enabled, payments and recurring billing for bin
            cleaning plans will be processed by Stripe. We do not store your full card number,
            CVC or bank account details on our own servers.
          </p>

          <h2>External Providers</h2>
          <p>
            We may use trusted external providers — such as form delivery, payment processing,
            and internal scheduling tools like Google Sheets or Make.com automations — solely to
            operate our business and deliver your service.
          </p>

          <h2>Communications</h2>
          <p>
            We send transactional communications (quote confirmations, scheduling updates,
            billing notices) related to services you request. Marketing communications are only
            sent if you separately opt in, and you can opt out at any time.
          </p>

          <h2>Cookies &amp; Analytics</h2>
          <p>
            This site does not currently use tracking cookies or third-party analytics beyond
            what is required for basic functionality. If that changes, this policy will be
            updated to describe what is used and how to opt out.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain customer and service information for as long as needed to provide our
            services, comply with legal and tax obligations, and resolve disputes.
          </p>

          <h2>Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect your information,
            including not storing sensitive payment details on our own systems.
          </p>

          <h2>Your Rights &amp; Requests</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by
            contacting us using the details below.
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

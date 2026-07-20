import Link from "next/link";
import Logo from "./Logo";
import { business } from "@/lib/config";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.ctaRow}`}>
        <div className={styles.ctaText}>
          <span className={styles.ctaLabel}>Call or Text</span>
          <a href={business.phoneHref} className={styles.ctaPhone}>
            {business.phoneDisplay}
          </a>
        </div>
        <a href={business.phoneHref} className={styles.ctaButton}>
          Get a Free Quote Today!
        </a>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p>
            Professional exterior cleaning and trash bin cleaning services
            serving residential and commercial customers across Miami-Dade.
          </p>
          <div className={styles.socials}>
            <a href={business.socials.facebook} aria-label="HGA Multiservi on Facebook" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1c0-.6.4-1 1-1Z" fill="currentColor" />
              </svg>
            </a>
            <a href={business.socials.instagram} aria-label="HGA Multiservi on Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4>
            <span className={styles.colIcon} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2.5c3.2 4 5.4 7.1 5.4 10a5.4 5.4 0 1 1-10.8 0c0-2.9 2.2-6 5.4-10Z" fill="currentColor" />
              </svg>
            </span>
            Service Areas
          </h4>
          <ul>
            {business.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>
            <span className={styles.colIcon} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3.1.7-.2 1L6.6 10.8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Phone
          </h4>
          <ul>
            <li>
              <a href={business.phoneHref}>{business.phoneDisplay}</a>
            </li>
            <li>
              <a href={business.smsHref}>Call or Text {business.phoneDisplay}</a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>
            <span className={styles.colIcon} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M3 5h18v14H3V5Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="m3 6 9 7 9-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Email
          </h4>
          <ul>
            <li>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </li>
          </ul>
          <h4 className={styles.legalHeading}>Legal</h4>
          <ul>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/bin-cleaning-terms">Bin Cleaning Terms</Link>
            </li>
            <li>
              <Link href="/manage-plan">Manage Plan</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {year} {business.name}. All Rights Reserved.
        </span>
        <span className={styles.licensed}>Licensed &amp; Insured</span>
      </div>
    </footer>
  );
}

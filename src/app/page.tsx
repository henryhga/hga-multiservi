import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import BenefitCard from "@/components/BenefitCard";
import ServiceAreaPills from "@/components/ServiceAreaPills";
import ContactCTA from "@/components/ContactCTA";
import { business } from "@/lib/config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Exterior & Trash Bin Cleaning in Miami-Dade",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${business.name} | Exterior & Trash Bin Cleaning in Miami-Dade`,
    description:
      "Professional exterior cleaning and trash bin cleaning services across Miami-Dade.",
    url: business.siteUrl,
  },
};

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroSky} />
          <div className={styles.heroGlow} />
          <svg className={styles.skyline} viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
            <rect x="40" y="90" width="60" height="130" fill="currentColor" />
            <rect x="120" y="50" width="45" height="170" fill="currentColor" />
            <rect x="185" y="110" width="55" height="110" fill="currentColor" />
            <rect x="900" y="70" width="50" height="150" fill="currentColor" />
            <rect x="970" y="30" width="42" height="190" fill="currentColor" />
            <rect x="1030" y="100" width="60" height="120" fill="currentColor" />
            <rect x="1105" y="60" width="46" height="160" fill="currentColor" />
          </svg>
          <div className={styles.heroWater} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <span className={styles.heroLogoMark} aria-hidden="true">
            HGA MULTISERVI
          </span>
          <h1 id="hero-heading" className={styles.heroTitle}>
            Professional Exterior Cleaning &amp; Trash Bin Cleaning Services
          </h1>
          <p className={styles.heroSubtitle}>
            Serving residential and commercial customers across Miami-Dade.
          </p>
          <ServiceAreaPills variant="dark" />
        </div>
      </section>

      <section className={`container ${styles.cardsSection}`} aria-label="Explore our services">
        <div className={styles.cardsGrid}>
          <Link href="/exterior-cleaning" className={styles.exploreCard}>
            <span className={`${styles.exploreIcon} ${styles.exploreIconBlue}`} aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className={styles.exploreTitle}>HGA Exterior Cleaning Services</h2>
            <p className={styles.exploreText}>
              House washing, driveways, roofs, windows, solar panels and commercial properties.
            </p>
            <span className={styles.exploreCta}>
              Explore Exterior Cleaning
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <Link href="/bin-cleaning" className={styles.exploreCard}>
            <span className={`${styles.exploreIcon} ${styles.exploreIconNavy}`} aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <h2 className={styles.exploreTitle}>HGA Trash Bin Cleaning Services</h2>
            <p className={styles.exploreText}>
              Clean, sanitized and odor-free bins with flexible monthly, bi-monthly or one-time plans.
            </p>
            <span className={styles.exploreCta}>
              View Bin Cleaning Plans
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <section id="about" className={`section ${styles.whySection}`} aria-labelledby="why-heading">
        <div className="container">
          <SectionHeading eyebrow="Why HGA Multiservi" title="Why Choose HGA Multiservi" as="h2" />
          <div className={styles.benefitsGrid}>
            <BenefitCard
              icon={
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.5 20 6v6c0 5-3.4 8.5-8 9.5-4.6-1-8-4.5-8-9.5V6l8-3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              }
              title="Professional Service"
              description="Trained professionals using the right equipment and techniques."
            />
            <BenefitCard
              icon={
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M4 9.5h16M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              }
              title="Reliable Scheduling"
              description="On-time appointments that fit your schedule."
            />
            <BenefitCard
              icon={
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="Quality Results"
              description="Attention to detail that leaves your property looking its best."
            />
            <BenefitCard
              icon={
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.5c3.2 4 5.4 7.1 5.4 10a5.4 5.4 0 1 1-10.8 0c0-2.9 2.2-6 5.4-10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              }
              title="Serving Miami-Dade"
              description="Proudly serving Hialeah, Miami Lakes, Miami Gardens and Miramar."
            />
          </div>
        </div>
      </section>

      <section id="contact" className="section" aria-label="Contact HGA Multiservi">
        <ContactCTA />
      </section>
    </>
  );
}

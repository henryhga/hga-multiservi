import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import BenefitCard from "@/components/BenefitCard";
import ServiceAreaPills from "@/components/ServiceAreaPills";
import ContactCTA from "@/components/ContactCTA";
import HgaMark from "@/components/HgaMark";
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
          <span className={`${styles.cloud} ${styles.cloud1}`} />
          <span className={`${styles.cloud} ${styles.cloud2}`} />
          <span className={`${styles.cloud} ${styles.cloud3}`} />
          <span className={`${styles.cloud} ${styles.cloud4}`} />

          <svg className={styles.skyline} viewBox="0 0 420 260" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
            <rect x="10" y="140" width="34" height="120" fill="currentColor" />
            <rect x="50" y="100" width="26" height="160" fill="currentColor" />
            <rect x="82" y="150" width="30" height="110" fill="currentColor" />
            <rect x="118" y="60" width="22" height="200" fill="currentColor" />
            <rect x="146" y="120" width="34" height="140" fill="currentColor" />
            <rect x="186" y="90" width="24" height="170" fill="currentColor" />
            <rect x="216" y="150" width="28" height="110" fill="currentColor" />
            <rect x="250" y="30" width="16" height="230" fill="currentColor" />
            <rect x="272" y="130" width="30" height="130" fill="currentColor" />
            <rect x="308" y="170" width="26" height="90" fill="currentColor" />
            <rect x="340" y="110" width="24" height="150" fill="currentColor" />
            <rect x="370" y="160" width="30" height="100" fill="currentColor" />
          </svg>

          <svg className={styles.palm} viewBox="0 0 300 620" aria-hidden="true">
            <path d="M182 620 C170 460 178 340 198 220" stroke="#5b4636" strokeWidth="16" fill="none" strokeLinecap="round" />
            <g fill="#2f5233">
              <path d="M198 220 C140 200 90 160 60 100 C110 120 160 150 198 220 Z" />
              <path d="M198 220 C150 170 130 120 130 60 C170 100 195 150 198 220 Z" />
              <path d="M198 220 C200 150 220 100 260 60 C250 120 230 170 198 220 Z" />
              <path d="M198 220 C230 180 270 160 320 150 C290 190 250 210 198 220 Z" />
              <path d="M198 220 C170 190 130 180 90 190 C120 210 155 222 198 220 Z" />
            </g>
          </svg>

          <div className={styles.heroWater} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <HgaMark className={styles.heroLogoMark} />
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

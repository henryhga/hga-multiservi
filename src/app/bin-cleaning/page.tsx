import type { Metadata } from "next";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import PricingCard from "@/components/PricingCard";
import FAQAccordion from "@/components/FAQAccordion";
import ServiceAreaPills from "@/components/ServiceAreaPills";
import { binFaqs, binPlans, business } from "@/lib/config";
import { getNonce } from "@/lib/nonce";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Trash Bin Cleaning Plans in Miami-Dade",
  description:
    "Clean, sanitized and odor-free bins delivered with convenient service across Miami-Dade. Monthly, every-2-months and one-time plans available.",
  alternates: { canonical: "/bin-cleaning" },
};

const steps = [
  { title: "Choose a Plan", description: "Pick the plan that fits your household." },
  { title: "Leave Bins Outside", description: "Place your bins at the curb on your scheduled day." },
  { title: "We Clean & Sanitize", description: "We thoroughly clean, sanitize and deodorize each bin." },
  { title: "Enjoy a Fresher Bin", description: "We return your bins clean, curbside." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: binFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function BinCleaningPage() {
  const nonce = await getNonce();
  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={styles.hero} aria-labelledby="bc-hero-heading">
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroSky} />
          <span className={`${styles.cloud} ${styles.cloud1}`} />
          <span className={`${styles.cloud} ${styles.cloud2}`} />

          <svg className={styles.skyline} viewBox="0 0 420 260" preserveAspectRatio="xMaxYMax meet">
            <rect x="10" y="140" width="34" height="120" fill="currentColor" />
            <rect x="50" y="100" width="26" height="160" fill="currentColor" />
            <rect x="82" y="150" width="30" height="110" fill="currentColor" />
            <rect x="118" y="60" width="22" height="200" fill="currentColor" />
            <rect x="146" y="120" width="34" height="140" fill="currentColor" />
            <rect x="186" y="90" width="24" height="170" fill="currentColor" />
            <rect x="216" y="150" width="28" height="110" fill="currentColor" />
          </svg>

          <svg className={styles.binScene} viewBox="0 0 480 320">
            <ellipse cx="330" cy="300" rx="230" ry="18" fill="rgba(10,40,80,0.08)" />

            <g>
              <rect x="300" y="130" width="150" height="120" rx="8" fill="#eef3f7" stroke="#b9c8d4" strokeWidth="2" />
              <rect x="300" y="130" width="150" height="34" rx="8" fill="#233a52" />
              <text x="375" y="153" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="14" fill="#ffffff">HGA</text>
              <circle cx="320" cy="255" r="16" fill="#1a2c40" />
              <circle cx="430" cy="255" r="16" fill="#1a2c40" />
              <rect x="292" y="180" width="16" height="46" rx="4" fill="#2f6fb0" />
              <rect x="292" y="180" width="16" height="46" rx="8" fill="none" stroke="#1c4f8f" strokeWidth="2" />
            </g>

            <g>
              <rect x="120" y="180" width="90" height="110" rx="10" fill="var(--color-primary)" />
              <rect x="120" y="168" width="90" height="18" rx="6" fill="#1c4f8f" />
              <rect x="150" y="230" width="30" height="30" rx="4" fill="#ffffff" opacity="0.18" />
            </g>

            <g>
              <rect x="215" y="190" width="85" height="100" rx="10" fill="#2f7d4f" />
              <rect x="215" y="178" width="85" height="18" rx="6" fill="#1f5c38" />
              <rect x="243" y="235" width="28" height="28" rx="4" fill="#ffffff" opacity="0.18" />
            </g>

            <g stroke="#2f5233" strokeWidth="7" fill="none" strokeLinecap="round">
              <path d="M455 90 C440 70 420 55 395 48" />
              <path d="M455 90 C450 60 445 35 452 8" />
              <path d="M455 90 C468 65 480 45 480 20" />
              <path d="M455 90 C475 78 478 60 470 38" />
            </g>
            <path d="M455 90 C450 150 452 210 448 260" stroke="#6e4634" strokeWidth="9" fill="none" strokeLinecap="round" />
          </svg>

          <div className={styles.heroWater} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <h1 id="bc-hero-heading" className={styles.heroTitle}>
            Choose the Right Bin Cleaning Plan
          </h1>
          <p className={styles.heroSubtitle}>
            Clean, sanitized and odor-free bins delivered with convenient service across Miami-Dade.
          </p>
          <div className={styles.heroActions}>
            <Button href="#plans" variant="primary" size="lg">
              Get Started
            </Button>
            <Button href={business.phoneHref} variant="secondary" size="lg">
              Call or Text {business.phoneDisplay}
            </Button>
          </div>
          <ul className={styles.heroClaims}>
            <li>Helps reduce odors</li>
            <li>Removes grime and residue</li>
            <li>Sanitizing treatment</li>
            <li>Professional bin cleaning</li>
          </ul>
        </div>
      </section>

      <section id="plans" className="section" aria-labelledby="plans-heading">
        <div className="container">
          <SectionHeading as="h2" eyebrow="Pricing" title="Choose Your Plan" />
          <div className={styles.plansGrid}>
            {Object.values(binPlans).map((plan) => (
              <PricingCard
                key={plan.key}
                planKey={plan.key}
                name={plan.name}
                badge={plan.badge}
                firstBin={plan.firstBin}
                secondBin={plan.secondBin}
                description={plan.description}
                features={plan.features}
                ctaLabel={plan.ctaLabel}
              />
            ))}
          </div>
          <p className={styles.pricingNote}>
            Pricing shown for the first bin. Add the second bin at the listed rate.
          </p>
        </div>
      </section>

      <section className={`section ${styles.howSection}`} aria-labelledby="how-heading">
        <div className="container">
          <SectionHeading as="h2" title="How It Works" />
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="areas-heading">
        <div className="container">
          <SectionHeading as="h2" title="Service Areas" />
          <ServiceAreaPills variant="light" />
        </div>
      </section>

      <section className={`section ${styles.faqSection}`} aria-labelledby="faq-heading">
        <div className="container">
          <SectionHeading as="h2" title="Frequently Asked Questions" />
          <div className={styles.faqWrap}>
            <FAQAccordion items={binFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}

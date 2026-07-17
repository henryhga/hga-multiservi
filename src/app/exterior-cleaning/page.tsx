import type { Metadata } from "next";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import FAQAccordion from "@/components/FAQAccordion";
import ServiceAreaPills from "@/components/ServiceAreaPills";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";
import QuoteForm from "@/components/QuoteForm";
import { business, exteriorFaqs, exteriorServices } from "@/lib/config";
import { getNonce } from "@/lib/nonce";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Exterior Cleaning Services in Miami-Dade",
  description:
    "Driveways, houses, roofs, windows and commercial properties cleaned with professional care across Miami-Dade.",
  alternates: { canonical: "/exterior-cleaning" },
};

const serviceIcons: Record<string, ReactNode> = {
  "house-washing": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "driveway-cleaning": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 21 9 3h6l5 18M7 15h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "roof-cleaning": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12 12 4l9 8M6 11v9h12v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "commercial-cleaning": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 8h.01M14 8h.01M9 12h.01M14 12h.01M9 16h.01M14 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "window-cleaning": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  "solar-panel-cleaning": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
};

const steps = [
  { title: "Request a Quote", description: "Tell us about your property and the service you need." },
  { title: "We Review Your Property", description: "We confirm scope, access and scheduling details." },
  { title: "We Schedule Service", description: "We book a convenient appointment time." },
  { title: "Enjoy a Clean Exterior", description: "Sit back while our team gets the job done." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: exteriorFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function ExteriorCleaningPage() {
  const nonce = await getNonce();
  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className={styles.hero} aria-labelledby="ec-hero-heading">
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

          <svg className={styles.houseScene} viewBox="0 0 480 320">
            <ellipse cx="330" cy="290" rx="220" ry="20" fill="rgba(10,40,80,0.08)" />
            <g fill="#f4ece1" stroke="#c9b79a" strokeWidth="2">
              <rect x="150" y="140" width="220" height="140" />
              <path d="M130 150 L260 70 L390 150 Z" fill="#8a5a44" stroke="#6e4634" />
            </g>
            <rect x="330" y="90" width="26" height="40" fill="#8a5a44" />
            <g fill="#bcd6ea" stroke="#7fa8c4" strokeWidth="2">
              <rect x="180" y="180" width="40" height="50" />
              <rect x="300" y="180" width="40" height="50" />
            </g>
            <rect x="235" y="200" width="50" height="80" fill="#6e4634" />
            <g stroke="#2f5233" strokeWidth="7" fill="none" strokeLinecap="round">
              <path d="M455 130 C440 110 420 95 395 88" />
              <path d="M455 130 C450 100 445 75 452 48" />
              <path d="M455 130 C468 105 480 85 480 60" />
              <path d="M455 130 C475 118 478 100 470 78" />
              <path d="M455 130 C430 128 410 138 398 155" />
            </g>
            <path d="M455 130 C450 190 452 250 448 300" stroke="#6e4634" strokeWidth="10" fill="none" strokeLinecap="round" />
            <g>
              <circle cx="415" cy="235" r="16" fill="#233a52" />
              <rect x="405" y="248" width="20" height="34" fill="#233a52" />
              <rect x="399" y="250" width="10" height="24" fill="#1a2c40" transform="rotate(-18 404 262)" />
              <rect x="416" y="250" width="10" height="24" fill="#1a2c40" transform="rotate(18 421 262)" />
              <rect x="403" y="280" width="9" height="20" fill="#16232f" />
              <rect x="418" y="280" width="9" height="20" fill="#16232f" />
              <path d="M395 264 C370 268 350 278 335 296" stroke="#9fb3c4" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M335 296 C325 300 316 306 310 314" stroke="#dff0fb" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
            </g>
          </svg>

          <div className={styles.heroWater} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <h1 id="ec-hero-heading" className={styles.heroTitle}>
            Professional Exterior Cleaning Services
          </h1>
          <p className={styles.heroSubtitle}>
            Driveways, houses, roofs, windows and commercial properties cleaned with
            professional care across Miami-Dade.
          </p>
          <div className={styles.heroActions}>
            <Button href="#quote" variant="primary" size="lg">
              Get Free Quote
            </Button>
            <Button href={business.phoneHref} variant="secondary" size="lg">
              Call or Text {business.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Highlights">
        <div className={`container ${styles.trustInner}`}>
          {["House Washing", "Driveway Cleaning", "Roof Cleaning", "Commercial Cleaning", "Reliable Scheduling", ...(business.licensedAndInsured ? ["Licensed & Insured"] : [])].map(
            (item) => (
              <span key={item} className={styles.trustItem}>
                {item}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className={styles.servicesQuoteGrid}>
            <div>
              <SectionHeading
                as="h2"
                align="left"
                title="Our Exterior Cleaning Services"
              />
              <div className={styles.servicesGrid}>
                {exteriorServices.map((s) => (
                  <ServiceCard key={s.slug} icon={serviceIcons[s.slug]} name={s.name} description={s.description} />
                ))}
              </div>
            </div>

            <div id="quote" className={styles.quotePanel}>
              <h2 className={styles.quoteTitle}>Request a Free Quote</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.howSection}`} aria-labelledby="how-heading">
        <div className="container">
          <SectionHeading as="h2" eyebrow="Simple Process" title="How It Works" />
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

      <section className="section" aria-labelledby="difference-heading">
        <div className="container">
          <SectionHeading as="h2" title="See the Difference" />
          <div className={styles.compareWrap}>
            <BeforeAfterComparison
              beforeSrc="/images/placeholder-before.svg"
              afterSrc="/images/placeholder-after.svg"
              altBefore="Placeholder — add a real before photo of a completed job"
              altAfter="Placeholder — add a real after photo of a completed job"
            />
            <p className={styles.placeholderNote}>
              Photo placeholder — replace with real before/after project photos.
            </p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.areasSection}`} aria-labelledby="areas-heading">
        <div className="container">
          <SectionHeading as="h2" title="Service Areas" />
          <ServiceAreaPills variant="light" />
        </div>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <SectionHeading as="h2" title="Frequently Asked Questions" />
          <div className={styles.faqWrap}>
            <FAQAccordion items={exteriorFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}

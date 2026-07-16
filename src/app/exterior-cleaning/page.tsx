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
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
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
            <div className={styles.heroArt} aria-hidden="true">
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <circle cx="100" cy="100" r="92" fill="rgba(37,130,245,0.08)" />
                <path
                  d="M60 130V90l40-32 40 32v40M74 130V104h52v26"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M120 70l14-14M128 82l16-6" stroke="var(--color-primary-light)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
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

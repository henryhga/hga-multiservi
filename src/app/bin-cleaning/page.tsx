import type { Metadata } from "next";
import Image from "next/image";
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

          <div className={styles.heroScene}>
            <Image
              src="/images/bin-hero-scene.jpg"
              alt=""
              fill
              sizes="(max-width: 760px) 70vw, 58vw"
              style={{ objectFit: "cover", objectPosition: "right center" }}
              priority
            />
          </div>

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

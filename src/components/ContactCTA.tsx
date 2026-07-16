import Button from "./Button";
import { business } from "@/lib/config";
import styles from "./ContactCTA.module.css";

export default function ContactCTA({
  title = "Ready for a Cleaner Property?",
  description = "Get a fast, free quote today and see the HGA Multiservi difference.",
  ctaLabel = "Get Your Free Quote",
  ctaHref = "#quote",
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className={`container`}>
      <div className={styles.banner}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.actions}>
          <Button href={ctaHref} variant="primary" size="lg">
            {ctaLabel}
          </Button>
          <Button href={business.phoneHref} variant="ghost" size="lg">
            Call or Text {business.phoneDisplay}
          </Button>
        </div>
      </div>
    </div>
  );
}

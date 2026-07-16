import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="HGA Multiservi — Home">
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2.5c3.2 4 5.4 7.1 5.4 10a5.4 5.4 0 1 1-10.8 0c0-2.9 2.2-6 5.4-10Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={styles.wordmark}>
        <span className={styles.hga}>HGA</span>
        <span className={styles.multiservi}>MULTISERVI</span>
      </span>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="HGA Multiservi — Home">
      <Image
        src="/images/hga-logo-transparent.png"
        alt="HGA Multiservi"
        width={977}
        height={411}
        className={styles.mark}
        priority
      />
    </Link>
  );
}

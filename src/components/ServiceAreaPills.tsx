import { business } from "@/lib/config";
import styles from "./ServiceAreaPills.module.css";

export default function ServiceAreaPills({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  return (
    <ul className={`${styles.list} ${variant === "dark" ? styles.dark : styles.light}`}>
      {business.serviceAreas.map((area) => (
        <li key={area} className={styles.pill}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2.5c3.2 4 5.4 7.1 5.4 10a5.4 5.4 0 1 1-10.8 0c0-2.9 2.2-6 5.4-10Z"
              fill="currentColor"
            />
          </svg>
          {area}
        </li>
      ))}
    </ul>
  );
}

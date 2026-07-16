import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div className={`${styles.wrap} ${align === "left" ? styles.left : styles.center}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <Tag className={styles.title}>{title}</Tag>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

type SectionHeadingProps = {
  introduction: string;
  label: string;
  title: string;
  titleId: string;
};

export function SectionHeading({
  introduction,
  label,
  title,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className={styles.root} data-animate="reveal">
      <div>
        <p className={styles.label}>{label}</p>
        <h2 className={styles.title} id={titleId}>
          {title}
        </h2>
      </div>
      <p className={styles.introduction}>{introduction}</p>
    </div>
  );
}
import * as styles from "./section-heading.css";

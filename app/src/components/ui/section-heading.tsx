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
    <div className="section-heading reveal">
      <div>
        <p className="section-label">{label}</p>
        <h2 id={titleId}>{title}</h2>
      </div>
      <p>{introduction}</p>
    </div>
  );
}

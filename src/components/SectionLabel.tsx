type SectionLabelProps = {
  index: string;
  label: string;
  progress?: number;
};

export function SectionLabel({ index, label, progress = 0 }: SectionLabelProps) {
  return (
    <div className="section-label" aria-hidden>
      <span className="section-label__text">
        {index} {label}
      </span>
      <div className="section-label__track">
        <div
          className="section-label__fill"
          style={{ height: `${Math.min(100, progress * 100)}%` }}
        />
        <span className="section-label__diamond" />
      </div>
    </div>
  );
}

export default function ConfidenceTag({ label, confidence, className = "" }) {
  return (
    <div className={`mono-tag flex items-center gap-2 text-muted ${className}`}>
      <span>{label}</span>
      {confidence && <span className="text-signal">{confidence.toFixed(2)}</span>}
    </div>
  );
}

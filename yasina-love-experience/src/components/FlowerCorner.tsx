interface Props {
  className?: string;
}

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

/** Decorative flower drawn with SVG. Colors come from CSS (.flower rules in styles.css). */
export function FlowerCorner({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <path className="stem" d="M60 84 C 58 98 62 108 60 120" />
      <path className="leaf" d="M60 102 C 44 96 40 84 46 76 C 56 84 60 92 60 102 Z" />
      {PETAL_ANGLES.map((angle) => (
        <ellipse
          key={angle}
          className="petal"
          cx="60"
          cy="32"
          rx="14"
          ry="24"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
      <circle className="center" cx="60" cy="60" r="9" />
    </svg>
  );
}

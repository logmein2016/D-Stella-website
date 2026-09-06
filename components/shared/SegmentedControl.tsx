"use client";

type Option<T extends string> = { value: T; label: string };

type SegmentedControlProps<T extends string> = {
  name: string;
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  /** Estimator's two selectors are full-width with options flexed 1:1 and
   * centered; the work filter (home/portfolio) sizes to its labels. */
  fullWidth?: boolean;
  "aria-label"?: string;
};

export default function SegmentedControl<T extends string>({
  name,
  options,
  value,
  onChange,
  fullWidth = false,
  "aria-label": ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div className="seg" style={fullWidth ? { width: "100%", display: "flex" } : undefined} role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className="seg-opt"
            style={{
              flex: fullWidth ? 1 : undefined,
              justifyContent: fullWidth ? "center" : undefined,
              background: checked ? "var(--color-accent-300)" : "transparent",
              color: checked ? "var(--color-accent-900)" : "var(--color-text)",
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}

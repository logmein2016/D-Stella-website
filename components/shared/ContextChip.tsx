export default function ContextChip({ context }: { context: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        borderLeft: "3px solid var(--color-accent)",
        padding: "var(--space-2) var(--space-3)",
        background: "var(--color-accent-100)",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent-900)" }}>
        {context}
      </span>
    </div>
  );
}

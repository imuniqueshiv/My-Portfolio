export function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="font-mono text-xs tracking-[0.25em] text-pink-400/70 uppercase mb-3">
      {children}
    </p>
  );
}
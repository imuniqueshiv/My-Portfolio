export function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-10 text-balance">
      {children}
    </h2>
  );
}
export function CoursePill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-surface-card border border-border-subtle hover:border-primary-container/60 hover:text-text-high-contrast text-on-surface-variant font-label-md text-label-md px-3.5 py-2 rounded-full transition-all cursor-default group">
      <span className="w-2 h-2 rounded-full bg-primary-container/80 group-hover:bg-primary-container" />
      <span>{label}</span>
    </div>
  );
}

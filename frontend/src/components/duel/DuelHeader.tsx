export interface DuelHeaderProps {
  index: number;
  total: number;
  question: string;
  subtitle: string;
}

export function DuelHeader({ index, total, question, subtitle }: DuelHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-surface-card border border-border-subtle px-3.5 py-1 rounded-full shadow-sm">
        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_rgba(255,199,9,0.8)]" />
        <span className="font-label-sm text-label-sm text-text-muted tracking-wider">
          DUELO {index} DE {total}
        </span>
      </div>
      <h1 className="font-headline-lg text-headline-lg text-text-high-contrast mt-3">
        {question}
      </h1>
      <p className="font-body-sm text-body-sm text-text-muted mt-1 max-w-md">
        {subtitle}
      </p>
    </header>
  );
}

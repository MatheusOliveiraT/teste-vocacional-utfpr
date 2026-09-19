import { StatusPill } from "@/components/ui/StatusPill";

export function ResultHeader() {
  return (
    <section className="flex flex-col items-center text-center gap-space-sm pt-space-md">
      <StatusPill animation="ping">Seu resultado está pronto!</StatusPill>
      <h1 className="font-headline-lg text-headline-lg text-text-high-contrast tracking-tight max-w-2xl mt-space-xs">
        Diagnóstico Vocacional Concluído
      </h1>
      <p className="font-body-md text-body-md text-text-muted max-w-xl">
        Com base nas suas 36 escolhas pareadas, calculamos sua afinidade com
        todas as graduações públicas da UTFPR.
      </p>
    </section>
  );
}

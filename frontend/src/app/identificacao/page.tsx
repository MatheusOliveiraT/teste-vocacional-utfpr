import { StepProgressHeader } from "@/components/identification/StepProgressHeader";
import { IdentificationForm } from "@/components/identification/IdentificationForm";
import { Icon } from "@/components/ui/Icon";

export const metadata = {
  title: "Identificação do Estudante — Teste Vocacional UTFPR",
};

export default function IdentificationPage() {
  return (
    <div className="relative w-full py-space-xl md:py-space-2xl px-gutter flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-surface-track/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="w-full max-w-xl mx-auto flex flex-col gap-space-md">
        <StepProgressHeader
          stepLabel="Etapa 1 de 2: Identificação do Estudante"
          percent={50}
        />

        <IdentificationForm />

        <aside className="flex items-center justify-center gap-2 text-center text-text-muted font-label-sm text-label-sm">
          <Icon name="verified" className="text-[15px]" />
          <span>Avaliação gratuita • Sem necessidade de cadastro prévio</span>
        </aside>
      </div>
    </div>
  );
}

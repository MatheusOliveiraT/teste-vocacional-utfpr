import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { HighlightsGrid } from "@/components/home/HighlightsGrid";

export function HeroCard() {
  return (
    <div className="w-full max-w-[740px] bg-surface-card border border-border-subtle rounded-xl p-space-lg md:p-space-2xl text-center shadow-2xl relative">
      <StatusPill className="mb-4">Descubra seu futuro</StatusPill>

      <h1 className="font-headline-lg text-headline-lg md:text-[34px] md:leading-[40px] text-text-high-contrast tracking-tight max-w-lg mx-auto">
        Teste Vocacional de Cursos da UTFPR
      </h1>

      <p className="font-body-md text-body-md md:font-body-lg md:text-body-lg text-text-muted max-w-xl mx-auto leading-relaxed mt-3 mb-8">
        Descubra qual dos 10 cursos de graduação do câmpus de Campo Mourão
        combina mais com o seu perfil através de escolhas simples.
      </p>

      <HighlightsGrid />

      <div className="pt-6 flex flex-col items-center">
        <Button
          as="link"
          href="/identificacao"
          icon="arrow_forward"
          fullWidthOnMobile
          className="shadow-lg shadow-primary-container/15"
        >
          Iniciar Teste Vocacional
        </Button>
        <span className="font-label-sm text-label-sm text-text-muted mt-3 inline-flex items-center gap-1.5">
          <Icon name="schedule" className="text-[14px] text-text-muted" />
          Tempo estimado: 4 a 6 minutos • Gratuito e sem cadastro prévio
        </span>
      </div>
    </div>
  );
}

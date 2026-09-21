import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function CoursesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-base pt-space-xl pb-space-2xl">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1140px] mx-auto px-gutter-desktop flex flex-col items-center text-center">
        <StatusPill className="mb-space-md">
          Ensino Superior Público e Gratuito
        </StatusPill>

        <h1 className="font-headline-lg text-headline-lg md:text-[36px] md:leading-[42px] text-text-high-contrast tracking-tight max-w-3xl mb-space-sm">
          Cursos de Graduação da UTFPR-CM
        </h1>

        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl mb-space-xl">
          Conheça em detalhes os 10 cursos ofertados no Câmpus Campo Mourão.
          Formação pública federal com infraestrutura de ponta, corpo docente
          qualificado e alta inserção no mercado de trabalho.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-space-md">
          <a
            href="#catalogo-cursos"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-track text-text-high-contrast hover:bg-surface-bright font-label-md text-label-md transition-colors shadow-sm"
          >
            <Icon name="explore" className="text-[18px]" />
            Explorar Catálogo Abaixo
          </a>
          <Button as="link" href="/identificacao" icon="arrow_forward">
            Fazer o Teste Vocacional
          </Button>
        </div>
      </div>
    </section>
  );
}

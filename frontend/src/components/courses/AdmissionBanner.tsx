import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { AdmissionColumn } from "@/components/courses/AdmissionColumn";
import { ADMISSION_PATHWAYS } from "@/data/courses";

export function AdmissionBanner() {
  return (
    <section className="w-full bg-surface-container-low py-space-2xl">
      <div className="max-w-[1140px] mx-auto px-gutter-desktop">
        <div className="bg-surface-card rounded-2xl p-space-xl md:p-space-2xl shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-space-xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-track text-primary-container font-label-sm text-label-sm uppercase tracking-wider mb-space-sm">
              Processo Seletivo UTFPR
            </span>
            <h2 className="font-headline-lg text-headline-lg text-text-high-contrast tracking-tight mb-space-xs">
              Como ingressar na UTFPR Câmpus Campo Mourão?
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              O ingresso em nossos cursos de graduação gratuitos é
              democrático e ocorre semestralmente. Conheça as principais
              portas de entrada:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-xl relative z-10">
            {ADMISSION_PATHWAYS.map((pathway) => (
              <AdmissionColumn key={pathway.title} {...pathway} />
            ))}
          </div>

          <div className="bg-surface-base rounded-xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md relative z-10">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container flex-shrink-0">
                <Icon name="psychology_alt" className="text-[28px]" />
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-text-high-contrast">
                  Ainda em dúvida de qual escolher?
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Responda ao nosso questionário interativo e descubra quais
                  cursos têm maior afinidade com seu perfil.
                </p>
              </div>
            </div>
            <Button
              as="link"
              href="/identificacao"
              icon="arrow_forward"
              fullWidthOnMobile
              className="shrink-0"
            >
              Fazer o Teste Vocacional
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

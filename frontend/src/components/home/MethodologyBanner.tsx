import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function MethodologyBanner() {
  return (
    <div className="w-full max-w-[740px] mt-space-2xl bg-surface-card border border-border-subtle rounded-xl p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-lg bg-surface-track border border-border-subtle flex items-center justify-center shrink-0">
          <Icon name="balance" className="text-primary-container text-[22px]" />
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-text-high-contrast">
            Metodologia por Comparação Pareada
          </h4>
          <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
            Dilemas diretos entre atividades reais para calibrar seu índice de
            afinidade sem viés.
          </p>
        </div>
      </div>
      <Link
        href="https://www-opinionx-co.translate.goog/blog/paired-comparison?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc"
        className="shrink-0 font-label-md text-label-md text-primary-container hover:underline inline-flex items-center gap-1"
      >
        <span>Conhecer critérios</span>
        <Icon name="chevron_right" className="text-[16px]" />
      </Link>
    </div>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

export interface ImageCaptionCardProps {
  src: string;
  alt: string;
  /** Texto principal exibido no rodapé da imagem */
  caption: string;
  /** Texto secundário, alinhado à direita (ex: um selo) */
  badgeText?: string;
  /** Ícone exibido ao lado da legenda, no lugar do badge à direita */
  captionIcon?: string;
  aspectClassName?: string;
  className?: string;
}

/**
 * Cartão de imagem com gradiente e legenda sobreposta. Reutilizado na galeria
 * do câmpus (página inicial) e no snapshot do curso vencedor (página de resultado).
 */
export function ImageCaptionCard({
  src,
  alt,
  caption,
  badgeText,
  captionIcon,
  aspectClassName = "aspect-[16/10]",
  className,
}: ImageCaptionCardProps) {
  return (
    <div
      className={cn(
        // Adicionado 'w-full h-auto' para garantir controle de proporção estrito
        "relative w-full h-auto rounded-xl overflow-hidden border border-border-subtle bg-surface-card group",
        aspectClassName,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 z-10">
        <span className="font-label-sm text-label-sm text-text-high-contrast font-semibold inline-flex items-center gap-2">
          {captionIcon && (
            <Icon name={captionIcon} className="text-primary-container text-[18px]" />
          )}
          {caption}
        </span>
        {badgeText && (
          <span className="font-label-sm text-label-sm text-primary-container font-mono shrink-0">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: string;
  iconPosition?: "left" | "right";
  className?: string;
  fullWidthOnMobile?: boolean;
}

interface ButtonAsButton extends BaseProps {
  as?: "button";
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

interface ButtonAsLink extends BaseProps {
  as: "link";
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-on-primary-container hover:bg-brand-yellow-hover font-semibold shadow-sm",
  secondary:
    "bg-surface-track text-text-high-contrast hover:bg-surface-bright",
  ghost:
    "bg-surface-card text-text-high-contrast hover:bg-surface-track shadow-sm",
};

/**
 * Botão de ação reutilizável em todas as telas (CTA primário, secundário e ghost),
 * podendo renderizar como <Link> (navegação interna) ou <button> (ação em tela).
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    icon,
    iconPosition = "right",
    className,
    fullWidthOnMobile = false,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] font-label-lg text-label-lg transition-all active:scale-[0.98] cursor-pointer",
    fullWidthOnMobile && "w-full sm:w-auto",
    VARIANT_CLASSES[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <Icon name={icon} className="text-[18px]" />
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <Icon name={icon} className="text-[18px]" />
      )}
    </>
  );

  if (props.as === "link") {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}

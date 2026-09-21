export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Questionário", href: "/identificacao" },
  { label: "Cursos", href: "/cursos" },
  { label: "Sobre o Câmpus", href: "https://www.utfpr.edu.br/campus/campomourao" },
];

export const VESTIBULAR_LINK: NavLink = {
  label: "Vestibular & SISU",
  href: "https://www.utfpr.edu.br/cursos/graduacao",
};

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Questionário", href: "/identificacao" },
  { label: "Cursos", href: "#" },
  { label: "Sobre o Câmpus", href: "#" },
];

export const VESTIBULAR_LINK: NavLink = {
  label: "Vestibular & SISU",
  href: "#",
};

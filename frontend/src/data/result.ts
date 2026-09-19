import { RankedCourse } from "@/types";

export const STUDENT_NAME = "Matheus";

export const WINNER_COURSE = {
  name: "Ciência da Computação",
  degreeType: "Bacharelado",
  compatibility: 100,
  icon: "terminal",
  description:
    "Focado em desenvolvimento de software, algoritmos, inteligência artificial, jogos digitais e sistemas web/móveis.",
  metrics: [
    { icon: "schedule", label: "Duração Média", value: "4 anos (8 semestres)" },
    { icon: "light_mode", label: "Turno", value: "Integral (Manhã & Tarde)" },
    {
      icon: "award_star",
      label: "Conceito MEC",
      value: "Nota Máxima (5)",
      valueIcon: "stars",
      highlight: true,
    },
  ],
  snapshotImage: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgUaGodRkTFTcdAsTjljZupFNL7RVu4_bK1TzecmoLHp3qI86El6LDgDFRpZ7Rx2S_YbMLpeU292tmSkc3Wa_pqTPycGIZ9FSXJQiWebP1TFFudzqYjiVWyp_tRsOW4FZ2lb60IPPmhvBaptRcdpG1UdBDpBLDr2g83lgujClMQrNAa2m4MKRHEd0ZukQ8ycoyDdW9xzcG2tVnlrc-htGC6G-xFkwjbqIrYEqNxVsSHNyBWiYOSBk0",
    alt: "Estudantes de Ciência da Computação em laboratório moderno da UTFPR Campo Mourão.",
    icon: "biotech",
    caption: "Laboratório de Inteligência Artificial & Visão Computacional",
  },
  profile: {
    label: "Perfil Vocacional Mapeado",
    title: "Lógico-Analítico",
    description:
      "Alta tolerância à abstração, interesse em estruturas computacionais complexas e resolução pragmática de problemas.",
    tag: "Forte sinergia com inovação tecnológica",
  },
};

export const RANKED_COURSES: RankedCourse[] = [
  {
    rank: 1,
    name: "Ciência da Computação",
    percent: 100,
    degreeType: "Bacharelado",
    semesters: 8,
    topMatch: true,
  },
  {
    rank: 2,
    name: "Engenharia de Software",
    percent: 88,
    degreeType: "Bacharelado",
    semesters: 8,
  },
  {
    rank: 3,
    name: "Tecnologia em Inteligência Artificial",
    percent: 75,
    degreeType: "Tecnologia",
    semesters: 6,
  },
  {
    rank: 4,
    name: "Engenharia Eletrônica",
    percent: 60,
    degreeType: "Engenharia",
    semesters: 10,
  },
  {
    rank: 5,
    name: "Engenharia Mecânica",
    percent: 52,
    degreeType: "Engenharia",
    semesters: 10,
  },
  {
    rank: 6,
    name: "Engenharia Civil",
    percent: 40,
    degreeType: "Engenharia",
    semesters: 10,
  },
  {
    rank: 7,
    name: "Engenharia Química",
    percent: 34,
    degreeType: "Engenharia",
    semesters: 10,
  },
  {
    rank: 8,
    name: "Engenharia de Alimentos",
    percent: 28,
    degreeType: "Engenharia",
    semesters: 10,
  },
  {
    rank: 9,
    name: "Agronomia",
    percent: 22,
    degreeType: "Bacharelado",
    semesters: 10,
  },
  {
    rank: 10,
    name: "Licenciatura em Química",
    percent: 18,
    degreeType: "Licenciatura",
    semesters: 8,
  },
];

export const CAMPUS_BANNER = {
  image: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB299G8ENJRVpQyJSdgReojdT4ai6lLvfh_KOXhQw2lDmwl43-8LHGlLZptI1BTSR8v7TLqkK_pupxU9HRjO5wB3tKc-U1O8KZ8otvwG0NEUGN2h9syUGmoG7bDFIfJ0vvrF3rv5_tPeB6WpG0JrK0tPfuOFiP5lh0qqR7EfwlPxUKaCc4mmndoUkSlGMiE7be0DdOPioggtciLHXKR5Km6vQ62_DqEVzQKMxdP3YOoxYDB76ruX84v",
    alt: "Vista aérea noturna do câmpus da UTFPR em Campo Mourão.",
  },
  tag: "Infraestrutura Pública de Excelência",
  title: "Câmpus Campo Mourão: Referência Regional no Paraná",
  description:
    "Com mais de 25 anos de tradição tecnológica, centenas de laboratórios de ponta, corpo docente com mais de 80% de doutores e bolsas remuneradas de iniciação científica e extensão.",
};

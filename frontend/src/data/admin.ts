import { AdminStudent, BreakdownItem, SelectOption } from "@/types";

export const ADMIN_KPIS = {
  totalResponses: { value: "1.248", trend: "+18%" },
  schoolsMapped: { value: "14", label: "Instituições" },
  topCourse: {
    name: "Ciência da Computação",
    share: "312 recomendações (25%)",
    runnerUp: "Seguido por Eng. Eletrônica (18%)",
  },
  completionRate: { value: "94.2%" },
};

export const SCHOOL_BREAKDOWN: BreakdownItem[] = [
  {
    label: "Colégio Estadual Unidade Polo",
    value: "384 respostas (31%)",
    percent: 31,
    barColorClass: "bg-primary-container",
  },
  {
    label: "Colégio Estadual Marechal Rondon",
    value: "296 respostas (24%)",
    percent: 24,
    barColorClass: "bg-primary-container",
  },
  {
    label: "Colégio Integrado Campo Mourão",
    value: "215 respostas (17%)",
    percent: 17,
    barColorClass: "bg-primary-container",
  },
  {
    label: "Colégio Estadual Ivone Soares Castanharo",
    value: "182 respostas (15%)",
    percent: 15,
    barColorClass: "bg-primary-container",
  },
  {
    label: "Colégio Adventista / Outras Instituições",
    value: "171 respostas (13%)",
    percent: 13,
    barColorClass: "bg-text-muted/30",
  },
];

export const COURSE_AFFINITY_BREAKDOWN: BreakdownItem[] = [
  {
    label: "Bacharelado em Ciência da Computação",
    value: "25% (312 alunos)",
    percent: 25,
    barColorClass: "bg-primary-container",
    emphasized: true,
  },
  {
    label: "Engenharia Eletrônica",
    value: "18% (225 alunos)",
    percent: 18,
    barColorClass: "bg-brand-yellow-hover",
    emphasized: true,
  },
  {
    label: "Tecnologia em Inteligência Artificial Aplicada",
    value: "16% (200 alunos)",
    percent: 16,
    barColorClass: "bg-primary-fixed-dim",
    emphasized: true,
  },
  {
    label: "Engenharia Civil",
    value: "14% (175 alunos)",
    percent: 14,
    barColorClass: "bg-primary",
    emphasized: true,
  },
  {
    label: "Outras Graduações (Ambiental, Alimentos, Química)",
    value: "27% (336 alunos)",
    percent: 27,
    barColorClass: "bg-secondary-container",
  },
];

export const ADMIN_TOTAL_RESPONSES = 1248;

export const ADMIN_STUDENTS: AdminStudent[] = [
  {
    id: "1",
    name: "Matheus Silva",
    grade: "3º ano Médio",
    shift: "Diurno",
    school: "Colégio Estadual Unidade Polo",
    topMatchCourse: "Ciência da Computação",
    topMatchPercent: 100,
    duelsCompleted: 36,
    duelsTotal: 36,
    date: "Hoje, 14:32",
  },
  {
    id: "2",
    name: "Beatriz Oliveira Santos",
    grade: "3º ano Médio",
    shift: "Noturno",
    school: "Colégio Estadual Marechal Rondon",
    topMatchCourse: "Tecnologia em IA Aplicada",
    topMatchPercent: 94,
    duelsCompleted: 36,
    duelsTotal: 36,
    date: "Hoje, 13:48",
  },
  {
    id: "3",
    name: "Lucas Ferreira Gabriel",
    grade: "2º ano Médio",
    shift: "Integral",
    school: "Colégio Integrado Campo Mourão",
    topMatchCourse: "Engenharia Eletrônica",
    topMatchPercent: 91,
    duelsCompleted: 36,
    duelsTotal: 36,
    date: "Hoje, 11:15",
  },
  {
    id: "4",
    name: "Mariana Costa Souza",
    grade: "3º ano Médio",
    shift: "Matutino",
    school: "Colégio Estadual Ivone Soares Castanharo",
    topMatchCourse: "Engenharia Ambiental",
    topMatchPercent: 89,
    duelsCompleted: 36,
    duelsTotal: 36,
    date: "Ontem, 17:40",
  },
  {
    id: "5",
    name: "Gabriel Rodrigues Pinto",
    grade: "Ensino Médio Concluído",
    shift: "",
    school: "Colégio Estadual Unidade Polo",
    topMatchCourse: "Engenharia Civil",
    topMatchPercent: 86,
    duelsCompleted: 36,
    duelsTotal: 36,
    date: "Ontem, 16:12",
  },
  {
    id: "6",
    name: "Larissa Ramos da Silva",
    grade: "3º ano Médio",
    shift: "Diurno",
    school: "Colégio Vicentino Santa Cruz",
    topMatchCourse: "Tecnologia em Alimentos",
    topMatchPercent: 84,
    duelsCompleted: 36,
    duelsTotal: 36,
    date: "22/03, 10:20",
  },
  {
    id: "7",
    name: "Thiago Mendes Almeida",
    grade: "1º ano Médio",
    shift: "Noturno",
    school: "Colégio Estadual Marechal Rondon",
    topMatchCourse: "Licenciatura em Química",
    topMatchPercent: 82,
    duelsCompleted: 36,
    duelsTotal: 36,
    date: "21/03, 15:05",
  },
];

export const ADMIN_SCHOOL_FILTER_OPTIONS: SelectOption[] = [
  { value: "polo", label: "Colégio Estadual Unidade Polo" },
  { value: "rondon", label: "Colégio Estadual Marechal Rondon" },
  { value: "integrado", label: "Colégio Integrado Campo Mourão" },
  { value: "ivone", label: "Colégio Estadual Ivone Soares" },
  { value: "santa-cruz", label: "Colégio Vicentino Santa Cruz" },
];

export const ADMIN_GRADE_FILTER_OPTIONS: SelectOption[] = [
  { value: "3em", label: "3º ano Médio" },
  { value: "2em", label: "2º ano Médio" },
  { value: "1em", label: "1º ano Médio" },
  { value: "9ef", label: "9º ano Fundamental" },
  { value: "concluido", label: "Ensino Médio Concluído" },
];

export const ADMIN_COURSE_FILTER_OPTIONS: SelectOption[] = [
  { value: "bcc", label: "Ciência da Computação" },
  { value: "ee", label: "Engenharia Eletrônica" },
  { value: "tia", label: "IA Aplicada" },
  { value: "ec", label: "Engenharia Civil" },
  { value: "ea", label: "Engenharia Ambiental" },
  { value: "ta", label: "Tecnologia em Alimentos" },
  { value: "lq", label: "Licenciatura em Química" },
];

export const MODAL_GRADE_OPTIONS: SelectOption[] = [
  { value: "3º ano Médio", label: "3º ano Médio" },
  { value: "2º ano Médio", label: "2º ano Médio" },
  { value: "1º ano Médio", label: "1º ano Médio" },
  { value: "Ensino Médio Concluído", label: "Ensino Médio Concluído" },
];

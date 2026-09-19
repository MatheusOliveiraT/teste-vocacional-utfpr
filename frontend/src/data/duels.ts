import { DuelQuestion } from "@/types";

/**
 * Conjunto de exemplo dos 36 duelos (comparações pareadas) do teste vocacional.
 * Em produção, isso viria de uma API ou banco de questões.
 */
export const DUEL_QUESTIONS: DuelQuestion[] = [
  {
    index: 11,
    total: 36,
    question: "O que você prefere fazer?",
    subtitle:
      "Escolha a atividade que mais desperta seu interesse profissional ou curiosidade.",
    contextLabel:
      "Avaliação para Ciência da Computação, Engenharia Eletrônica e correlatos",
    options: [
      {
        key: "A",
        label: "Desenvolver modelos de Inteligência Artificial para empresas",
        icon: "psychology",
      },
      {
        key: "B",
        label: "Programar robôs e veículos para navegarem de forma autônoma",
        icon: "precision_manufacturing",
      },
    ],
  },
  {
    index: 12,
    total: 36,
    question: "Qual desafio te atrai mais?",
    subtitle:
      "Pense em qual rotina de trabalho combinaria melhor com o seu perfil.",
    contextLabel: "Avaliação para Engenharia Civil e Engenharia Ambiental",
    options: [
      {
        key: "A",
        label: "Planejar a estrutura de pontes e edifícios seguros",
        icon: "architecture",
      },
      {
        key: "B",
        label: "Criar soluções para tratamento de água e resíduos",
        icon: "water_drop",
      },
    ],
  },
  {
    index: 13,
    total: 36,
    question: "No laboratório, você prefere...",
    subtitle: "Considere o tipo de experimento que mais te motivaria.",
    contextLabel: "Avaliação para Engenharia Química e de Alimentos",
    options: [
      {
        key: "A",
        label: "Formular novos materiais e processos químicos industriais",
        icon: "science",
      },
      {
        key: "B",
        label: "Desenvolver novos produtos alimentícios mais nutritivos",
        icon: "nutrition",
      },
    ],
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  image?: string;
}

export const UTFPR_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Quantos anos o câmpus Campo Mourão da UTFPR completou em 2026?",
    options: ["31", "28", "20", "19", "17"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Qual curso de graduação tem na UTFPR-CM?",
    options: [
      "Engenharia Mecânica",
      "Engenharia Eletrônica",
      "Engenharia de Produção",
      "Engenharia Elétrica",
      "Engenharia de Software",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Licenciatura em Química é um curso que tem na UTFPR-CM?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 4,
    question:
      "Antes de ser Universidade Tecnológica Federal do Paraná, a instituição era conhecida como CEFET – Centro Federal de Educação Tecnológica?",
    options: ["Sim", "Não"],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: "Qual dos cursos de graduação abaixo NÃO tem na UTFPR-CM?",
    options: [
      "Engenharia Eletrônica",
      "Engenharia Civil",
      "Ciência da Computação",
      "Tecnologia em Alimentos",
      "Agronomia",
    ],
    correctAnswer: 4,
  },
  {
    id: 6,
    question: "A UTFPR é uma universidade que possui 13 campi no estado do Paraná?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 7,
    question:
      "A UTFPR não aceita a nota do ENEM como forma de seleção para estudar nela?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Ciência da Computação é um dos cursos de graduação da UTFPR-CM?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 9,
    question: "Qual dos cursos de graduação abaixo tem na UTFPR-CM?",
    options: [
      "Engenharia Química",
      "Licenciatura em Química",
      "Tecnologia em Alimentos",
      "Engenharia de Alimentos",
      "Engenharia Ambiental e Sanitária",
      "Todas as opções",
    ],
    correctAnswer: 5,
  },
  {
    id: 10,
    question:
      "Para estudar na UTFPR, você pode se inscrever no SiSU com sua nota do ENEM ou fazer o vestibular?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 11,
    question:
      "Na UTFPR-CM tem ensino médio gratuito, que é o curso Técnico em Informática para Internet?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 12,
    question: "Quantos cursos de graduação tem na UTFPR-CM?",
    options: ["10", "9", "8", "7", "6", "5"],
    correctAnswer: 0,
  },
  {
    id: 13,
    question: "O nome do curso que forma professores de Química na UTFPR-CM é:",
    options: [
      "Licenciatura em Física",
      "Tecnologia em Alimentos",
      "Licenciatura em Química",
      "Técnico Integrado em Informática",
      "Engenharia Química",
    ],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "O que significa a sigla UTFPR?",
    options: [
      "Universidade Tecnológica de Campo Mourão",
      "Universidade Federal do Paraná",
      "Universidade Federal Tecnológica do Paraná",
      "Universidade Tecnológica do Paraná",
      "Universidade Tecnológica Federal do Paraná",
    ],
    correctAnswer: 4,
    image: "/img/logo-utfpr.png",
  },
  {
    id: 15,
    question:
      "A UTFPR é uma universidade 100% gratuita. Não precisa pagar nada para estudar nela!",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 16,
    question:
      "Para aprender a construir prédios, pontes, usinas e rodovias, em qual curso eu posso estudar na UTFPR-CM?",
    options: [
      "Engenharia Têxtil",
      "Engenharia de Produção",
      "Engenharia Mecânica",
      "Engenharia Civil",
      "Engenharia Ambiental",
    ],
    correctAnswer: 3,
  },
  {
    id: 17,
    question:
      "Para aprender a projetar sistemas de abastecimento de água e tratamento de esgoto, em qual curso eu posso estudar na UTFPR-CM?",
    options: [
      "Engenharia Civil",
      "Engenharia Química",
      "Tecnologia em Alimentos",
      "Engenharia Eletrônica",
      "Engenharia Ambiental e Sanitária",
    ],
    correctAnswer: 4,
  },
  {
    id: 18,
    question:
      "Para trabalhar em indústrias que tratam o petróleo ou fabricam tintas, eu posso me formar no curso de Engenharia Química na UTFPR-CM?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 19,
    question:
      "Para eu ser um profissional que saiba tanto consertar um controle remoto quanto ajudar na criação de um carro elétrico/autônomo, qual curso posso fazer na UTFPR-CM?",
    options: [
      "Engenharia Civil",
      "Engenharia Química",
      "Engenharia Ambiental e Sanitária",
      "Ciência da Computação",
      "Engenharia Eletrônica",
    ],
    correctAnswer: 4,
  },
  {
    id: 20,
    question:
      "Quero muito trabalhar com inteligência artificial e desenvolvimento de aplicativos. O curso ideal pra mim na UTFPR-CM é Ciência da Computação?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 21,
    question:
      "Qual curso na UTFPR-CM ensina a desenvolver sistemas computacionais e aplicativos?",
    options: [
      "Engenharia de Produção",
      "Ciência da Computação",
      "Engenharia Ambiental e Sanitária",
      "Licenciatura em Química",
      "Engenharia Eletrônica",
    ],
    correctAnswer: 1,
  },
  {
    id: 22,
    question:
      "Em qual curso da UTFPR-CM você pode se formar para projetar sistemas elétricos e eletrônicos?",
    options: [
      "Engenharia Civil",
      "Engenharia Eletrônica",
      "Tecnologia em Alimentos",
      "Engenharia Mecânica",
      "Agronomia",
    ],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "A UTFPR-CM oferece o curso de Engenharia Ambiental e Sanitária?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 24,
    question:
      "Em qual curso da UTFPR-CM você pode aprender sobre a produção e controle de qualidade de alimentos?",
    options: [
      "Tecnologia em Alimentos",
      "Engenharia Mecânica",
      "Engenharia Eletrônica",
      "Engenharia Química",
      "Licenciatura em Química",
    ],
    correctAnswer: 0,
  },
  {
    id: 25,
    question:
      "Qual dos seguintes cursos na UTFPR-CM é mais focado em programação e desenvolvimento de software?",
    options: [
      "Engenharia de Produção",
      "Engenharia Civil",
      "Ciência da Computação",
      "Tecnologia em Alimentos",
      "Engenharia Mecânica",
    ],
    correctAnswer: 2,
  },
  {
    id: 26,
    question: "O câmpus de Campo Mourão da UTFPR oferece cursos na área de Engenharia?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 27,
    question: "A UTFPR foi a primeira universidade tecnológica do Brasil?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 28,
    question:
      "A UTFPR possui campi em diversas cidades do Paraná. Qual dessas cidades NÃO tem um câmpus da UTFPR?",
    options: [
      "Curitiba",
      "Campo Mourão",
      "Mamborê",
      "Cornélio Procópio",
      "Ponta Grossa",
    ],
    correctAnswer: 2,
  },
  {
    id: 29,
    question: "Além da graduação, a UTFPR também oferece:",
    options: [
      "Cursos técnicos integrados",
      "Cursos de pós-graduação",
      "Cursos de extensão e pesquisa",
      "Todas as alternativas estão corretas",
    ],
    correctAnswer: 3,
  },
  {
    id: 30,
    question:
      "A sigla UTFPR significa Universidade Tecnológica Federal do Paraná?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 31,
    question: "Quais cores são usadas no logotipo oficial da UTFPR?",
    options: [
      "Vermelho",
      "Amarelo e Preto",
      "Azul e Branco",
      "Verde e Amarelo",
    ],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "A UTFPR é uma universidade considerada:",
    options: ["Privada", "Estadual", "Federal"],
    correctAnswer: 2,
  },
  {
    id: 33,
    question:
      "É verdade que a UTFPR-CM vai inaugurar dois novos cursos tecnólogos na área de IA em 2027?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 34,
    question:
      "Quais são os novos cursos focados na área de Inteligência Artificial lançados pela UTFPR-CM?",
    options: [
      "Engenharia de Robótica e Computação Científica",
      "Tecnologia em Inteligência Artificial Generativa e Tecnologia em Sistemas Inteligentes",
      "Técnico em Redes e Programação para IA",
      "Licenciatura em Computação e Automação",
    ],
    correctAnswer: 1,
  },
  {
    id: 35,
    question:
      "O curso de Tecnologia em Inteligência Artificial Generativa da UTFPR-CM é voltado para a criação e aplicação de modelos de IA capazes de gerar texto, imagens e código?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 36,
    question:
      "A área de Inteligência Artificial na UTFPR-CM abrange tanto a graduação quanto projetos de pesquisa e inovação tecnológica?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 37,
    question:
      "Qual das alternativas descreve uma aplicação prática estudada nos cursos de IA da UTFPR-CM?",
    options: [
      "Manutenção mecânica de motores a diesel",
      "Desenvolvimento de modelos de aprendizado de máquina (Machine Learning) e visão computacional",
      "Análise química de solos agrícolas sem uso de tecnologia",
      "Construção civil tradicional sem automação",
    ],
    correctAnswer: 1,
  },
  {
    id: 38,
    question:
      "Além de Ciência da Computação, a UTFPR-CM agora conta com cursos superiores de tecnologia focados especificamente em Inteligência Artificial?",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: 0,
  },
  {
    id: 39,
    question:
      "Qual é o formato dos novos cursos de IA (Tecnólogos) lançados na UTFPR-CM?",
    options: [
      "Cursos de Licenciatura para dar aula no ensino fundamental",
      "Cursos Superiores de Tecnologia focados em prática e rápida inserção no mercado de trabalho",
      "Cursos de Pós-Graduação apenas para quem já é formado",
      "Cursos de Ensino Médio Tradicional",
    ],
    correctAnswer: 1,
  },
];
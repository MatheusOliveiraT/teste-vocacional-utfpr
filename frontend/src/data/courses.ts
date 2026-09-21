import { CourseCatalogItem, CourseFilterOption, AdmissionPathway } from "@/types";

export const COURSE_FILTERS: CourseFilterOption[] = [
  { category: "all", label: "Todos os Cursos", icon: "grid_view", count: 10 },
  {
    category: "computacao",
    label: "Computação e TI",
    icon: "terminal",
    count: 3,
  },
  {
    category: "engenharia",
    label: "Engenharias",
    icon: "precision_manufacturing",
    count: 4,
  },
  {
    category: "ciencias-agro",
    label: "Alimentos e Química",
    icon: "science",
    count: 3,
  },
];

export const COURSE_CATALOG: CourseCatalogItem[] = [
  {
    id: "cc",
    category: "computacao",
    title: "Ciência da Computação",
    degreeType: "Bacharelado",
    vagas: "88 vagas/ano",
    duration: "8 semestres (4 anos)",
    turno: "Integral",
    icon: "terminal",
    description:
      "Focado em desenvolvimento de software, algoritmos, estrutura de dados, inteligência artificial, segurança digital e jogos digitais.",
    focusTags: [
      "Inteligência Artificial",
      "Algoritmos & Dados",
      "Segurança Digital",
      "Jogos Digitais",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvbxH8XTVqk_QRTZYFIPyVbunsxyDUY_wr0_iJpNLAuAvRS3Cxq0OCC5AQSwHQ6VKCzGeCYaSVEwS-s9UQvvunzjA0CyIjclO5NozZ43qbl9nJJg4h3WmBLopeiLB3Yl918FMfk0xqupHR92J2oHZN1tYIgcOB765SKg5RGHY0iPhnHKjD0IWw6u-n0ubjwhdH_tRP5R6uiG6yPp_6-RarE_Z_HMB4JCgkPZJ-mhtMM0O7L3Y6iSEC",
    imageAlt: "Laboratório de Ciência da Computação da UTFPR",
    primaryAction: "matriz",
    matrixUrl:
      "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-ciencia-da-computacao",
  },
  {
    id: "ee",
    category: "engenharia",
    title: "Engenharia Eletrônica",
    degreeType: "Bacharelado",
    vagas: "88 vagas/ano",
    duration: "10 semestres (5 anos)",
    icon: "memory",
    description:
      "Focado no projeto de circuitos, hardware, microprocessadores, automação, placas eletrônicas e Internet das Coisas (IoT).",
    focusTags: [
      "Projeto de Circuitos",
      "Microprocessadores",
      "Internet das Coisas (IoT)",
      "Automação & Hardware",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7c1NDpbATAmdr3TVyYdLvgd5weoK5hwtUUUO6KsNMvX4K-NhbxJICBJirL6q8fdULQK3RkbbAe32iM0LcRrlhrAOW08ky1lQbT4iP68z1-hlzedvTrrOtcG24C6WWOrYX8Oucg8ncs2kRxHPg1qB8XUnDtEQFq_hT7xQ3a89MQq0iLjbCf8XJGND1vdATvRsLztVutii_DsxHr5QPXj8l05N3KNIkCerSm58fz16yu5qTJeMWpK1",
    imageAlt: "Laboratório de Engenharia Eletrônica da UTFPR",
    primaryAction: "matriz",
    matrixUrl:
      "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-eletronica",
  },
  {
    id: "tia",
    category: "computacao",
    title: "Tecnologia em Inteligência Artificial Aplicada",
    degreeType: "Tecnologia",
    vagas: "44 vagas/ano",
    duration: "5 semestres (2.5 anos)",
    icon: "psychology",
    description:
      "Focado na aplicação prática, técnica e ética de ferramentas de IA, modelos generativos, visão computacional e otimização de negócios.",
    focusTags: [
      "Modelos Generativos",
      "Visão Computacional",
      "Ética em IA",
      "Otimização de Negócios",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYZsCV07LBUCGR5lbAtee5SbkcmERkXBnce8AELTCQ7wT3JyXeHuXq9Qg_7I3jdB6BzzlFUd4wJ8fRGJ8yLkOmTmuQi_a3Ml5jyFdGh5TbRG51-nDd_twdvurbTMDEM520IkEY3zSip_XffBwQLTKh_U6edSV4cXwIcnHKPppHUYu9y_7yS3JRYOjGPF8kweYNZ5GWRLwuXUnkIXTZM32GQjT_Voprsln5s4uyPv_ItiwX8zfDZf83",
    imageAlt: "Estudantes trabalhando com inteligência artificial aplicada",
    primaryAction: "mercado",
  },
  {
    id: "tias",
    category: "computacao",
    title: "Tecnologia em Inteligência Artificial e Sistemas Autônomos",
    degreeType: "Tecnologia",
    vagas: "44 vagas/ano",
    duration: "6 semestres (3 anos)",
    icon: "smart_toy",
    description:
      "Focado no desenvolvimento de robôs inteligentes, drones, veículos autônomos e sistemas de tomada de decisão em tempo real.",
    focusTags: [
      "Robôs Inteligentes",
      "Drones & VANTs",
      "Veículos Autônomos",
      "Decisão em Tempo Real",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRQYooyUltLxVMPGBmfZa-u7heh6LoDq2SrSuOOWcVGz3AZgknG8A69jDhOdhN18gchO4aI6Bn0hqfPJzwA0x1HsUYfl1W1jSmJrAB_HIipEhfQklZbnqi5ls7HRpLCxob77ilFeEb8ML8wjdRlCO5ypj28rvrmpxuRJg0Qi07DcAw5Xg6V2xOGgnQWfn5d7yypdT0GLrdj3hz9zI5ukgP4GBotEoWUYfF3bEg8xWmoGwOnoXomvbi",
    imageAlt: "Robôs autônomos desenvolvidos em laboratório da UTFPR",
    primaryAction: "mercado",
  },
  {
    id: "ec",
    category: "engenharia",
    title: "Engenharia Civil",
    degreeType: "Bacharelado",
    vagas: "88 vagas/ano",
    duration: "10 semestres (5 anos)",
    turno: "Integral",
    icon: "apartment",
    description:
      "Focado em infraestrutura, edificações, pontes, barragens, estradas, geotecnia de solos e gerenciamento de obras de grande porte.",
    focusTags: [
      "Infraestrutura & Pontes",
      "Geotecnia & Solos",
      "Gestão de Grandes Obras",
      "Estruturas & Edificações",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1Py56rggyl4eaXW_68IcK6x-kfyVcyIoTGICzPQuzETpa4CWMrflEb706v5LobA1pRVwvWOuUaw-fV79jbOfidxFqOOKJ_aDq6hPWeEWahqk9-Eyk2XOUQ4OqfvhwZev7T_ggsk8BFrfJxQl0_pIs2Y6maI0bowtnxjfYbGc-du_qoNm_iijHphXWwrpBF06Vzf-_NE6u8JGYg17JRsFJcJ3_2EWy9p-cEYaL6M8XgjZ5GJ8E0oi",
    imageAlt: "Estudantes de Engenharia Civil da UTFPR analisando planta de obra",
    primaryAction: "matriz",
    matrixUrl:
      "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-civil",
  },
  {
    id: "ea",
    category: "engenharia",
    title: "Engenharia Ambiental e Sanitária",
    degreeType: "Bacharelado",
    vagas: "88 vagas/ano",
    duration: "10 semestres (5 anos)",
    turno: "Integral",
    icon: "eco",
    description:
      "Focado em recursos hídricos, meio ambiente, energias renováveis, saneamento, reciclagem e preservação ecológica.",
    focusTags: [
      "Recursos Hídricos",
      "Saneamento & Efluentes",
      "Energias Renováveis",
      "Preservação Ecológica",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqvc-_9NL1CdV7hTRfewGYqgm13OWdkdr2GGS_ROkh7ZR8TH5N8ZtevH3Q_92cg-F8aQYdDkfjzvRdGj6UGjYhhn8WSdsSzL0cjvmdfAtCQV6ouleY6s_xY-7MtIzNKH6vwU4p2dLTgZf6SxNKKgqgd6nfM413mU6Bnyu7zMY1FbBdEBGmpgE2zVh532aHW2zYVk1xoV0D_L6FAkpKEa2vTwaOD8_qNc8JRfELkFDLfrkZ9j-5qA5B",
    imageAlt: "Estudantes de Engenharia Ambiental analisando amostras de água",
    primaryAction: "matriz",
    matrixUrl:
      "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-ambiental",
  },
  {
    id: "eq",
    category: "engenharia",
    title: "Engenharia Química",
    degreeType: "Bacharelado",
    vagas: "44 vagas/ano",
    duration: "10 semestres (5 anos)",
    turno: "Integral",
    icon: "science",
    description:
      "Focado na transformação industrial de matéria-prima em larga escala, projeto de reatores, petroquímica e processos industriais.",
    focusTags: [
      "Projeto de Reatores",
      "Petroquímica",
      "Processos Industriais",
      "Termodinâmica Química",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP33LgDtabgq-uHdT9S-Ltfz09rS8VASVfPjMl02kiWnr18NdsQFMxFQjWWhpKOxySSgic3poeqRzFcFnEu-qusJlV3VXb_l4rpwe_sbxNFhxmMeJ-NoxpmM5mDcQcVWqrv5ssQDaySwEECGKeqdk89fL0aSZ9eJENnGeBdx1DO6dQ9ZtyT3E40O8vrPZFYt-SLz4ag6LzXqR6kxL4r58F1oziXNuJmz1t-TqUGcGHpORyg_mVWi0C",
    imageAlt: "Laboratório de Engenharia Química da UTFPR",
    primaryAction: "matriz",
    matrixUrl:
      "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-quimica",
  },
  {
    id: "lq",
    category: "ciencias-agro",
    title: "Licenciatura em Química",
    degreeType: "Licenciatura",
    vagas: "44 vagas/ano",
    duration: "8 semestres (4 anos)",
    icon: "history_edu",
    description:
      "Focado no ensino e pesquisa em reações químicas, análise laboratorial, materiais industriais e processos químicos.",
    focusTags: [
      "Ensino & Docência",
      "Análise Laboratorial",
      "Materiais Industriais",
      "Reações Químicas",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-QwHR9mmMfT4yb5FTv2Z0KEuGpofw2TBoXrYfFG6smNdArijyMBRKiLNgwvoJSmwlx6beDgHqdBhMKJJp1HoiebDTt9Q0KVdwbu82naTvk4XFWeaX1arUb3QyLsddCiJItoP4TORLfjCNlvzkZ_XO1XRTXpfqdmDt3xumShrnHwvrA5RFxMXTPEC_-StatYFL4zGhqFw7zft3w1WZY5EjGn5i_fedbho5htSrnvlpdoDh2XjEQ8p3",
    imageAlt: "Sala de aula de Licenciatura em Química da UTFPR",
    primaryAction: "matriz",
    matrixUrl:
      "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-licenciatura-em-quimica",
  },
  {
    id: "eal",
    category: "engenharia",
    title: "Engenharia de Alimentos",
    degreeType: "Bacharelado",
    vagas: "44 vagas/ano",
    duration: "10 semestres (5 anos)",
    turno: "Integral",
    icon: "restaurant",
    description:
      "Focado no projeto e dimensionamento de indústrias alimentícias, processos de conservação em larga escala e bioprocessos.",
    focusTags: [
      "Dimensionamento Industrial",
      "Conservação em Escala",
      "Bioprocessos Alimentares",
      "Controle e Operações",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP33LgDtabgq-uHdT9S-Ltfz09rS8VASVfPjMl02kiWnr18NdsQFMxFQjWWhpKOxySSgic3poeqRzFcFnEu-qusJlV3VXb_l4rpwe_sbxNFhxmMeJ-NoxpmM5mDcQcVWqrv5ssQDaySwEECGKeqdk89fL0aSZ9eJENnGeBdx1DO6dQ9ZtyT3E40O8vrPZFYt-SLz4ag6LzXqR6kxL4r58F1oziXNuJmz1t-TqUGcGHpORyg_mVWi0C",
    imageAlt: "Laboratório de Engenharia de Alimentos da UTFPR",
    primaryAction: "matriz",
    matrixUrl:
      "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-de-alimentos",
  },
  {
    id: "ta",
    category: "ciencias-agro",
    title: "Tecnologia em Alimentos",
    degreeType: "Tecnologia",
    vagas: "44 vagas/ano",
    duration: "6 semestres (3 anos)",
    icon: "nutrition",
    description:
      "Focado no controle de qualidade diário, microbiologia prática, formulação de novos sabores, rotulagem e normas sanitárias.",
    focusTags: [
      "Controle de Qualidade",
      "Microbiologia Prática",
      "Formulação & Sabores",
      "Rotulagem & Sanitárias",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP33LgDtabgq-uHdT9S-Ltfz09rS8VASVfPjMl02kiWnr18NdsQFMxFQjWWhpKOxySSgic3poeqRzFcFnEu-qusJlV3VXb_l4rpwe_sbxNFhxmMeJ-NoxpmM5mDcQcVWqrv5ssQDaySwEECGKeqdk89fL0aSZ9eJENnGeBdx1DO6dQ9ZtyT3E40O8vrPZFYt-SLz4ag6LzXqR6kxL4r58F1oziXNuJmz1t-TqUGcGHpORyg_mVWi0C",
    imageAlt: "Estudante analisando amostras de alimentos em laboratório",
    primaryAction: "mercado",
  },
];

export const ADMISSION_PATHWAYS: AdmissionPathway[] = [
  {
    icon: "assignment",
    title: "1. Vestibular Próprio",
    description:
      "A UTFPR realiza vestibulares presenciais no meio e no fim de cada ano civil. Provas objetivas e redação com inscrição direta pelo portal da universidade.",
    tag: "Provas Semestrais",
  },
  {
    icon: "school",
    title: "2. SiSU / ENEM",
    description:
      "Utilize a sua nota do Exame Nacional do Ensino Médio para concorrer a centenas de vagas com isenção total de taxas pelo Sistema de Seleção Unificada do MEC.",
    tag: "100% Gratuito",
  },
  {
    icon: "swap_horiz",
    title: "3. Transferência & Obtenção",
    description:
      "Editais periódicos para transferência voluntária de outras IES públicas ou privadas, além de vagas destinadas a quem já possui diploma superior.",
    tag: "Edital Complementar",
  },
];

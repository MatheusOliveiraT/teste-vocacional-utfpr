import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Algoritmo Fisher-Yates para embaralhar o array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function main() {
  console.log('🔄 Limpando banco de dados...');
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.testResult.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.school.deleteMany();
  await prisma.schoolLevel.deleteMany();

  console.log('🏫 Cadastrando Escolas de Campo Mourão...');
  const escolas = [
    "Colégio Estadual Prefeito Antônio Teodoro Oliveira",
    "Colégio Estadual Dom Bosco",
    "Colégio Estadual de Campo Mourão",
    "Centro Estadual de Educação Básica de Jovens e Adultos de Campo Mourão",
    "Centro Estadual de Educação Profissional Agrícola de Campo Mourão",
    "Colégio Estadual Cívico Militar Professor Darcy José Costa",
    "Colégio Estadual Professora Ivone Soares Castanharo",
    "Colégio Estadual do Campo Professor Jaelson Biacio",
    "Colégio Estadual Novo Horizonte",
    "Colégio Estadual Cívico Militar Doutor Osvaldo Cruz",
    "Colégio Estadual Cívico Militar Marechal Rondon",
    "Colégio Estadual Cívico Militar Unidade Polo",
    "Colégio Estadual Vinícius de Moraes",
    "Colégio Agrícola Estadual de Campo Mourão",
    "Colégio Sesi",
    "Rede de Ensino Alfa",
    "Colégio Integrado",
    "Colégio Sigma",
    "Colégio Conexão",
    "Centro Universitário Integrado",
    "Colégio Vicentino Santa Cruz",
    "UTFPR - Campo Mourão",
    "Outra Escola / Não Listada"
  ];

  for (const escola of escolas) {
    await prisma.school.create({ data: { name: escola } });
  }

  console.log('📚 Cadastrando Escolaridades...');
  const escolaridades = [
    { year: '6º ano', description: 'Ensino Fundamental' },
    { year: '7º ano', description: 'Ensino Fundamental' },
    { year: '8º ano', description: 'Ensino Fundamental' },
    { year: '9º ano', description: 'Ensino Fundamental' },
    { year: '1º ano', description: 'Ensino Médio' },
    { year: '2º ano', description: 'Ensino Médio' },
    { year: '3º ano', description: 'Ensino Médio' },
    { year: '4º ano', description: 'Ensino Médio' },
    { year: 'Concluído', description: '3º/4º ano Concluído' }
  ];

  for (const esc of escolaridades) {
    await prisma.schoolLevel.create({
      data: { year: esc.year, description: esc.description }
    });
  }

  console.log('🌱 Criando os 10 Cursos da UTFPR-CM com detalhes acadêmicos...');

  const cc = await prisma.profile.create({
    data: {
      name: 'Ciência da Computação',
      description: 'Focado em desenvolvimento de software, algoritmos, estrutura de dados, inteligência artificial, segurança digital e jogos digitais.',
      degreeType: 'Bacharelado',
      durationYears: 4,
      semesters: 8,
      shift: 'Integral',
      annualVacancies: 88,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-ciencia-da-computacao',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-ciencia-da-computacao/comp-cm.png/@@images/image'
    },
  });

  const engEletronica = await prisma.profile.create({
    data: {
      name: 'Engenharia Eletrônica',
      description: 'Focado no projeto de circuitos, hardware, microprocessadores, automação, placas eletrônicas e Internet das Coisas (IoT).',
      degreeType: 'Bacharelado',
      durationYears: 5,
      semesters: 10,
      shift: 'Noturno',
      annualVacancies: 88,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-eletronica',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-eletronica/capa-4.png/@@images/image',
    },
  });

  const iaAplicada = await prisma.profile.create({
    data: {
      name: 'Tecnologia em Inteligência Artificial Aplicada',
      description: 'Focado na aplicação prática, técnica e ética de ferramentas de IA, modelos generativos, visão computacional e otimização de negócios.',
      degreeType: 'Tecnologia',
      durationYears: 2.5,
      semesters: 5,
      shift: 'Noturno',
      annualVacancies: 44,
      curriculumUrl: '',
      imageUrl: 'https://www.utfpr.edu.br/noticias/curitiba/utfpr-oferta-curso-de-especializacao-em-inteligencia-artificial-e-machine-learning/@@images/image-664-459cbb3b6788a8e8f10345436cc51e0e.png',
    },
  });

  const iaSistemasAutonomos = await prisma.profile.create({
    data: {
      name: 'Tecnologia em Inteligência Artificial e Sistemas Autônomos',
      description: 'Focado no desenvolvimento de robôs inteligentes, drones, veículos autônomos e sistemas de tomada de decisão em tempo real.',
      degreeType: 'Tecnologia',
      durationYears: 3,
      semesters: 6,
      shift: 'Noturno',
      annualVacancies: 44,
      curriculumUrl: '',
      imageUrl: 'https://www.utfpr.edu.br/noticias/curitiba/utfpr-oferta-curso-de-especializacao-em-inteligencia-artificial-e-machine-learning/@@images/image-664-459cbb3b6788a8e8f10345436cc51e0e.png',
    },
  });

  const engCivil = await prisma.profile.create({
    data: {
      name: 'Engenharia Civil',
      description: 'Focado em infraestrutura, edificações, pontes, barragens, estradas, geotecnia de solos e gerenciamento de obras de grande porte.',
      degreeType: 'Bacharelado',
      durationYears: 5,
      semesters: 10,
      shift: 'Integral',
      annualVacancies: 88,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-civil',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-civil/eng-civil-cm.png/@@images/image',
    },
  });

  const engAmbiental = await prisma.profile.create({
    data: {
      name: 'Engenharia Ambiental e Sanitária',
      description: 'Focado em recursos hídricos, meio ambiente, energias renováveis, saneamento, reciclagem e preservação ecológica.',
      degreeType: 'Bacharelado',
      durationYears: 5,
      semesters: 10,
      shift: 'Integral',
      annualVacancies: 88,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-ambiental',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-ambiental/eng-amb-cm.png/@@images/image',
    },
  });

  const engQuimica = await prisma.profile.create({
    data: {
      name: 'Engenharia Química',
      description: 'Focado na transformação industrial de matéria-prima em larga escala, projeto de reatores, petroquímica e processos industriais.',
      degreeType: 'Bacharelado',
      durationYears: 5,
      semesters: 10,
      shift: 'Integral',
      annualVacancies: 44,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-quimica',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-quimica/eng-quim-cm.png/@@images/image',
    },
  });

  const licencQuimica = await prisma.profile.create({
    data: {
      name: 'Licenciatura em Química',
      description: 'Focado no ensino e pesquisa em reações químicas, análise laboratorial, materiais industriais e processos químicos.',
      degreeType: 'Licenciatura',
      durationYears: 4,
      semesters: 8,
      shift: 'Noturno',
      annualVacancies: 44,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-licenciatura-em-quimica',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-quimica/eng-quim-cm.png/@@images/image',
    },
  });

  const engAlimentos = await prisma.profile.create({
    data: {
      name: 'Engenharia de Alimentos',
      description: 'Focado no projeto e dimensionamento de indústrias alimentícias, processos de conservação em larga escala e bioprocessos.',
      degreeType: 'Bacharelado',
      durationYears: 5,
      semesters: 10,
      shift: 'Integral',
      annualVacancies: 44,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-de-alimentos',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-engenharia-de-alimentos/eng-alimentos-cm.png/@@images/image',
    },
  });

  const tecAlimentos = await prisma.profile.create({
    data: {
      name: 'Tecnologia em Alimentos',
      description: 'Focado no controle de qualidade diário, microbiologia prática, formulação de novos sabores, rotulagem e normas sanitárias.',
      degreeType: 'Tecnologia',
      durationYears: 3,
      semesters: 6,
      shift: 'Noturno',
      annualVacancies: 44,
      curriculumUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-tecnologia-em-alimentos',
      imageUrl: 'https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/campo-mourao/cm-tecnologia-em-alimentos/daaeq-banner-renata-fuchs_page-0001.jpg/@@images/image',
    },
  });

  console.log('❓ Coletando todas as 60 opções originais e gerando 30 duelos aleatórios...');

  // Lista com as 60 alternativas originais completas
  const allOptions = [
    // Ciência da Computação
    { text: 'Estudar sobre inteligência artificial', profileId: cc.id },
    { text: 'Desenvolver videogames', profileId: cc.id },
    { text: 'Desenvolver um site e aplicativos', profileId: cc.id },
    { text: 'Entender sobre segurança digital', profileId: cc.id },
    { text: 'Desenvolver software para empresas', profileId: cc.id },
    { text: 'Estudar sobre algoritmos', profileId: cc.id },

    // Engenharia Eletrônica
    { text: 'Saber como um celular funciona', profileId: engEletronica.id },
    { text: 'Estudar sobre circuitos eletrônicos', profileId: engEletronica.id },
    { text: 'Entender sobre Internet das Coisas', profileId: engEletronica.id },
    { text: 'Entender como é feito uma placa eletrônica', profileId: engEletronica.id },
    { text: 'Saber como projetar um processador', profileId: engEletronica.id },
    { text: 'Saber prototipagem eletrônica', profileId: engEletronica.id },

    // Engenharia Civil
    { text: 'Saber selecionar e testar materiais de construção', profileId: engCivil.id },
    { text: 'Planejar a planta de uma casa', profileId: engCivil.id },
    // { text: 'Construir barragens', profileId: engCivil.id },
    { text: 'Planejar o sistema de esgoto de uma cidade', profileId: engCivil.id },
    // { text: 'Planejar a construção de uma ponte', profileId: engCivil.id },
    { text: 'Restaurar um edifício histórico', profileId: engCivil.id },
    { text: 'Estudar o comportamento do solo e das rochas do local de uma construção', profileId: engCivil.id },
    // { text: 'Trabalhar em obras de urbanização', profileId: engCivil.id },
    { text: 'Planejar a construção de apartamentos', profileId: engCivil.id },
    // { text: 'Construir estradas e rodovias', profileId: engCivil.id },
    // { text: 'Construir uma escola', profileId: engCivil.id },
    // { text: 'Entender sobre infraestrutura', profileId: engCivil.id },

    // Engenharia Ambiental e Sanitária
    { text: 'Estudar sobre meio ambiente', profileId: engAmbiental.id },
    // { text: 'Estudar sobre energias renováveis', profileId: engAmbiental.id },
    { text: 'Desenvolver soluções de reciclagem', profileId: engAmbiental.id },
    // { text: 'Desenvolver soluções para o tratamento de água', profileId: engAmbiental.id },
    // { text: 'Monitorar a qualidade do ar, água e solo', profileId: engAmbiental.id },
    { text: 'Planejar o tratamento de um rio', profileId: engAmbiental.id },
    { text: 'Planejar o desenvolvimento sustentável de uma região', profileId: engAmbiental.id },
    // { text: 'Trabalhar em projetos de preservação ambiental', profileId: engAmbiental.id },
    // { text: 'Monitorar mudanças climáticas', profileId: engAmbiental.id },
    { text: 'Planejar projetos de reflorestamento', profileId: engAmbiental.id },
    // { text: 'Fazer estudos sobre impacto ambiental', profileId: engAmbiental.id },
    { text: 'Estudar sobre como diminuir a poluição do ar', profileId: engAmbiental.id },

    // Química (Licenciatura & Engenharia)
    { text: 'Desenvolver produtos de limpeza', profileId: licencQuimica.id },
    { text: 'Trabalhar em indústrias químicas de grande porte', profileId: engQuimica.id },
    { text: 'Desenvolver produtos para a indústria farmacêutica', profileId: licencQuimica.id },
    { text: 'Estudar química orgânica avançada', profileId: licencQuimica.id },
    { text: 'Trabalhar em laboratórios de química', profileId: licencQuimica.id },
    { text: 'Saber como acontecem as reações químicas', profileId: licencQuimica.id },
    { text: 'Desenvolver práticas para garantir a segurança em processos químicos industriais', profileId: engQuimica.id },
    { text: 'Trabalhar em grandes empresas de petróleo e refino', profileId: engQuimica.id },
    { text: 'Saber como retirar a matéria-prima do meio ambiente e evitar danos ambientais', profileId: engQuimica.id },
    { text: 'Estudar sobre energia nuclear', profileId: engQuimica.id },
    { text: 'Ensinar sobre química', profileId: licencQuimica.id },
    { text: 'Desenvolver equipamentos e reatores para usos em processos industriais químicos', profileId: engQuimica.id },

    // Alimentos (Engenharia & Tecnologia)
    { text: 'Criar novos produtos alimentícios', profileId: engAlimentos.id },
    { text: 'Desenvolver um novo sabor para um alimento industrializado', profileId: tecAlimentos.id },
    { text: 'Coordenar a produção em fábricas de alimentos', profileId: engAlimentos.id },
    { text: 'Criar embalagens para alimentos', profileId: tecAlimentos.id },
    { text: 'Analisar a qualidade do alimento', profileId: tecAlimentos.id },
    { text: 'Desenvolver embalagens que não poluam o meio ambiente', profileId: engAlimentos.id },
    { text: 'Estudar produtos alimentícios existentes para melhorá-los', profileId: engAlimentos.id },
    { text: 'Conhecer quais bactérias causam intoxicação alimentar', profileId: tecAlimentos.id },
    { text: 'Saber como é o processo de fermentação', profileId: tecAlimentos.id },
    { text: 'Estudar como deixar um alimento industrializado mais saudável em sua composição', profileId: tecAlimentos.id },
    { text: 'Saber como uma indústria produz um alimento de forma segura e higiênica', profileId: engAlimentos.id },
    { text: 'Projetar equipamentos para uma indústria de alimentos', profileId: engAlimentos.id },

    // IA (Aplicada & Sistemas Autônomos)
    { text: 'Utilizar modelos de IA para automatizar tarefas em empresas', profileId: iaAplicada.id },
    { text: 'Programar robôs e veículos para navegarem de forma autônoma', profileId: iaSistemasAutonomos.id },
    { text: 'Treinar sistemas inteligentes para analisar textos, imagens e dados do mercado', profileId: iaAplicada.id },
    { text: 'Desenvolver softwares de tomada de decisão em tempo real para drones e equipamentos', profileId: iaSistemasAutonomos.id },
    { text: 'Criar aplicativos que usam IA para personalizar o atendimento a clientes', profileId: iaAplicada.id },
    { text: 'Criar sistemas embarcados que aprendem com sensores fisicamente conectados', profileId: iaSistemasAutonomos.id },
    { text: 'Garantir o uso ético, seguro e eficiente da Inteligência Artificial em softwares', profileId: iaAplicada.id },
    { text: 'Desenvolver algoritmos de aprendizado de máquina para automação industrial pesada', profileId: iaSistemasAutonomos.id },
    { text: 'Integrar APIs de Inteligência Artificial generativa a produtos digitais', profileId: iaAplicada.id },
    { text: 'Programar braços robóticos e máquinas industriais autônomas', profileId: iaSistemasAutonomos.id },
    { text: 'Analisar e otimizar processos de negócios utilizando algoritmos preditivos', profileId: iaAplicada.id },
    { text: 'Projetar sistemas de visão computacional para orientação de veículos sem motorista', profileId: iaSistemasAutonomos.id },
  ];

  // 1. Embaralha individualmente o pool de 60 opções
  const shuffledOptions = shuffle(allOptions);

  // 2. Agrupa as 60 opções de duas em duas, criando 30 duelos inéditos com opções cruzadas
  const totalQuestions = shuffledOptions.length / 2;

  for (let i = 0; i < totalQuestions; i++) {
    const optA = shuffledOptions[i * 2];
    const optB = shuffledOptions[i * 2 + 1];

    await prisma.question.create({
      data: {
        order: i + 1,
        options: {
          create: [
            { text: optA.text, profileId: optA.profileId, weight: 1 },
            { text: optB.text, profileId: optB.profileId, weight: 1 },
          ],
        },
      },
    });
  }

  console.log(`✅ Seed concluído! Todas as 60 alternativas foram reordenadas em ${totalQuestions} duelos cruzados aleatórios.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    { year: 'Concluído', description: '3º ano Concluído' }
  ];

  for (const esc of escolaridades) {
    await prisma.schoolLevel.create({
      data: { year: esc.year, description: esc.description }
    });
  }

  console.log('🌱 Criando os 10 Cursos da UTFPR-CM...');

  const cc = await prisma.profile.create({
    data: {
      name: 'Ciência da Computação',
      description: 'Focado em desenvolvimento de software, algoritmos, estrutura de dados, inteligência artificial, segurança digital e jogos digitais.',
    },
  });

  const engEletronica = await prisma.profile.create({
    data: {
      name: 'Engenharia Eletrônica',
      description: 'Focado no projeto de circuitos, hardware, microprocessadores, automação, placas eletrônicas e Internet das Coisas (IoT).',
    },
  });

  const iaAplicada = await prisma.profile.create({
    data: {
      name: 'Tecnologia em Inteligência Artificial Aplicada',
      description: 'Focado na aplicação prática, técnica e ética de ferramentas de IA, modelos generativos, visão computacional e otimização de negócios.',
    },
  });

  const iaSistemasAutonomos = await prisma.profile.create({
    data: {
      name: 'Tecnologia em Inteligência Artificial e Sistemas Autônomos',
      description: 'Focado no desenvolvimento de robôs inteligentes, drones, veículos autônomos e sistemas de tomada de decisão em tempo real.',
    },
  });

  const engCivil = await prisma.profile.create({
    data: {
      name: 'Engenharia Civil',
      description: 'Focado em infraestrutura, edificações, pontes, barragens, estradas, geotecnia de solos e gerenciamento de obras de grande porte.',
    },
  });

  const engAmbiental = await prisma.profile.create({
    data: {
      name: 'Engenharia Ambiental e Sanitária',
      description: 'Focado em recursos hídricos, meio ambiente, energias renováveis, saneamento, reciclagem e preservação ecológica.',
    },
  });

  const engQuimica = await prisma.profile.create({
    data: {
      name: 'Engenharia Química',
      description: 'Focado na transformação industrial de matéria-prima em larga escala, projeto de reatores, petroquímica e processos industriais.',
    },
  });

  const licencQuimica = await prisma.profile.create({
    data: {
      name: 'Licenciatura em Química',
      description: 'Focado no ensino e pesquisa em reações químicas, análise laboratorial, materiais industriais e processos químicos.',
    },
  });

  const engAlimentos = await prisma.profile.create({
    data: {
      name: 'Engenharia de Alimentos',
      description: 'Focado no projeto e dimensionamento de indústrias alimentícias, processos de conservação em larga escala e bioprocessos.',
    },
  });

  const tecAlimentos = await prisma.profile.create({
    data: {
      name: 'Tecnologia em Alimentos',
      description: 'Focado no controle de qualidade diário, microbiologia prática, formulação de novos sabores, rotulagem e normas sanitárias.',
    },
  });

  console.log('❓ Criando TODAS as 36 Perguntas/Duelos do Teste Vocacional...');

  const rawQuestions = [
    // --- GRUPO A: Ciência da Computação x Engenharia Eletrônica (6 Duelos) ---
    {
      optionA: { text: 'Estudar sobre inteligência artificial', profileId: cc.id },
      optionB: { text: 'Saber como um celular funciona', profileId: engEletronica.id },
    },
    {
      optionA: { text: 'Desenvolver videogames', profileId: cc.id },
      optionB: { text: 'Estudar sobre circuitos eletrônicos', profileId: engEletronica.id },
    },
    {
      optionA: { text: 'Desenvolver um site e aplicativos', profileId: cc.id },
      optionB: { text: 'Entender sobre Internet das Coisas', profileId: engEletronica.id },
    },
    {
      optionA: { text: 'Entender sobre segurança digital', profileId: cc.id },
      optionB: { text: 'Entender como é feito uma placa eletrônica', profileId: engEletronica.id },
    },
    {
      optionA: { text: 'Desenvolver software para empresas', profileId: cc.id },
      optionB: { text: 'Saber como projetar um processador', profileId: engEletronica.id },
    },
    {
      optionA: { text: 'Estudar sobre algoritmos', profileId: cc.id },
      optionB: { text: 'Saber prototipagem eletrônica', profileId: engEletronica.id },
    },

    // --- GRUPO B: Engenharia Civil (6 Duelos) ---
    {
      optionA: { text: 'Saber selecionar e testar materiais de construção', profileId: engCivil.id },
      optionB: { text: 'Planejar a planta de uma casa', profileId: engCivil.id },
    },
    {
      optionA: { text: 'Construir barragens', profileId: engCivil.id },
      optionB: { text: 'Planejar o sistema de esgoto de uma cidade', profileId: engCivil.id },
    },
    {
      optionA: { text: 'Planejar a construção de uma ponte', profileId: engCivil.id },
      optionB: { text: 'Restaurar um edifício histórico', profileId: engCivil.id },
    },
    {
      optionA: { text: 'Estudar o comportamento do solo e das rochas do local de uma construção', profileId: engCivil.id },
      optionB: { text: 'Trabalhar em obras de urbanização', profileId: engCivil.id },
    },
    {
      optionA: { text: 'Planejar a construção de apartamentos', profileId: engCivil.id },
      optionB: { text: 'Construir estradas e rodovias', profileId: engCivil.id },
    },
    {
      optionA: { text: 'Construir uma escola', profileId: engCivil.id },
      optionB: { text: 'Entender sobre infraestrutura', profileId: engCivil.id },
    },

    // --- GRUPO C: Engenharia Ambiental e Sanitária (6 Duelos) ---
    {
      optionA: { text: 'Estudar sobre meio ambiente', profileId: engAmbiental.id },
      optionB: { text: 'Estudar sobre energias renováveis', profileId: engAmbiental.id },
    },
    {
      optionA: { text: 'Desenvolver soluções de reciclagem', profileId: engAmbiental.id },
      optionB: { text: 'Desenvolver soluções para o tratamento de água', profileId: engAmbiental.id },
    },
    {
      optionA: { text: 'Monitorar a qualidade do ar, água e solo', profileId: engAmbiental.id },
      optionB: { text: 'Planejar o tratamento de um rio', profileId: engAmbiental.id },
    },
    {
      optionA: { text: 'Planejar o desenvolvimento sustentável de uma região', profileId: engAmbiental.id },
      optionB: { text: 'Trabalhar em projetos de preservação ambiental', profileId: engAmbiental.id },
    },
    {
      optionA: { text: 'Monitorar mudanças climáticas', profileId: engAmbiental.id },
      optionB: { text: 'Planejar projetos de reflorestamento', profileId: engAmbiental.id },
    },
    {
      optionA: { text: 'Fazer estudos sobre impacto ambiental', profileId: engAmbiental.id },
      optionB: { text: 'Estudar sobre como diminuir a poluição do ar', profileId: engAmbiental.id },
    },

    // --- GRUPO D: Engenharia Química x Licenciatura em Química (6 Duelos) ---
    {
      optionA: { text: 'Desenvolver produtos de limpeza', profileId: licencQuimica.id },
      optionB: { text: 'Trabalhar em indústrias químicas de grande porte', profileId: engQuimica.id },
    },
    {
      optionA: { text: 'Desenvolver produtos para a indústria farmacêutica', profileId: licencQuimica.id },
      optionB: { text: 'Estudar química orgânica avançada', profileId: licencQuimica.id },
    },
    {
      optionA: { text: 'Trabalhar em laboratórios de química', profileId: licencQuimica.id },
      optionB: { text: 'Saber como acontecem as reações químicas', profileId: licencQuimica.id },
    },
    {
      optionA: { text: 'Desenvolver práticas para garantir a segurança em processos químicos industriais', profileId: engQuimica.id },
      optionB: { text: 'Trabalhar em grandes empresas de petróleo e refino', profileId: engQuimica.id },
    },
    {
      optionA: { text: 'Saber como retirar a matéria-prima do meio ambiente e evitar danos ambientais', profileId: engQuimica.id },
      optionB: { text: 'Estudar sobre energia nuclear', profileId: engQuimica.id },
    },
    {
      optionA: { text: 'Ensinar sobre química', profileId: licencQuimica.id },
      optionB: { text: 'Desenvolver equipamentos e reatores para usos em processos industriais químicos', profileId: engQuimica.id },
    },

    // --- GRUPO E: Engenharia de Alimentos x Tecnologia em Alimentos (6 Duelos) ---
    {
      optionA: { text: 'Criar novos produtos alimentícios', profileId: engAlimentos.id },
      optionB: { text: 'Desenvolver um novo sabor para um alimento industrializado', profileId: tecAlimentos.id },
    },
    {
      optionA: { text: 'Coordenar a produção em fábricas de alimentos', profileId: engAlimentos.id },
      optionB: { text: 'Criar embalagens para alimentos', profileId: tecAlimentos.id },
    },
    {
      optionA: { text: 'Analisar a qualidade do alimento', profileId: tecAlimentos.id },
      optionB: { text: 'Desenvolver embalagens que não poluam o meio ambiente', profileId: tecAlimentos.id },
    },
    {
      optionA: { text: 'Estudar produtos alimentícios existentes para melhorá-los', profileId: engAlimentos.id },
      optionB: { text: 'Conhecer quais bactérias causam intoxicação alimentar', profileId: tecAlimentos.id },
    },
    {
      optionA: { text: 'Saber como é o processo de fermentação', profileId: tecAlimentos.id },
      optionB: { text: 'Estudar como deixar um alimento industrializado mais saudável em sua composição', profileId: tecAlimentos.id },
    },
    {
      optionA: { text: 'Saber como uma indústria produz um alimento de forma segura e higiênica', profileId: tecAlimentos.id },
      optionB: { text: 'Projetar equipamentos para uma indústria de alimentos', profileId: engAlimentos.id },
    },

    // --- GRUPO F: Tecnologia em IA Aplicada x Tecnologia em IA e Sistemas Autônomos (6 Duelos) ---
    {
      optionA: { text: 'Utilizar modelos de IA para automatizar tarefas em empresas', profileId: iaAplicada.id },
      optionB: { text: 'Programar robôs e veículos para navegarem de forma autônoma', profileId: iaSistemasAutonomos.id },
    },
    {
      optionA: { text: 'Treinar sistemas inteligentes para analisar textos, imagens e dados do mercado', profileId: iaAplicada.id },
      optionB: { text: 'Desenvolver softwares de tomada de decisão em tempo real para drones e equipamentos', profileId: iaSistemasAutonomos.id },
    },
    {
      optionA: { text: 'Criar aplicativos que usam IA para personalizar o atendimento a clientes', profileId: iaAplicada.id },
      optionB: { text: 'Criar sistemas embarcados que aprendem com sensores fisicamente conectados', profileId: iaSistemasAutonomos.id },
    },
    {
      optionA: { text: 'Garantir o uso ético, seguro e eficiente da Inteligência Artificial em softwares', profileId: iaAplicada.id },
      optionB: { text: 'Desenvolver algoritmos de aprendizado de máquina para automação industrial pesada', profileId: iaSistemasAutonomos.id },
    },
    {
      optionA: { text: 'Integrar APIs de Inteligência Artificial generativa a produtos digitais', profileId: iaAplicada.id },
      optionB: { text: 'Programar braços robóticos e máquinas industriais autônomas', profileId: iaSistemasAutonomos.id },
    },
    {
      optionA: { text: 'Analisar e otimizar processos de negócios utilizando algoritmos preditivos', profileId: iaAplicada.id },
      optionB: { text: 'Projetar sistemas de visão computacional para orientação de veículos sem motorista', profileId: iaSistemasAutonomos.id },
    },
  ];

  for (let i = 0; i < rawQuestions.length; i++) {
    const q = rawQuestions[i];
    await prisma.question.create({
      data: {
        order: i + 1,
        options: {
          create: [
            { text: q.optionA.text, profileId: q.optionA.profileId, weight: 1 },
            { text: q.optionB.text, profileId: q.optionB.profileId, weight: 1 },
          ],
        },
      },
    });
  }

  console.log(`✅ Seed concluído! ${rawQuestions.length} duelos cadastrados cobrindo os 10 cursos da UTFPR-CM.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
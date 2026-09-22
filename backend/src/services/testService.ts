import prisma from '../config/prisma';
import { SubmitTestDTO, ScoreItem, AdminUpsertResultDTO } from '../types/test';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export class TestService {
  // Retorna a lista de escolas de Campo Mourão e escolaridades para o formulário
  async getOptionsData() {
    const schools = await prisma.school.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    });

    const schoolLevels = await prisma.schoolLevel.findMany({
      select: { id: true, year: true, description: true },
    });

    const profiles = await prisma.profile.findMany({
      select: { id: true, name: true },
    });

    return { schools, schoolLevels, profiles };
  }

  // Retorna os duelos com a ordem e as opções Lado A / Lado B aleatorizadas
  async getQuestions() {
    const questions = await prisma.question.findMany({
      select: {
        id: true,
        order: true,
        options: {
          select: {
            id: true,
            text: true, // Omite profileId e weight para não revelar spoiler no frontend
          },
        },
      },
    });

    const questionsWithShuffledOptions = questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));

    return shuffleArray(questionsWithShuffledOptions);
  }

  // Calcula e salva o resultado do teste
  async calculateAndSaveResult(data: SubmitTestDTO) {
    const { fullName, schoolLevel, schoolName, selectedOptionIds } = data;

    // Buscar todas as opções selecionadas no banco
    const selectedOptions = await prisma.option.findMany({
      where: { id: { in: selectedOptionIds } },
      include: { profile: true },
    });

    // Buscar todos os perfis/cursos cadastrados (já traz os novos campos)
    const allProfiles = await prisma.profile.findMany();

    // Inicializar mapa de pontuação para todos os cursos com 0 pontos
    const scoresMap: Record<string, ScoreItem> = {};
    allProfiles.forEach((profile) => {
      scoresMap[profile.id] = {
        profile,
        score: 0,
        percentage: 0,
      };
    });

    // Somar os pontos obtidos
    let totalScoreObtained = 0;
    selectedOptions.forEach((option) => {
      const pId = option.profileId;
      if (scoresMap[pId]) {
        scoresMap[pId].score += option.weight;
        totalScoreObtained += option.weight;
      }
    });

    // Calcular porcentagem de afinidade para cada curso
    Object.keys(scoresMap).forEach((pId) => {
      if (totalScoreObtained > 0) {
        const perc = (scoresMap[pId].score / totalScoreObtained) * 100;
        scoresMap[pId].percentage = Math.round(perc);
      }
    });

    // Identificar o perfil vencedor
    let winningProfile = null;
    let maxScore = -1;

    Object.values(scoresMap).forEach((item) => {
      if (item.score > maxScore) {
        maxScore = item.score;
        winningProfile = item.profile;
      }
    });

    if (!winningProfile) {
      throw new Error('Não foi possível determinar o perfil compatível.');
    }

    // Persistir o resultado no banco
    const savedResult = await prisma.testResult.create({
      data: {
        fullName,
        schoolLevel,
        schoolName,
        profileId: (winningProfile as any).id,
        scores: scoresMap,
      },
      include: { profile: true },
    });

    return {
      resultId: savedResult.id,
      fullName: savedResult.fullName,
      winningProfile: savedResult.profile,
      scoresMap,
    };
  }

  // Cria ou edita uma resposta manualmente pelo painel administrativo — ou
  // seja, SEM passar pelo questionário de duelos (por isso não recebe
  // selectedOptionIds; o admin escolhe o curso diretamente).
  async adminUpsertResult(data: AdminUpsertResultDTO) {
    const { id, fullName, schoolLevel, schoolName, profileId } = data;

    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile) {
      throw new Error('Perfil/curso informado não existe.');
    }

    // Resposta criada manualmente não passou pelos duelos, então registramos
    // 100% de afinidade só com o curso escolhido (sem concorrentes), no
    // mesmo formato de `scores` usado por calculateAndSaveResult.
    const scores: Record<string, ScoreItem> = {
      [profile.id]: { profile, score: 1, percentage: 100 },
    };

    if (id) {
      const existing = await prisma.testResult.findUnique({ where: { id } });
      if (!existing) {
        throw new Error('Resposta não encontrada para edição.');
      }

      return prisma.testResult.update({
        where: { id },
        data: { fullName, schoolLevel, schoolName, profileId: profile.id, scores },
        include: { profile: true },
      });
    }

    return prisma.testResult.create({
      data: { fullName, schoolLevel, schoolName, profileId: profile.id, scores },
      include: { profile: true },
    });
  }

  // Exclui uma resposta
  async deleteResult(id: string) {
    await prisma.testResult.delete({ where: { id } });
  }

  // Exclui várias respostas de uma vez (ação em massa do painel admin)
  async deleteResults(ids: string[]) {
    await prisma.testResult.deleteMany({ where: { id: { in: ids } } });
  }

  // --------------------------------------------------------------------
  // ATUALIZAÇÃO RECOMENDADA em getResultsData: inclua `schoolLevel` (para
  // o filtro/exibição de série no painel) e `createdAt` (data real da
  // resposta — hoje o front usa a data de criação do curso como um proxy
  // impreciso, por não ter nada melhor). `createdAt` já deve existir por
  // padrão no seu modelo Prisma; se não existir, adicione
  // `createdAt DateTime @default(now())` ao model TestResult.
  // --------------------------------------------------------------------
  async getResultsData() {
    const results = await prisma.testResult.findMany({
      select: {
        id: true,
        fullName: true,
        schoolName: true,
        schoolLevel: true, // NOVO
        createdAt: true, // NOVO
        profile: true,
        scores: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { results };
  }
}
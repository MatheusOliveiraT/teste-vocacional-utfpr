import prisma from '../config/prisma';
import { SubmitTestDTO, ScoreItem } from '../types/test';

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

  // Retorna a lista de todos os resultados com campos selecionados
  async getResultsData() {
    const results = await prisma.testResult.findMany({
      select: { 
        id: true, 
        fullName: true, 
        schoolName: true,
        profile: true, // Traz o objeto do Profile completo no select
      },
    });

    return { results };
  }
}
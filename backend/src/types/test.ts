export interface SubmitTestDTO {
  fullName: string;
  schoolLevel: string;
  schoolName: string;
  selectedOptionIds: string[];
}

export interface ScoreItem {
  profile: {
    id: string;
    name: string;
    description: string;
    degreeType: string;
    durationYears: number;
    semesters: number;
    shift: string;
    annualVacancies: number;
    curriculumUrl?: string | null;
    imageUrl?: string | null;
  };
  score: number;
  percentage: number;
}

export interface AdminUpsertResultDTO {
  /** Presente = edição de uma resposta existente. Ausente = criação. */
  id?: string;
  fullName: string;
  schoolLevel: string;
  schoolName: string;
  profileId: string;
}

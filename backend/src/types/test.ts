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
  };
  score: number;
  percentage?: number;
}
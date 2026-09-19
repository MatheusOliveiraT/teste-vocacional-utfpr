export interface Highlight {
  icon: string;
  title: string;
  subtitle: string;
}

export interface CampusImage {
  src: string;
  alt: string;
  caption: string;
  badge: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DuelOption {
  key: "A" | "B";
  label: string;
  icon: string;
}

export interface DuelQuestion {
  index: number;
  total: number;
  question: string;
  subtitle: string;
  contextLabel: string;
  options: [DuelOption, DuelOption];
}

export interface RankedCourse {
  rank: number;
  name: string;
  percent: number;
  degreeType: string;
  semesters: number;
  topMatch?: boolean;
}

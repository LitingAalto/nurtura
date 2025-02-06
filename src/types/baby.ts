export interface WeeklyDevelopment {
  week: number;
  title: string;
  description: string;
  heightRange: string;
  weightRange: string;
  milestones: string[];
  activities: {
    title: string;
    description: string;
  }[];
  developmentQuestion: {
    question: string;
    options: string[];
  };
}

export interface BabyInfo {
  name: string;
  birthDate: Date;
  gender: 'male' | 'female';
  currentWeek: number;
}
export interface Food {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export type Reaction = 'loved' | 'okay' | 'disliked' | 'allergy';

export interface SolidFoodRecord {
  id: string;
  timestamp: Date;
  foods: Array<{
    food: Food;
    amount: string;
  }>;
  reaction: Reaction | null;
  notes: string;
  photoUrl?: string;
}
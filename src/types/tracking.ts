export interface GrowthMilestone {
  id: string;
  date: Date;
  category: 'Physical' | 'Cognitive' | 'Social' | 'Language';
  title: string;
  description: string;
  mediaUrls?: string[];
}

export interface FeedingLog {
  id: string;
  timestamp: Date;
  type: 'Breastfeeding' | 'Bottle' | 'Solids';
  duration?: number; // in minutes
  amount?: number; // in ml or oz
  notes?: string;
}

export interface SleepLog {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  quality: 'Good' | 'Fair' | 'Poor';
  notes?: string;
}

export interface DiaperLog {
  id: string;
  timestamp: Date;
  type: 'Wet' | 'Dirty' | 'Both';
  consistency?: string;
  color?: string;
  notes?: string;
}

export interface GrowthMeasurement {
  id: string;
  date: Date;
  weight?: number; // in kg
  height?: number; // in cm
  headCircumference?: number; // in cm
}

export interface DevelopmentalMilestone {
  id: string;
  ageRange: string;
  category: string;
  title: string;
  description: string;
  completed: boolean;
  completedDate?: Date;
}
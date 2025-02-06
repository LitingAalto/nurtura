export interface BaseRecord {
  id: string;
  timestamp: Date;
  notes?: string;
}

export interface FeedingRecord extends BaseRecord {
  type: 'breastfeeding' | 'formula' | 'solid';
  amount?: number;
  duration?: number;
  side?: 'left' | 'right' | 'both';
}

export interface Reminder extends BaseRecord {
  title: string;
  type: string;
  time: Date;
  repeat?: {
    type: 'daily' | 'weekly' | 'monthly';
    days?: string[];
  };
  isActive: boolean;
}

export interface SleepRecord extends BaseRecord {
  startTime: Date;
  endTime: Date;
  duration: number;
  quality?: 'good' | 'fair' | 'poor';
}

export interface DiaperRecord extends BaseRecord {
  type: 'wet' | 'dirty' | 'both';
  consistency?: string;
  color?: string;
}
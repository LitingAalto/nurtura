export interface MomRecord {
  id?: string;
  date: Date;
  period: boolean | null;
  weight: number | null;
  mood: string | null;
  vitamins: string[];
  habits: string[];
  diary: string;
  symptoms: string;
}

export interface RecordOption {
  icon?: string;
  label: string;
}

export interface RecordType {
  id: string;
  title: string;
  type: 'toggle' | 'number' | 'mood' | 'multiple' | 'text';
  options?: (string | RecordOption)[];
  unit?: string;
}

export interface RecoveryTimelineData {
  timeline: string;
  keyPoints: string[];
  videos: { title: string; url: string }[]; // Assuming your VideoList component expects an array of objects with title and url
}
export interface Activity {
  id: string;
  name: string;
  icon: string;
  isCustom?: boolean;
}

export interface ActivityRecord {
  id: string;
  activityId: string;
  timestamp: Date;
  duration: number; // in seconds
  notes?: string;
}

export const predefinedActivities: Activity[] = [
  { id: 'bath', name: 'Bath', icon: '🛁' },
  { id: 'tummy-time', name: 'Tummy Time', icon: '👶' },
  { id: 'story-time', name: 'Story time', icon: '📚' },
  { id: 'singing-time', name: 'Singing time', icon: '🎵' },
  { id: 'outdoor', name: 'Outdoor Play', icon: '🌳' },
  { id: 'indoor', name: 'Indoor Play', icon: '🧸' },
  { id: 'teeth', name: 'Brush Teeth', icon: '🦷' },
  { id: 'swim', name: 'Swim', icon: '🏊‍♂️' },
  { id: 'other', name: 'Others', icon: '➕' },
];
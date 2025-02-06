export type ActivityType = 'breastfeeding' | 'formula' | 'pumped_milk' | 'sleep' | 'diaper' | 'pump' | 'meds';

export interface BaseActivity {
  id: string;
  timestamp: Date;
  type: string;
}

export interface BreastfeedingActivity extends BaseActivity {
  type: 'breastfeeding';
  duration: { left: number; right: number };
}

export interface FormulaActivity extends BaseActivity {
  type: 'formula';
  amount: number;
}

export interface PumpedMilkActivity extends BaseActivity {
  type: 'pumpedMilk';
  amount: number;
}

export interface SleepActivity extends BaseActivity {
  type: 'sleep';
  startTime: Date;
  endTime: Date;
  duration: number;
  quality: 'good' | 'average' | 'poor';
}

export interface DiaperActivity extends BaseActivity {
  type: 'diaper';
  wet: boolean;
  dirty: boolean;
  consistency?: 'loose' | 'normal' | 'hard';
}

export interface PumpActivity extends BaseActivity {
  type: 'pump';
  amount: number;
  duration: number;
}

export interface MedsActivity extends BaseActivity {
  type: 'meds';
  medName: string;
  amount: number;
  unit: 'ml' | 'drops' | 'tsp';
}

export type Activity = 
  | BreastfeedingActivity 
  | FormulaActivity 
  | PumpedMilkActivity 
  | SleepActivity 
  | DiaperActivity 
  | PumpActivity
  | MedsActivity;

export type ActivityType = 'breastfeeding' | 'formula' | 'pumped_milk' | 'sleep' | 'diaper' | 'pump' | 'meds';

export interface BaseActivity {
  id: string;
  timestamp: Date;
  type: ActivityType;
  notes?: string;
}

// ... (keep existing interfaces)

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
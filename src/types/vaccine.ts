export interface VaccineSchedule {
  id: string;
  name: string;
  description: string;
  monthDue: number;
  completed: boolean;
  scheduledDate: Date;
  actualDate?: Date;
  doses: VaccineDose[];
  notes?: string;
  reminder?: {
    type: string;
    time: Date;
  } | null;
}

export interface VaccineDose {
  number: number;
  timing: string;
  completed: boolean;
  date?: Date;
}

export interface VaccineDetails {
  name: string;
  description: string;
  preventedDiseases: string[];
  administrationMethod: string;
  sideEffects: string[];
  precautions: string[];
}
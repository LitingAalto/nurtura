export interface GrowthMeasurement {
  id: string;
  date: Date;
  height: number;
  weight: number;
  headCircumference: number;
}

export type TimeRange = '6m' | '1y' | '3y';
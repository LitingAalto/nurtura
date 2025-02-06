import { create } from 'zustand';
import type { SleepLog } from '../types/tracking';

interface SleepStore {
  sleepLogs: SleepLog[];
  addSleepLog: (log: SleepLog) => void;
}

export const useSleepStore = create<SleepStore>((set) => ({
  sleepLogs: [],
  addSleepLog: (log) => set((state) => ({
    sleepLogs: [...state.sleepLogs, log]
  })),
}));
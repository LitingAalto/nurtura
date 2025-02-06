import { create } from 'zustand';
import type { FeedingLog } from '../types/tracking';

interface FeedingStore {
  feedingLogs: FeedingLog[];
  addFeedingLog: (log: FeedingLog) => void;
}

export const useFeedingStore = create<FeedingStore>((set) => ({
  feedingLogs: [],
  addFeedingLog: (log) => set((state) => ({
    feedingLogs: [...state.feedingLogs, log]
  })),
}));
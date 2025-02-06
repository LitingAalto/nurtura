import { storage } from './storage';
import { FeedingRecord } from '../types/records';

const FEEDING_RECORDS_KEY = 'feeding_records';

export const feedingService = {
  getAll: (): FeedingRecord[] => {
    return storage.get(FEEDING_RECORDS_KEY) || [];
  },

  save: (record: FeedingRecord): boolean => {
    const records = feedingService.getAll();
    records.push({ ...record, id: crypto.randomUUID() });
    return storage.set(FEEDING_RECORDS_KEY, records);
  },

  update: (record: FeedingRecord): boolean => {
    const records = feedingService.getAll();
    const index = records.findIndex(r => r.id === record.id);
    if (index !== -1) {
      records[index] = record;
      return storage.set(FEEDING_RECORDS_KEY, records);
    }
    return false;
  },

  delete: (id: string): boolean => {
    const records = feedingService.getAll();
    const filtered = records.filter(r => r.id !== id);
    return storage.set(FEEDING_RECORDS_KEY, filtered);
  },

  getById: (id: string): FeedingRecord | null => {
    const records = feedingService.getAll();
    return records.find(r => r.id === id) || null;
  }
};
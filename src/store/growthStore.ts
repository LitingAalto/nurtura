import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GrowthMeasurement } from '../types/growth';
import { DB } from '../services/storage/db';

interface GrowthStore {
  records: GrowthMeasurement[];
  addRecord: (record: GrowthMeasurement) => Promise<void>;
  updateRecord: (record: GrowthMeasurement) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
  loadRecords: () => Promise<void>;
}

export const useGrowthStore = create<GrowthStore>()((set) => ({
  records: [],

  addRecord: async (record) => {
    try {
      await DB.init();
      await DB.add('growth_records', record);
      set((state) => ({
        records: [...state.records, record].sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        )
      }));
    } catch (error) {
      console.error('Error adding growth record:', error);
      throw error;
    }
  },

  updateRecord: async (record) => {
    try {
      await DB.init();
      await DB.update('growth_records', record);
      set((state) => ({
        records: state.records
          .map((r) => (r.id === record.id ? record : r))
          .sort((a, b) => b.date.getTime() - a.date.getTime())
      }));
    } catch (error) {
      console.error('Error updating growth record:', error);
      throw error;
    }
  },

  deleteRecord: async (id) => {
    try {
      await DB.init();
      await DB.delete('growth_records', id);
      set((state) => ({
        records: state.records.filter((r) => r.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting growth record:', error);
      throw error;
    }
  },

  loadRecords: async () => {
    try {
      await DB.init();
      const records = await DB.getAll<GrowthMeasurement>('growth_records');
      set({ 
        records: records.sort((a, b) => b.date.getTime() - a.date.getTime())
      });
    } catch (error) {
      console.error('Error loading growth records:', error);
      throw error;
    }
  }
}));
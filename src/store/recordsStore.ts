import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MomRecord } from '../types/mom';
import { Reminder } from '../types/records';
import { DB } from '../services/storage/db';

interface RecordsState {
  momRecords: MomRecord[];
  reminders: Reminder[];
  addMomRecord: (record: MomRecord) => void;
  updateMomRecord: (record: MomRecord) => void;
  deleteMomRecord: (id: string) => void;
  addReminder: (reminder: Reminder) => Promise<void>;
  updateReminder: (reminder: Reminder) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  toggleReminder: (id: string) => Promise<void>;
  loadReminders: () => Promise<void>;
}

export const useRecordsStore = create<RecordsState>()(
  persist(
    (set, get) => ({
      momRecords: [],
      reminders: [],

      addMomRecord: (record) => set((state) => ({
        ...state,
        momRecords: [...state.momRecords, record]
      })),

      updateMomRecord: (record) => set((state) => ({
        ...state,
        momRecords: state.momRecords.map(r => 
          r.id === record.id ? record : r
        )
      })),

      deleteMomRecord: (id) => set((state) => ({
        ...state,
        momRecords: state.momRecords.filter(r => r.id !== id)
      })),

      addReminder: async (reminder) => {
        try {
          await DB.init(); // Ensure DB is initialized
          await DB.add('reminders', reminder);
          set((state) => ({
            ...state,
            reminders: [...state.reminders, reminder]
          }));
        } catch (error) {
          console.error('Error adding reminder:', error);
          throw error;
        }
      },

      updateReminder: async (reminder) => {
        try {
          await DB.init(); // Ensure DB is initialized
          await DB.update('reminders', reminder);
          set((state) => ({
            ...state,
            reminders: state.reminders.map(r =>
              r.id === reminder.id ? reminder : r
            )
          }));
        } catch (error) {
          console.error('Error updating reminder:', error);
          throw error;
        }
      },

      deleteReminder: async (id) => {
        try {
          await DB.init(); // Ensure DB is initialized
          await DB.delete('reminders', id);
          set((state) => ({
            ...state,
            reminders: state.reminders.filter(r => r.id !== id)
          }));
        } catch (error) {
          console.error('Error deleting reminder:', error);
          throw error;
        }
      },

      toggleReminder: async (id) => {
        try {
          await DB.init(); // Ensure DB is initialized
          const reminder = get().reminders.find(r => r.id === id);
          if (reminder) {
            const updatedReminder = {
              ...reminder,
              isActive: !reminder.isActive
            };
            await DB.update('reminders', updatedReminder);
            set((state) => ({
              ...state,
              reminders: state.reminders.map(r =>
                r.id === id ? updatedReminder : r
              )
            }));
          }
        } catch (error) {
          console.error('Error toggling reminder:', error);
          throw error;
        }
      },

      loadReminders: async () => {
        try {
          await DB.init(); // Ensure DB is initialized
          const reminders = await DB.getAll<Reminder>('reminders');
          set({ reminders });
        } catch (error) {
          console.error('Error loading reminders:', error);
          throw error;
        }
      }
    }),
    {
      name: 'mom-records-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        momRecords: state.momRecords
      })
    }
  )
);
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { VaccineSchedule } from '../types/vaccine';

interface VaccineStore {
  vaccines: VaccineSchedule[];
  addVaccine: (vaccine: VaccineSchedule) => void;
  updateVaccine: (vaccine: VaccineSchedule) => void;
  deleteVaccine: (id: string) => void;
  toggleVaccineComplete: (id: string) => void;
  setVaccineReminder: (id: string, reminder: { type: string; time: Date } | null) => void;
}

export const useVaccineStore = create<VaccineStore>()(
  persist(
    (set) => ({
      vaccines: [],
      
      addVaccine: (vaccine) => set((state) => ({
        vaccines: [...state.vaccines, {
          ...vaccine,
          id: crypto.randomUUID(),
          scheduledDate: new Date(vaccine.scheduledDate)
        }]
      })),
      
      updateVaccine: (vaccine) => set((state) => ({
        vaccines: state.vaccines.map(v => v.id === vaccine.id ? {
          ...vaccine,
          scheduledDate: new Date(vaccine.scheduledDate)
        } : v)
      })),
      
      deleteVaccine: (id) => set((state) => ({
        vaccines: state.vaccines.filter(v => v.id !== id)
      })),
      
      toggleVaccineComplete: (id) => set((state) => ({
        vaccines: state.vaccines.map(v => 
          v.id === id ? { ...v, completed: !v.completed } : v
        )
      })),
      
      setVaccineReminder: (id, reminder) => set((state) => ({
        vaccines: state.vaccines.map(v =>
          v.id === id ? {
            ...v,
            reminder: reminder ? {
              ...reminder,
              time: new Date(reminder.time)
            } : null
          } : v
        )
      }))
    }),
    {
      name: 'vaccine-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            vaccines: (persistedState.vaccines || []).map((v: any) => ({
              ...v,
              scheduledDate: new Date(v.scheduledDate),
              reminder: v.reminder ? {
                ...v.reminder,
                time: new Date(v.reminder.time)
              } : null
            }))
          };
        }
        return persistedState;
      }
    }
  )
);
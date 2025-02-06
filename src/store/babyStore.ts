import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Baby {
  id: string;
  name: string;
  gender: 'male' | 'female';
  birthDate: Date;
  photo?: string;
}

interface BabyStore {
  babies: Baby[];
  addBaby: (baby: Omit<Baby, 'id'>) => void;
  updateBaby: (id: string, baby: Partial<Baby>) => void;
  deleteBaby: (id: string) => void;
  getBaby: (id: string) => Baby | undefined;
}

export const useBabyStore = create<BabyStore>()(
  persist(
    (set, get) => ({
      babies: [],
      
      addBaby: (baby) => set((state) => ({
        babies: [...state.babies, { ...baby, id: crypto.randomUUID() }]
      })),
      
      updateBaby: (id, baby) => set((state) => ({
        babies: state.babies.map((b) => 
          b.id === id ? { ...b, ...baby } : b
        )
      })),
      
      deleteBaby: (id) => set((state) => ({
        babies: state.babies.filter((b) => b.id !== id)
      })),
      
      getBaby: (id) => get().babies.find((b) => b.id === id)
    }),
    {
      name: 'baby-store'
    }
  )
);
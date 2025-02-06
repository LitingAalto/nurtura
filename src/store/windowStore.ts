import { create } from 'zustand';

export interface MinimizedWindow {
  id: string;
  type: 'feeding' | 'formula' | 'pumped_milk' | 'sleep' | 'diaper' | 'pump' | 'meds';
  title: string;
  icon: string;
  timestamp: Date;
  state: any; // Store the window state
}

interface WindowStore {
  minimizedWindows: MinimizedWindow[];
  minimizeWindow: (window: MinimizedWindow) => void;
  restoreWindow: (id: string) => MinimizedWindow | undefined;
  closeWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  minimizedWindows: [],
  
  minimizeWindow: (window) => 
    set((state) => ({
      minimizedWindows: [...state.minimizedWindows, window]
    })),
  
  restoreWindow: (id) => {
    const window = get().minimizedWindows.find(w => w.id === id);
    set((state) => ({
      minimizedWindows: state.minimizedWindows.filter(w => w.id !== id)
    }));
    return window;
  },
  
  closeWindow: (id) =>
    set((state) => ({
      minimizedWindows: state.minimizedWindows.filter(w => w.id !== id)
    }))
}));
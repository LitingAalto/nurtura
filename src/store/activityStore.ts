import { create } from 'zustand';
import { Activity } from '../types/activities';
import { recordsService } from '../services/recordsService';

interface ActivityStore {
  activities: Activity[];
  addActivity: (activity: Activity) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  getLastActivity: (type: Activity['type']) => Activity | undefined;
  loadActivities: (startDate: Date, endDate: Date) => Promise<void>;
}

export const useActivityStore = create<ActivityStore>((set, get) => ({
  activities: [],
  
  addActivity: async (activity) => {
    try {
      await recordsService.saveRecord(activity);
      set((state) => ({
        activities: [...state.activities, activity].sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        )
      }));
    } catch (error) {
      console.error('Error saving activity:', error);
      throw error;
    }
  },
    
  updateActivity: async (activity) => {
    try {
      await recordsService.updateRecord(activity.id, activity);
      set((state) => ({
        activities: state.activities
          .map(a => a.id === activity.id ? activity : a)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      }));
    } catch (error) {
      console.error('Error updating activity:', error);
      throw error;
    }
  },
    
  deleteActivity: async (id) => {
    try {
      await recordsService.deleteRecord(id);
      set((state) => ({
        activities: state.activities.filter(a => a.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  },
    
  getLastActivity: (type) => {
    const state = get();
    return state.activities
      .filter(a => a.type === type)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  },

  loadActivities: async (startDate: Date, endDate: Date) => {
    try {
      const records = await recordsService.getRecords(startDate, endDate);
      set({ activities: records });
    } catch (error) {
      console.error('Error loading activities:', error);
      throw error;
    }
  }
}));
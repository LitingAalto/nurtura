import { Activity } from '../types/activities';
import { DB } from './storage/db';

const getStoreNameForActivity = (activity: Activity): string => {
  switch (activity.type) {
    case 'breastfeeding':
    case 'formula':
    case 'pumped_milk':
      return 'feeding_records';
    case 'sleep':
      return 'sleep_records';
    case 'diaper':
      return 'diaper_records';
    default:
      return 'feeding_records';
  }
};

export const recordsService = {
  async saveRecord(activity: Activity) {
    const storeName = getStoreNameForActivity(activity);
    return DB.add(storeName, activity);
  },

  async getRecords(startDate: Date, endDate: Date) {
    const allRecords: Activity[] = [];
    
    // Get records from all stores
    for (const store of ['feeding_records', 'sleep_records', 'diaper_records']) {
      const records = await DB.getAllInRange<Activity>(store, startDate, endDate);
      allRecords.push(...records);
    }

    // Sort by timestamp descending
    return allRecords.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  },

  async updateRecord(id: string, activity: Activity) {
    const storeName = getStoreNameForActivity(activity);
    return DB.update(storeName, activity);
  },

  async deleteRecord(id: string) {
    // Since we don't know which store the record is in, try all stores
    for (const store of ['feeding_records', 'sleep_records', 'diaper_records']) {
      try {
        await DB.delete(store, id);
      } catch (error) {
        // Ignore errors from stores that don't contain the record
        continue;
      }
    }
  }
};
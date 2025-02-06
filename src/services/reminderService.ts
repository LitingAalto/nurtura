import { storage } from './storage';
import { Reminder } from '../types/records';

const REMINDERS_KEY = 'reminders';

export const reminderService = {
  getAll: (): Reminder[] => {
    return storage.get(REMINDERS_KEY) || [];
  },

  save: (reminder: Reminder): boolean => {
    const reminders = reminderService.getAll();
    reminders.push({ ...reminder, id: crypto.randomUUID() });
    return storage.set(REMINDERS_KEY, reminders);
  },

  update: (reminder: Reminder): boolean => {
    const reminders = reminderService.getAll();
    const index = reminders.findIndex(r => r.id === reminder.id);
    if (index !== -1) {
      reminders[index] = reminder;
      return storage.set(REMINDERS_KEY, reminders);
    }
    return false;
  },

  delete: (id: string): boolean => {
    const reminders = reminderService.getAll();
    const filtered = reminders.filter(r => r.id !== id);
    return storage.set(REMINDERS_KEY, filtered);
  },

  getById: (id: string): Reminder | null => {
    const reminders = reminderService.getAll();
    return reminders.find(r => r.id === id) || null;
  }
};
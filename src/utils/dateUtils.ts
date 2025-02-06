import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

export const calculateWeeksPregnant = (dueDate: Date): number => {
  const today = new Date();
  const diffTime = Math.abs(dueDate.getTime() - today.getTime());
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  return 40 - diffWeeks;
};

export const calculateBabyAge = (birthDate: Date): string => {
  const today = new Date();
  const months = today.getMonth() - birthDate.getMonth() + 
    (12 * (today.getFullYear() - birthDate.getFullYear()));
  const days = today.getDate() - birthDate.getDate();
  
  return `${months} months, ${days} days`;
};

export const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ${diffInMinutes % 60}m ago`;
  }
  
  return format(date, 'h:mm a');
};
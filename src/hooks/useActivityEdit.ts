import { useLocation } from 'react-router-dom';
import { Activity } from '../types/activities';

export const useActivityEdit = () => {
  const location = useLocation();
  const activity = location.state?.activity as Activity | undefined;
  
  return {
    isEditing: !!activity,
    activity
  };
};
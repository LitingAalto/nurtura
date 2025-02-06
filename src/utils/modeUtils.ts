import { ModeOption } from '../types/mode';

export const getModeOptions = (mode: string): ModeOption[] => {
  const baseOptions = [
    {
      id: 'baby',
      label: 'Baby Management',
      icon: '👶',
      path: '/baby-management'
    }
  ];

  switch (mode) {
    case 'period':
      return [
        {
          id: 'period',
          label: 'Setting of Period',
          icon: '📅',
          path: '/period-settings'
        },
        ...baseOptions
      ];
    case 'prepare':
      return [
        {
          id: 'period',
          label: 'Setting of Period',
          icon: '📅',
          path: '/period-settings'
        },
        ...baseOptions
      ];
    case 'pregnancy':
      return [
        {
          id: 'duedate',
          label: 'Setting of Due Date',
          icon: '🗓️',
          path: '/due-date-settings'
        },
        ...baseOptions
      ];
    case 'postpartum':
      return [
        {
          id: 'period',
          label: 'Setting of Period',
          icon: '📅',
          path: '/period-settings'
        },
        ...baseOptions
      ];
    default:
      return baseOptions;
  }
};
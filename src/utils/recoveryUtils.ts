export const calculatePostpartumPeriod = (birthDate: Date): string => {
  const today = new Date();
  const diffMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
    (today.getMonth() - birthDate.getMonth());

  if (diffMonths <= 2) return '1-2';
  if (diffMonths <= 4) return '3-4';
  return '5-6';
};
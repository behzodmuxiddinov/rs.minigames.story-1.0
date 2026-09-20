export const formatNumber = (number: number): string => {
  if (!number) return '';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumber = (number: number): string => {
  if (!number) return '';
  return number.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCompact = (number: number): string => {
  if (number < 1000) return number.toString();
  return `${Math.floor(number / 100) / 10}K`;
};

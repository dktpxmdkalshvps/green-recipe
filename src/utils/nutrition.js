export const calculateBarWidth = (value, max) => {
  if (max <= 0) return 0;
  return Math.max(0, Math.min((value / max) * 100, 100));
};

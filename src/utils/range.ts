export const randomRangedNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

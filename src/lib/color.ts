export const randomColor = (seed: string): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + hash * 31;
  }
  const hue = hash % 360;
  return `hsl(${hue}, 50%, 90%)`;
};

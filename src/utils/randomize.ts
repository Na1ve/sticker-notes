
export const randomize = (from: number, to: number): number => {
  return from + (to - from)*Math.random();
}

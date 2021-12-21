let counter = 0;

export const generateId = (prefix?: string): string => {
  return `${prefix || 'guid'}-${counter++}`;
};

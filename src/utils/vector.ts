import { IVector } from '../interfaces/Vector';

export const addVectors = (a: IVector, b: IVector): IVector => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
};

export const subVectors = (a: IVector, b: IVector): IVector => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
};

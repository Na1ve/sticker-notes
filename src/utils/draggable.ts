import { IVector } from '../interfaces/Vector';
import { subVectors } from './vector';

export const draggable = (move: (delta: IVector) => void, end: (delta: IVector) => void) => (e: React.MouseEvent) => {
  e.stopPropagation();
  const startPosition: IVector = {
    x: e.pageX,
    y: e.pageY,
  };

  const moveHandler = (e: MouseEvent) => {
    const currentPosition: IVector = {
      x: e.pageX,
      y: e.pageY,
    };
    const delta = subVectors(currentPosition, startPosition);
    move(delta);
  };

  const endHandler = (e: MouseEvent) => {
    const currentPosition: IVector = {
      x: e.pageX,
      y: e.pageY,
    };
    const delta = subVectors(currentPosition, startPosition);
    end(delta);
    
    window.removeEventListener('mousemove', moveHandler);
    window.removeEventListener('mouseup', endHandler);
  };

  window.addEventListener('mousemove', moveHandler);
  window.addEventListener('mouseup', endHandler);
};
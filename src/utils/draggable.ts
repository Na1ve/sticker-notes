import { IVector } from '../interfaces/Vector';
import { subVectors } from './vector';

export interface DroppableZone {
  zone: React.RefObject<HTMLInputElement>;
  handler: (isMouseOver: boolean) => void;
}

export const draggable =
  (
    move: (delta: IVector) => void,
    end: (delta: IVector) => void,
    droppableZones?: DroppableZone[]
  ) =>
  (e: React.MouseEvent) => {
    e.stopPropagation();
    const startPosition: IVector = {
      x: e.clientX,
      y: e.clientY,
    };

    const moveHandler = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const currentPosition: IVector = {
        x: e.clientX,
        y: e.clientY,
      };
      const delta = subVectors(currentPosition, startPosition);
      move(delta);
    };

    const endHandler = (e: MouseEvent) => {
      const currentPosition: IVector = {
        x: e.clientX,
        y: e.clientY,
      };
      const delta = subVectors(currentPosition, startPosition);
      end(delta);

      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
      if (droppableZones) {
        droppableZones.forEach(({ zone, handler }) => {
          if (zone.current) {
            const box = zone.current.getBoundingClientRect();

            handler(isPointInTheBox(currentPosition, box));
          }
        });
      }
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', endHandler);
  };

const isPointInTheBox = (point: IVector, box: DOMRect) => {
  return box.left <= point.x && point.x <= box.right && box.top <= point.y && point.y <= box.bottom;
};

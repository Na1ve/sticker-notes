import { IVector } from './Vector';
import { generateId } from '../utils/generateId';

export type TStickerId = string;

export interface IStickyNote {
  id: TStickerId;
	content: string;
	position: IVector;
	size: IVector;
};

export const stickyNoteFactory = (model?: Partial<IStickyNote>): IStickyNote => {
	return {
    id: generateId(),
		content: '',
		position: {x: 0, y: 0},
		size: {x: 0, y: 0},
		...model,
	};
};

export interface DroppableZone {
  zone: React.RefObject<HTMLInputElement>,
  handler: (sticker: Partial<IStickyNote>) => void;
};

export interface IStickyNoteProps extends IStickyNote {
  editable?: boolean;
  resizable?: boolean;
  movable?: boolean;
  onSave?: (sticker: IStickyNote) => void;
  droppableZones?: DroppableZone[];
};

import { IVector } from './Vector';
import { generateId } from '../utils/generateId';

export interface IStickyNote {
  id: string;
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
}


export interface IStickyNoteProps extends IStickyNote {
  editable?: boolean;
  resizable?: boolean;
  movable?: boolean;
  onSave?: (sticker: IStickyNote) => void;
}
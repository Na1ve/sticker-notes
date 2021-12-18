import { IVector } from './Vector';

export interface IStickyNote {
	content: string;
	position: IVector;
	size: IVector;
};

export const stickyNoteFactory = (model?: Partial<IStickyNote>): IStickyNote => {
	return {
		content: '',
		position: {x: 0, y: 0},
		size: {x: 0, y: 0},
		...model,
	};
}

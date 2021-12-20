import { BaseTransport } from './BaseTransport';
import { IStickyNote } from '../interfaces/StickyNote';

const BASE_URL = 'sticker-note';
const CACHED_PREFIX = 'cached';

export const StickyNoteTransport = {
  get: async (): Promise<IStickyNote[]> => {
    try {
      const result = await BaseTransport.get(BASE_URL);
      return result || [];
    } catch (e) {
      return [];
    }
  },
  post: async (data: IStickyNote[]) => {
    const vacantIdsNumber = data
      .filter(({id}) => id.startsWith(CACHED_PREFIX))
      .map(({id}) => Number(id.replace(/\D/g, '')));
    let minNonVacantNumber = Math.max(...vacantIdsNumber, -1) + 1;
    return await BaseTransport.post(BASE_URL, data.map(sticker => ({
      ...sticker,
      id: sticker.id.startsWith(CACHED_PREFIX)
        ? sticker.id
        : `${CACHED_PREFIX}-${minNonVacantNumber++}`
    })))
  }
};

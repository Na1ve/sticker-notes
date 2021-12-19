import React from 'react';
import classNames from 'classnames/bind';
import styles from './Desktop.css';

import { IStickyNote, stickyNoteFactory } from '../../interfaces/StickyNote';
import { StickyNote } from '../StickyNote';
import { CreateZone } from '../CreateZone';
import { TrashZone } from '../TrashZone';

const cx = classNames.bind(styles);

interface IDesktopProps {

}

const Desktop: React.FC<IDesktopProps> = () => {
  const [stickerList, setStickerList] = React.useState<IStickyNote[]>([]);
  const trashZone = React.useRef(null);

  const saveHandler = (index: number) => (sticker: IStickyNote) => {
    const newStickerList = [...stickerList];
    newStickerList.splice(index, 1);
    newStickerList.push(sticker);
    setStickerList(newStickerList);
  }

  const createHandler = (sticker: IStickyNote) => {
    setStickerList([
      ...stickerList, 
      {
        ...sticker,
        content: '',
      }
    ]);
  }

  const onRemove = (stickerInfo: Partial<IStickyNote>) => {
    const newStickerList = [...stickerList];
    const deletePosition = newStickerList.findIndex(({id}) => id === stickerInfo.id);
    newStickerList.splice(deletePosition, 1);

    setStickerList(newStickerList); 
  };

  const commonDroppableZones = [{
    zone: trashZone,
    handler: onRemove,
  }];

  return (
    <div className={cx('wrapper')}>
    	{stickerList.map((stickerProps: IStickyNote, index: number) => 
        <StickyNote 
          {...stickerProps} 
          key={stickerProps.id}
          editable
          resizable
          movable
          onSave={saveHandler(index)}
          droppableZones={commonDroppableZones}
        />
      )}
      <CreateZone onSave={createHandler} />
      <TrashZone isVisible={stickerList.length > 0} zone={trashZone} />
    </div>
  );
}

export {Desktop};

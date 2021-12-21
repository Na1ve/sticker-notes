import React from 'react';
import classNames from 'classnames/bind';
import styles from './Desktop.css';

import { IStickyNote, TStickerId } from '../../interfaces/StickyNote';
import { StickyNote } from '../StickyNote';
import { CreateZone } from '../CreateZone';
import { TrashZone } from '../TrashZone';

const cx = classNames.bind(styles);

interface IDesktopProps {
  onSave: (stickerList: IStickyNote[]) => void,
  pending?: boolean,
  stickerList: IStickyNote[],
}

const Desktop: React.FC<IDesktopProps> = ({
  onSave: setStickerList,
  pending,
  stickerList,
}) => {
  const trashZone = React.useRef(null);

  const saveHandler = (sticker: Partial<IStickyNote>) => {
    const newStickerList = [...stickerList];
    const index = newStickerList.findIndex(({id}) => id === sticker.id);
    if (index >= 0) {
      newStickerList.splice(index, 1);
    }
    if (sticker.position && sticker.size) {
      newStickerList.push(sticker as IStickyNote);
    }
    setStickerList(newStickerList);
  }

  const commonDroppableZones = [{
    zone: trashZone,
    handler: saveHandler,
  }];

  return (
    <div className={cx('wrapper', {wrapper_pending: pending})}>
      {stickerList.map((stickerProps: IStickyNote, index: number) => 
        <StickyNote 
          {...stickerProps} 
          key={stickerProps.id}
          editable
          resizable
          movable
          onSave={saveHandler}
          droppableZones={commonDroppableZones}
          withShadow
        />
      )}
      <CreateZone onSave={saveHandler} />
      <TrashZone isVisible={stickerList.length > 0} zone={trashZone} />
    </div>
  );
}

export {Desktop};

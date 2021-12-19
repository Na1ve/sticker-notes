import React from 'react';
import classNames from 'classnames/bind';
import styles from './Desktop.css';

import { IStickyNote, stickyNoteFactory } from '../../interfaces/StickyNote';
import { StickyNote } from '../StickyNote';
import { CreateZone } from '../CreateZone';

const cx = classNames.bind(styles);

interface IDesktopProps {

}

const Desktop: React.FC<IDesktopProps> = () => {
  const [stickerList, setStickerList] = React.useState<IStickyNote[]>([]);

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
    //setStickerDummyKey(stickerDummyKey+1);
  }

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
        />
      )}
      <CreateZone onSave={createHandler} />
    </div>
  );
}

export {Desktop};

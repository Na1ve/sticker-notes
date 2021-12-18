import React from 'react';
import classNames from 'classnames/bind';
import styles from './Desktop.css';

import { IStickyNote, stickyNoteFactory } from '../../interfaces/StickyNote';
import { StickyNote } from '../StickyNote';

const cx = classNames.bind(styles);

interface IDesktopProps {

}

const Desktop: React.FC<IDesktopProps> = (props) => {
  const [stickerList, setStickerList] = React.useState<IStickyNote[]>([stickyNoteFactory({size: {x: 100, y: 100}})]);

  return (
    <div className={cx('wrapper')}>
    	{stickerList.map((stickerProps) => <StickyNote {...stickerProps} key='a' onSave={(sticker: IStickyNote) => {
        setStickerList([sticker])
      }}/>)}
    </div>
  );
}

export {Desktop};

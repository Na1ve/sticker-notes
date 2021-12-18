import React from 'react';
import classNames from 'classnames/bind';
import styles from './StickyNote.css';

import { addVectors, subVectors } from '../../utils/vector';
import { draggable } from '../../utils/draggable';
import { IVector } from '../../interfaces/Vector';
import { IStickyNote } from '../../interfaces/StickyNote';


const cx = classNames.bind(styles);

interface IStickyNoteProps extends IStickyNote {
  onSave?: (sticker: IStickyNote) => void;
}

const StickyNote: React.FC<IStickyNoteProps> = (props: IStickyNoteProps) => {
  const [size, setSize] = React.useState<IVector>(props.size);
  const [position, setPosition] = React.useState<IVector>(props.position);
  const [content, setContent] = React.useState(props.content);

  const moveHandler = draggable(
    (delta: IVector) => {
      setPosition(addVectors(props.position, delta));
    }, (delta: IVector) => {
      const targetValue: IVector = addVectors(props.position, delta);
      setPosition(targetValue);
      if (props.onSave) {
        props.onSave({
          size,
          position: targetValue,
          content,
        });
      }
    },
  );

  const resizeHandler = draggable((delta: IVector) => {
      setSize(addVectors(props.size, delta));
    }, (delta: IVector) => {
      const targetValue: IVector = addVectors(props.size, delta);
      setSize(targetValue);
      if (props.onSave) {
        props.onSave({
          size: targetValue,
          position,
          content,
        });
      }
    },
  );

  const stickerStyle = {
    '--size-x': size.x,
    '--size-y': size.y,
    '--position-x': position.x,
    '--position-y': position.y,
  } as React.CSSProperties;

  return (
    <div className={cx('wrapper')} style={stickerStyle}>
      <div className={cx('header')} onMouseDown={moveHandler}/>
      <textarea className={cx('content')} onChange={(e) => setContent(e.target.value)} value={content} />
      <div className={cx('resize-corner')} onMouseDown={resizeHandler}/>
    </div>
  );
}

export {StickyNote};

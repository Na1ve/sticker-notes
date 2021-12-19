import React from 'react';
import classNames from 'classnames/bind';
import styles from './StickyNote.css';

import { addVectors } from '../../utils/vector';
import { draggable } from '../../utils/draggable';
import { IVector } from '../../interfaces/Vector';
import { IStickyNote, IStickyNoteProps } from '../../interfaces/StickyNote';


const cx = classNames.bind(styles);

export const StickyNote: React.FC<IStickyNoteProps> = (props: IStickyNoteProps) => {
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
          id: props.id,
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
          id: props.id,
          size: targetValue,
          position,
          content,
        });
      }
    },
  );

  const contentHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const content = e.currentTarget.value
    setContent(content);
    if (props.onSave) {
      props.onSave({
        id: props.id,
        size,
        position,
        content,
      });
    }
  };

  const stickerStyle = {
    '--size-x': size.x,
    '--size-y': size.y,
    '--position-x': position.x,
    '--position-y': position.y,
  } as React.CSSProperties;

  return (
    <div className={cx('wrapper')} style={stickerStyle}>
      {props.movable &&
        <div className={cx('header')} onMouseDown={moveHandler}/>
      }
      <textarea 
        className={cx('content')} 
        onChange={contentHandler} 
        value={content} 
        placeholder={'Enter the content'}
        disabled={!props.editable}
      />
      {props.resizable &&
        <div className={cx('resize-corner')} onMouseDown={resizeHandler}/>
      }
    </div>
  );
}

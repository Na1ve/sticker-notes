import React from 'react';
import classNames from 'classnames/bind';
import styles from './StickyNote.css';

import { addVectors } from '../../utils/vector';
import { draggable } from '../../utils/draggable';
import { IVector } from '../../interfaces/Vector';
import { IStickyNote, IStickyNoteProps } from '../../interfaces/StickyNote';

const cx = classNames.bind(styles);

export const StickyNote: React.FC<IStickyNoteProps> = (props: IStickyNoteProps) => {
  const { id, color, withShadow } = props;
  const [size, setSize] = React.useState<IVector>(props.size);
  const [position, setPosition] = React.useState<IVector>(props.position);
  const [content, setContent] = React.useState(props.content);
  const [dragging, setDragging] = React.useState(false);

  const saveHandler = (aditableProperty: Partial<IStickyNote>) => {
    if (props.onSave) {
      props.onSave(id, {
        id,
        size,
        position,
        content,
        color,
        ...aditableProperty,
      });
    }
  };

  const moveHandler = draggable(
    (delta: IVector) => {
      setDragging(true);
      setPosition(addVectors(props.position, delta));
    },
    (delta: IVector) => {
      const targetValue: IVector = addVectors(props.position, delta);
      setDragging(false);
      setPosition(targetValue);
      saveHandler({ position: targetValue });
    },
    props.droppableZones?.map(({ zone, handler }) => {
      return {
        zone,
        handler: (result: boolean) => {
          if (result) {
            handler(id);
          }
        },
      };
    })
  );

  const resizeHandler = draggable(
    (delta: IVector) => {
      setDragging(true);
      setSize(addVectors(props.size, delta));
    },
    (delta: IVector) => {
      const targetValue: IVector = addVectors(props.size, delta);
      setDragging(false);
      setSize(targetValue);
      saveHandler({ size: targetValue });
    }
  );

  const setContentHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const content = e.currentTarget.value;
    setContent(content);
    saveHandler({ content });
  };

  const stickerStyle = {
    '--size-x': size.x,
    '--size-y': size.y,
    '--position-x': position.x,
    '--position-y': position.y,
    '--bgcolor': color,
  } as React.CSSProperties;

  return (
    <div className={cx('wrapper', { wrapper_dragging: dragging })} style={stickerStyle}>
      {withShadow && (
        <>
          <div className={cx('bottom-shadow')} />
          <div className={cx('top-shadow')} />
        </>
      )}
      <div className={cx('background')}>
        {props.movable && <div className={cx('header')} onMouseDown={moveHandler} />}
        <textarea
          className={cx('content')}
          onChange={setContentHandler}
          value={content}
          placeholder={'Enter the content'}
          disabled={!props.editable}
        />
        {props.resizable && <div className={cx('resize-corner')} onMouseDown={resizeHandler} />}
      </div>
    </div>
  );
};

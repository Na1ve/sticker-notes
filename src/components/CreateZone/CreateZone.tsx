import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateZone.css';

import { generateId } from '../../utils/generateId';

import { IVector } from '../../interfaces/Vector';
import { IStickyNote, stickyNoteFactory, IStickyNoteProps } from '../../interfaces/StickyNote';
import { StickyNote } from '../StickyNote';

const cx = classNames.bind(styles);

const DEFAULT_SIZE: IVector = {x: 240, y: 240};
const DEFAULT_POSITION: IVector = {x: 20, y: 20};

enum Step {
  Create,
  SetSize,
};

const stickyNotePropsByStep: Record<Step, Partial<IStickyNoteProps>> = {
  [Step.Create]: {
    content: 'Drag to create new Sticky Note',
    movable: true,
    resizable: false,
    editable: false,
  }, 
  [Step.SetSize]: {
    content: 'Drag by rb-corner to set size of sticker',
    movable: false,
    resizable: true,
    editable: false,
  }
};

interface ICreateZoneProps {
  onSave: (sticker: IStickyNote) => void;
}

const CreateZone: React.FC<ICreateZoneProps> = ({onSave: handleSave}) => {
  const position: IVector = DEFAULT_POSITION;
  const stickerDummyProps = stickyNoteFactory({
    size: DEFAULT_SIZE,
    position: DEFAULT_POSITION,
  });
  const [stickerProps, setStickerProps] = React.useState<IStickyNote>(stickerDummyProps);
  const [step, setStep] = React.useState<Step>(Step.Create);

  const additionalStickerProps: Partial<IStickyNoteProps> = stickyNotePropsByStep[step];

  const stackStyles = {
    width: `${DEFAULT_SIZE.x}px`,
    height: `${DEFAULT_SIZE.y}px`,
    top: `${DEFAULT_POSITION.y}px`,
    left: `${DEFAULT_POSITION.x}px`,
  };

  const nextStepHandler = (stickerProps: IStickyNote) => {
    switch (step) {
      case Step.Create:
        setStickerProps(stickerProps);
        setStep(Step.SetSize);
        break;
      case Step.SetSize:
        setStickerProps({
          ...stickerDummyProps,
          id: generateId(),
        });
        setStep(Step.Create);
        handleSave(stickerProps);
        break;
    }
  }

  return (
    <>
      <div className={cx('stack')} style={stackStyles}/>
      <StickyNote
        key={`${stickerProps.id}-${step}`}
        {...stickerProps}
        {...additionalStickerProps}
        onSave={nextStepHandler}
      />
    </>
  );
}

export {CreateZone};

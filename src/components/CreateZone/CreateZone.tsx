import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateZone.css';

import { generateId } from '../../utils/generateId';

import { IVector } from '../../interfaces/Vector';
import { IStickyNote, stickyNoteFactory, IStickyNoteProps, TStickerId } from '../../interfaces/StickyNote';
import { StickyNote } from '../StickyNote';

const cx = classNames.bind(styles);

const DEFAULT_SIZE: IVector = {x: 240, y: 240};
const DEFAULT_POSITION: IVector = {x: 20, y: 20};

const DEFAULT_COLOR = 55;
const COLOR_OFFSET = 135;
const TOTAL_COLORS = 360;

const getNextColor = (color: number): number => {
  return (color + COLOR_OFFSET) % TOTAL_COLORS;
};

enum Step {
  Create,
  SetSize,
};

const stickerDummyProps = stickyNoteFactory({
  size: DEFAULT_SIZE,
  position: DEFAULT_POSITION,
});


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
  onSave: (stickerId: TStickerId, sticker: IStickyNote) => void;
  lastUsedColor?: number | null;
}

const CreateZone: React.FC<ICreateZoneProps> = ({onSave: handleSave}) => {
  const position: IVector = DEFAULT_POSITION;
  const [currentColor, setCurrentColor] = React.useState<number>(DEFAULT_COLOR);

  const [stickerProps, setStickerProps] = React.useState<IStickyNote>({
    ...stickerDummyProps,
    color: currentColor,
  });
  const [step, setStep] = React.useState<Step>(Step.Create);

  const createNewDummy = () => {
    const color = getNextColor(currentColor);
    setStickerProps({
      ...stickerDummyProps,
      color,
      id: generateId(),
    });
    setCurrentColor(color);
  };

  const additionalStickerProps: Partial<IStickyNoteProps> = stickyNotePropsByStep[step];

  const stackStyles = {
    ['--bgcolor']: getNextColor(currentColor),
    width: `${DEFAULT_SIZE.x}px`,
    height: `${DEFAULT_SIZE.y}px`,
    top: `${DEFAULT_POSITION.y}px`,
    left: `${DEFAULT_POSITION.x}px`,
  } as React.CSSProperties;

  const nextStepHandler = (id: TStickerId, stickerProps: IStickyNote) => {
    switch (step) {
      case Step.Create:
        setStickerProps(stickerProps);
        setStep(Step.SetSize);
        break;
      case Step.SetSize:
        createNewDummy();
        setStep(Step.Create);
        handleSave(
          stickerProps.id, 
          {
            ...stickerProps, 
            content: ''
          }
        );
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

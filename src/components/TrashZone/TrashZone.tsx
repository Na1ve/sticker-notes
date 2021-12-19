import React from 'react';
import classNames from 'classnames/bind';
import styles from './TrashZone.css';

const cx = classNames.bind(styles);

interface ITrashZoneProps {
  isVisible?: boolean;
  zone: React.RefObject<HTMLDivElement>;
}

const TrashZone: React.FC<ITrashZoneProps> = ({isVisible, zone}) => {

  return (
    <div className={cx('wrapper', {'wrapper_hidden': !isVisible})} ref={zone}>
      <h2 className={cx('caption')}>Trash Zone</h2>
      <p className={cx('tip')}>Drop the Sticker here to remove</p>
    </div>
  );
}

export {TrashZone};

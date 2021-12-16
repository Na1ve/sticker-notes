import React from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';

const cx = classNames.bind(styles);

interface IAppProps {

}

const App: React.FC<IAppProps> = (props) => {

  return (
    <div className={cx('wrapper')}>hello App</div>
  );
}

export {App};

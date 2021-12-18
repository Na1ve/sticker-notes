import React from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';

import { Desktop } from '../Desktop';

const cx = classNames.bind(styles);

interface IAppProps {

}

const App: React.FC<IAppProps> = () => {
  return (
    <Desktop />
  );
}

export {App};

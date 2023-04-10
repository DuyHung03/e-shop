import React from 'react';
import classNames from 'classnames/bind';
import styles from './Catergories.module.scss';

const cx = classNames.bind(styles);

const Catergories = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default Catergories;

import React from 'react';
import styles from './Popper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Popper = ({ children, width }) => {
    return (
        <div
            className={cx('wrapper')}
            style={{ width: width }}
        >
            {children}
        </div>
    );
};

export default Popper;

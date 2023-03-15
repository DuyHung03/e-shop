import React from 'react';
import styles from './Popper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Popper = ({ children, width, maxHeight }) => {
    return (
        <div
            className={cx('wrapper')}
            style={{ width: width, maxHeight: maxHeight }}
        >
            {children}
        </div>
    );
};

export default Popper;

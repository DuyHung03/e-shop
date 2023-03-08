import React from 'react';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

const Icon = ({ src, children }) => {
    return (
        <a href="/" className={cx('wrapper')}>
            <img src={src} alt="logo" />
            {children}
        </a>
    );
};

export default Icon;

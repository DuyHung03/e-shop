import React from 'react';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Loading = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('loading')}></div>
        </div>
    );
};

export default Loading;

import React from 'react';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';

import Header from '../components/Header/Header';

const cx = classNames.bind(styles);

const Layout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header')} />
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default Layout;

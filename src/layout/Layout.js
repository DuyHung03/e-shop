import React from 'react';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';

import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

const Layout = ({ children, isSideBar }) => {
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header')} />
            {isSideBar ? (
                <div className={cx('content')}>
                    <Sidebar />
                    {children}
                </div>
            ) : (
                <div className={cx('content')}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Layout;

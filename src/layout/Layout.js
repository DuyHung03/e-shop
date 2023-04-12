import React from 'react';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';

import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

const Layout = ({ children, isSideBar }) => {
    const contentWithSidebar = {
        width: 'calc(1200px - 240px)',
        position: 'relative',
        left: '240px',
    };
    const contentWithoutSidebar = {
        width: '1200px',
    };

    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header')} />
            {isSideBar ? (
                <div className={cx('body')}>
                    <Sidebar className={cx('sidebar')} />
                    <div
                        className={cx('content')}
                        style={contentWithSidebar}
                    >
                        {children}
                    </div>
                </div>
            ) : (
                <div className={cx('body')}>
                    <div
                        className={cx('content')}
                        style={contentWithoutSidebar}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;

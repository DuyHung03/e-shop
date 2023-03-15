import React from 'react';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames/bind';
import Icon from '../components/Icon/Icon';
import { Images } from '../assets/images';

const cx = classNames.bind(styles);

const AuthLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Icon width={60} src={Images.logo} />
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default AuthLayout;

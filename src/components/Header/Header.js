import React from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Icon from '../Icon/Icon';
import { Images } from '../../assets/images';
import SearchBox from './SearchBox/SearchBox';
import Actions from './Actions/Actions';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Icon width={60} src={Images.logo} />
                <SearchBox />
                <Actions />
            </div>
        </div>
    );
};

export default Header;

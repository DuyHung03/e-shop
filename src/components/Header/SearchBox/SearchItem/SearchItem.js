import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SearchItem = ({ src, title }) => {
    return (
        <Link to="/product">
            <div className={cx('wrapper')}>
                <img src={src} alt="img" />
                <p>{title}</p>
            </div>
        </Link>
    );
};

export default SearchItem;

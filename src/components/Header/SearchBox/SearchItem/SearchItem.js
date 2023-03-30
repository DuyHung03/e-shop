import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

const SearchItem = ({ src, title }) => {
    return (
        <div className={cx('wrapper')}>
            <img src={src} alt="img" />
            <p>{title}</p>
        </div>
    );
};

export default SearchItem;

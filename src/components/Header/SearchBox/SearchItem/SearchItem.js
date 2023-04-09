import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

const SearchItem = ({ src, title, backupSrc }) => {
    const handleErrorImage = (e) => {
        e.target.onerror = null;
        e.target.src = backupSrc;
    };
    return (
        <div className={cx('wrapper')}>
            <img
                src={src}
                alt=""
                onError={handleErrorImage}
            />
            <p>{title}</p>
        </div>
    );
};

export default SearchItem;

import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import Image from '../../../Image/Image';

const cx = classNames.bind(styles);
const SearchItem = ({ src, title, fallbackSrc }) => {
    return (
        <div className={cx('wrapper')}>
            <Image src={src} fallbackSrc={fallbackSrc} />
            <p>{title}</p>
        </div>
    );
};

export default SearchItem;

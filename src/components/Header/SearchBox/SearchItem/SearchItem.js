import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

const SearchItem = ({ src, title, fallbackSrc }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setTimeout(() => {
            setImageError(true);
        }, 5000);
    };
    return (
        <div className={cx('wrapper')}>
            {imageLoaded && !imageError ? (
                <img
                    src={src}
                    alt=""
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            ) : (
                <img src={fallbackSrc} alt="fallbackImg" />
            )}
            <p>{title}</p>
        </div>
    );
};

export default SearchItem;

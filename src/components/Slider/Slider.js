import React, { useCallback, useState } from 'react';
import Image from '../Image/Image';
import { Images } from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

/**
 * The Slider component displays a set of images and allows the user to navigate between them using
 * previous and next buttons.
 * @returns A React functional component called `Slider` is being returned. It takes two props,
 * `images` and `className`. It renders a wrapper `div` element with three child elements: two `Button`
 * components and an `Image` component. The `Button` components have click event handlers that update
 * the `currentIndex` state variable using the `setCurrentIndex` function. The `Image` component
 * displays
 */
const Slider = ({ images, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    /* These are two functions defined using the `useCallback` hook. They are used as click event
    handlers for the previous and next buttons in the `Slider` component. */
    const handlePrevClick = useCallback(() => {
        setCurrentIndex(
            currentIndex === 0
                ? images.length - 1
                : currentIndex - 1,
        );
        console.log(currentIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, setCurrentIndex]);

    const handleNextClick = useCallback(() => {
        setCurrentIndex(
            currentIndex === images.length - 1
                ? 0
                : currentIndex + 1,
        );
        console.log(currentIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, setCurrentIndex]);

    return (
        <div className={cx('wrapper', className)}>
            <Button
                onClick={handlePrevClick}
                className={cx('direct-button')}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Image
                className={cx('image')}
                src={images[currentIndex]}
                fallbackSrc={Images.noProductImage}
                alt=""
            />
            <Button
                onClick={handleNextClick}
                className={cx('direct-button')}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
        </div>
    );
};

export default Slider;

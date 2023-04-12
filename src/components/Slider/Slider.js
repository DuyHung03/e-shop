import React, { useState } from 'react';
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
    /* This code is defining a state variable `currentIndex` and a function `setCurrentIndex` to update
    it using the `useState` hook. The initial value of `currentIndex` is set to 0. */
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex(
            currentIndex === 0
                ? images.length - 1
                : currentIndex - 1,
        );
        console.log(currentIndex);
    };

    const handleNextClick = () => {
        setCurrentIndex(
            currentIndex === images.length - 1
                ? 0
                : currentIndex + 1,
        );
        console.log(currentIndex);
    };

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

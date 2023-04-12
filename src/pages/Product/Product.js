import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import { AppContext } from '../../context/AppProvider';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartPlus,
    faPlus,
    faSubtract,
} from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import Slider from '../../components/Slider/Slider';
import { Images } from '../../assets/images';
const cx = classNames.bind(styles);

const Product = () => {
    const { currentProduct, setCurrentProduct } =
        useContext(AppContext);

    /* This is a React hook called `useEffect` that is used to perform side effects in a functional
    component. In this case, it is retrieving the `currentProduct` item from local storage, parsing
    it as JSON, and setting it as the current product using the `setCurrentProduct` function from
    the `AppContext` context. The empty array `[]` as the second argument to `useEffect` means that
    this effect will only run once, when the component mounts. */
    useEffect(() => {
        const productItem = JSON.parse(
            localStorage.getItem('currentProduct' || ''),
        );
        setCurrentProduct(productItem);
        console.log(currentProduct.images);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [quantity, setQuantity] = useState(1);

    return (
        <div className={cx('wrapper')}>
            <Slider
                images={
                    !currentProduct.images
                        ? Images.noProductImage
                        : currentProduct.images
                }
                className={cx('slider')}
            />

            <div className={cx('information')}>
                <div className={cx('name')}>
                    {currentProduct.title}
                    <p>{currentProduct.description}</p>
                </div>

                <div className={cx('quantity')}>
                    <Button>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <p>{quantity}</p>
                    <Button>
                        <FontAwesomeIcon
                            icon={faSubtract}
                        />
                    </Button>
                </div>

                <div className={cx('handler')}>
                    <Button
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faCreditCard}
                            />
                        }
                    >
                        Buy now
                    </Button>
                    <Button
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faCartPlus}
                            />
                        }
                    >
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Product;

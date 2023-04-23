import React, {
    useCallback,
    useContext,
    useEffect,
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
import { addDocs } from '../../firebase/addDocs';
import { AuthContext } from '../../context/AuthProvider';
const cx = classNames.bind(styles);

const Product = () => {
    const {
        currentProduct,
        setCurrentProduct,
        quantity,
        setQuantity,
    } = useContext(AppContext);

    const { user } = useContext(AuthContext);

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

    //Handle increase and decrease quantity in product page
    const handleIncrease = useCallback(() => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        console.log(quantity);
    }, [setQuantity, quantity]);

    const handleDecrease = useCallback(() => {
        setQuantity((prevQuantity) =>
            prevQuantity > 1 ? prevQuantity - 1 : 1,
        );
        console.log(quantity);
    }, [setQuantity, quantity]);

    /* `handleAddToCart` is a function that is called when the user clicks on the "Add to cart"
    button. It checks if there is a logged-in user and if so, it adds the current product along
    with the selected quantity to the user's cart in the Firestore database using the `addDocs`
    function. If there is no logged-in user, it redirects the user to the login page. */
    const handleAddToCart = () => {
        if (user) {
            addDocs('cart', {
                user: user.uid,
                currentProduct,
                quantity: quantity,
            });
        }
    };

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
                    <p>Quantity: </p>
                    <Button
                        className={cx('increase')}
                        onClick={handleIncrease}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <span>{quantity}</span>
                    <Button
                        className={cx('decrease')}
                        onClick={handleDecrease}
                    >
                        <FontAwesomeIcon
                            icon={faSubtract}
                        />
                    </Button>
                </div>

                <div className={cx('handler')}>
                    <Button
                        to={!user ? '/login' : ''}
                        onClick={handleAddToCart}
                        className={cx('add-cart-btn')}
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faCartPlus}
                            />
                        }
                    >
                        Add to cart
                    </Button>
                    <Button
                        className={cx('pay-btn')}
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faCreditCard}
                            />
                        }
                    >
                        Buy now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Product;

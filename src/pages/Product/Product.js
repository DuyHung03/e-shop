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
import {
    collection,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { message } from 'antd';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Handle increase and decrease quantity in product page
    const handleIncrease = useCallback(() => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }, [setQuantity]);

    const handleDecrease = useCallback(() => {
        setQuantity((prevQuantity) =>
            prevQuantity > 1 ? prevQuantity - 1 : 1,
        );
    }, [setQuantity]);

    //*Notification antd
    const [messageApi, contextHolder] =
        message.useMessage();
    const showMessage = () => {
        messageApi.open({
            type: 'success',
            duration: 2,
            content: 'Add Successfully!',
        });
    };

    /**
     * This function adds a product to the user's cart in a Firestore database, updating the quantity
     * if the product is already in the cart.
     */
    const handleAddToCart = async () => {
        if (user) {
            const querySnapshot = await getDocs(
                query(
                    //query user and product existed
                    collection(db, 'cart'),
                    where('user', '==', user.uid),
                    where(
                        'product.id',
                        '==',
                        currentProduct.id,
                    ),
                ),
            );
            if (querySnapshot.size > 0) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
                    quantity:
                        quantity +
                        querySnapshot.docs[0].data()
                            .quantity,
                });
                showMessage();
                console.log('updated');
            } else {
                await addDocs('cart', {
                    user: user.uid,
                    product: currentProduct,
                    quantity: quantity,
                });
                showMessage();
                console.log('addDocs');
            }
        }
    };

    return (
        <>
            {contextHolder}
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
                            <FontAwesomeIcon
                                icon={faPlus}
                            />
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
        </>
    );
};

export default Product;

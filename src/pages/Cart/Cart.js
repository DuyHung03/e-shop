import { Suspense, lazy, useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Image from '../../components/Image/Image';
import { Images } from '../../assets/images';
import { Skeleton } from 'antd';
const CartItem = lazy(() =>
    import('../../components/CartItem/CartItem'),
);

const cx = classNames.bind(styles);

const Cart = () => {
    const { cart, total, selected } =
        useContext(AppContext);

    //change number to words
    const numberToWords = require('number-to-words');
    let priceInWords = numberToWords.toWords(total);

    // const handleSelectAll = () => {};

    return (
        <div className={cx('wrapper')}>
            {cart.length > 0 ? (
                cart.map((prd) => {
                    return (
                        <Suspense
                            key={prd.id}
                            fallback={
                                <Skeleton.Input
                                    block
                                    active
                                />
                            }
                        >
                            <CartItem productData={prd} />
                        </Suspense>
                    );
                })
            ) : (
                <div className={cx('empty')}>
                    <Image src={Images.emptyBox} />
                    <p>
                        There aren't any products in your
                        cart!!!
                    </p>
                </div>
            )}
            <div className={cx('control-board')}>
                {/* <label
                    htmlFor="select-all"
                    onClick={handleSelectAll}
                >
                    <input
                        checked={isChecked}
                        type="checkbox"
                        id="select-all"
                    />
                    Select all products({cart.length})
                </label> */}
                <p>
                    Total ({selected}):{'  '}
                    <b>
                        {Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(total)}
                    </b>
                    <span>
                        {priceInWords !== 'zero' &&
                            `(${priceInWords} dollar(s))`}
                    </span>
                </p>
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
    );
};

export default Cart;

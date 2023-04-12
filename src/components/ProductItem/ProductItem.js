import React, { Suspense, lazy } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Images } from '../../assets/images';
const Image = lazy(() => import('../Image/Image'));
const cx = classNames.bind(styles);

const ProductItem = ({ product }) => {
    return (
        <div className={cx('wrapper')}>
            <Suspense
                fallback={
                    <img
                        alt=""
                        src={Images.noProductImage}
                    />
                }
            >
                <Image
                    src={product.images[0]}
                    fallbackSrc={Images.noProductImage}
                    className={cx('image')}
                />
            </Suspense>
            <p className={cx('name')}>{product.title}</p>
            <span className={cx('price')}>
                $ {product.price}
            </span>
        </div>
    );
};

export default ProductItem;

import React, { Suspense, lazy } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Images } from '../../assets/images';
import {
    ErrorBoundary,
    withErrorBoundary,
} from 'react-error-boundary';
import ErrorComponent from '../ErrorBoundary/ErrorBoundary';
import { Skeleton } from 'antd';
const Image = lazy(() => import('../Image/Image'));

const cx = classNames.bind(styles);

const ProductItem = ({ product }) => {
    return (
        <div className={cx('wrapper')}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <Suspense
                    fallback={<Skeleton.Image active />}
                >
                    <Image
                        src={product.images[0]}
                        fallbackSrc={Images.noProductImage}
                        className={cx('image')}
                    />
                </Suspense>
            </ErrorBoundary>
            <p className={cx('name')}>{product.title}</p>
            <span className={cx('price')}>
                $ {product.price}
            </span>
        </div>
    );
};

export default withErrorBoundary(ProductItem, {
    FallbackComponent: ErrorComponent,
});

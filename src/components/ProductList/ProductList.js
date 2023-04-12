import React, { Suspense, lazy, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import ProductItem from '../ProductItem/ProductItem';
import { AppContext } from '../../context/AppProvider';
const Paginate = lazy(() =>
    import('../Pagination/Pagination'),
);

const cx = classNames.bind(styles);

/**
 * The ProductList component renders a list of products and a pagination component.
 * @returns A React functional component that renders a list of products with links to their individual
 * pages and a pagination component. The component receives two props: `data` and `cutData`, which are
 * arrays of product objects. It also uses the `useContext` hook to access the
 * `handleSetCurrentProduct` function and `pageSize` value from the AppContext.
 */
const ProductList = ({ data, cutData }) => {
    const { handleSetCurrentProduct, pageSize } =
        useContext(AppContext);
    return (
        <>
            <div className={cx('wrapper')}>
                {cutData.map((prd) => (
                    <Link
                        key={prd.id}
                        to={`/product/${prd.id}/${prd.title}`}
                        onClick={() =>
                            handleSetCurrentProduct(prd)
                        }
                    >
                        <ProductItem product={prd} />
                    </Link>
                ))}
            </div>
            <Suspense fallback={<div>...</div>}>
                <Paginate
                    className={cx('pagination')}
                    data={data}
                    pageSize={pageSize}
                />
            </Suspense>
        </>
    );
};

export default ProductList;

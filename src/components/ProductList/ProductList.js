import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
import { AppContext } from '../../context/AppProvider';

const ProductList = ({ data }) => {
    const { handleSetCurrentProduct } =
        useContext(AppContext);
    return (
        <div>
            {data.map((prd) => (
                <Link
                    key={prd.id}
                    to={`/product/${prd.id}/${prd.title}`}
                    onClick={() =>
                        handleSetCurrentProduct(prd)
                    }
                >
                    <ProductItem
                        id={prd.id}
                        name={prd.title}
                    />
                </Link>
            ))}
        </div>
    );
};

export default ProductList;

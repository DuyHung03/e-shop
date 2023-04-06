import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppProvider';

const Product = () => {
    const { currentProduct, setCurrentProduct } =
        useContext(AppContext);

    useEffect(() => {
        const productItem = JSON.parse(
            localStorage.getItem('currentProduct'),
        );
        setCurrentProduct(productItem);
        console.log(currentProduct);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {currentProduct.id} : {currentProduct.title}
        </div>
    );
};

export default Product;

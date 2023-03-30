import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

const Product = () => {
    const { currentProduct } = useContext(AppContext);

    return (
        <div>
            {currentProduct.id} : {currentProduct.title}
        </div>
    );
};

export default Product;

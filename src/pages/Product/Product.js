import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppProvider';

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

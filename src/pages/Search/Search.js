import React, { Suspense, lazy, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';
const ProductItem = lazy(() =>
    import('../../components/ProductItem/ProductItem'),
);

const Search = () => {
    const {
        searchAllResult,
        setSearchAllResult,
        handleSetCurrentProduct,
    } = useContext(AppContext);

    /* This is a React hook called `useEffect` that is used to perform side effects in functional
    components. In this case, it is used to retrieve the `currentProduct` item from local storage
    and set it as the current product in the app context using the `setCurrentProduct` function. The
    empty array `[]` as the second argument to `useEffect` means that this effect will only run once
    when the component mounts. The `console.log(currentProduct)` statement is used to log the
    current product to the console for debugging purposes. */

    useEffect(() => {
        const allProduct = JSON.parse(
            localStorage.getItem('searchAllResult'),
        );
        setSearchAllResult(allProduct);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {searchAllResult.map((prd) => (
                <Suspense
                    fallback={<div>Loading...</div>}
                    key={prd.id}
                >
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
                </Suspense>
            ))}
        </div>
    );
};

export default Search;

import React, { Suspense, lazy, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
const ProductList = lazy(() =>
    import('../../components/ProductList/ProductList'),
);

const Search = () => {
    const {
        searchAllResult,
        setSearchAllResult,
        currentProducts,
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
            {!searchAllResult.length > 0 ? (
                <div>Cannot found products</div>
            ) : (
                <>
                    <Suspense
                        fallback={<div>Loading...</div>}
                    >
                        <ProductList
                            cutData={currentProducts(
                                searchAllResult,
                            )}
                            data={searchAllResult}
                        />
                    </Suspense>
                </>
            )}
        </div>
    );
};

export default Search;

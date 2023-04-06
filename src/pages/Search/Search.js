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

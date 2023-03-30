import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';

const Search = () => {
    const {
        searchResult,
        isLoadingProduct,
        setCurrentProduct,
    } = useContext(AppContext);
    return (
        <div>
            {isLoadingProduct ? (
                <div>Loading...</div>
            ) : (
                searchResult.map((prd) => (
                    <Link
                        key={prd.id}
                        to={`/product/${prd.id}/${prd.title}`}
                        onClick={setCurrentProduct(prd)}
                    >
                        <div>
                            {prd.id}:{prd.title}
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default Search;

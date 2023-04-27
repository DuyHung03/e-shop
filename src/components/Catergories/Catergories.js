import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Catergories.module.scss';
import { Link } from 'react-router-dom';
import getProductFromCatergory from '../../services/getProductFromCatergory';
import { AppContext } from '../../context/AppProvider';

const cx = classNames.bind(styles);

const Catergories = ({ catergoryData, children }) => {
    const {
        setSearchAllResult,
        currentPage,
        setCurrentPage,
    } = useContext(AppContext);
    /**
     * This function sets the current page to 1, retrieves products from a category using an API call,
     * sets the search results to the retrieved products, and saves the results to local storage if there are any.
     */
    const handlegetPrdFromCatergory = async () => {
        setCurrentPage(1);
        const res = await getProductFromCatergory(
            catergoryData.id,
            currentPage,
        );
        setSearchAllResult(res);
        if (res.length > 0) {
            localStorage.setItem(
                'searchAllResult',
                JSON.stringify(res),
            );
        }
    };
    return (
        <Link
            to={`/search/catergoryId=${catergoryData.name}`}
            onClick={handlegetPrdFromCatergory}
        >
            <div className={cx('wrapper')}>{children}</div>
        </Link>
    );
};

export default Catergories;

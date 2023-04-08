import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBox.module.scss';
import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Popper from '../../Popper/Popper';
import SearchItem from './SearchItem/SearchItem';
import { AppContext } from '../../../context/AppProvider';
import { Link } from 'react-router-dom';
import searchProduct from '../../../services/searchProduct';

const cx = classNames.bind(styles);

const SearchBox = () => {
    const {
        searchValue,
        showResult,
        searchResult,
        handleHideResult,
        handleShowResult,
        handleInputValue,
        handleClearValue,
        debounce,
        loading,
        inputRef,
        setShowResult,
        setSearchAllResult,
        handleSetCurrentProduct,
    } = useContext(AppContext);

    /**
     * This function handles a search by keyword, sets loading and result states, calls an API to
     * search for products, stores the result in local storage, and updates the loading and result
     * states accordingly.
     */
    const handleSearchByKeyword = async () => {
        setShowResult(false);
        const res = await searchProduct(debounce);
        console.log(res);
        setSearchAllResult(res);
        localStorage.setItem(
            'searchAllResult',
            JSON.stringify(res),
        );
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={
                    debounce && showResult ? true : false
                }
                placement="bottom-start"
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div
                        className="box"
                        tabIndex="-1"
                        {...attrs}
                    >
                        {!searchResult.length > 0 ? (
                            <Popper width={316}>
                                <span>
                                    No products found "
                                    {searchValue}"
                                </span>
                            </Popper>
                        ) : (
                            <Popper
                                width={316}
                                maxHeight={390}
                            >
                                {searchResult.map(
                                    (item) => (
                                        <Link
                                            key={item.id}
                                            to={`/product/${item.id}/${item.title}`}
                                            onClick={() =>
                                                handleSetCurrentProduct(
                                                    item,
                                                )
                                            }
                                        >
                                            <SearchItem
                                                src={
                                                    item
                                                        .images[0]
                                                }
                                                title={
                                                    item.title
                                                }
                                            />
                                        </Link>
                                    ),
                                )}
                            </Popper>
                        )}
                    </div>
                )}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('search')}>
                        <input
                            ref={inputRef}
                            value={searchValue}
                            placeholder="Search product's name..."
                            onChange={handleInputValue}
                            onFocus={handleShowResult}
                        />
                        {!!searchValue && (
                            <button
                                className={cx('clear')}
                                onClick={handleClearValue}
                            >
                                <FontAwesomeIcon
                                    icon={faXmarkCircle}
                                />
                            </button>
                        )}
                        {loading && (
                            <button
                                className={cx('loading')}
                            >
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                />
                            </button>
                        )}
                        <Button
                            className={cx('search-button')}
                            to={
                                searchValue
                                    ? `/search/q=${searchValue}`
                                    : ''
                            }
                            onClick={
                                searchValue
                                    ? handleSearchByKeyword
                                    : null
                            }
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                            />
                        </Button>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default SearchBox;

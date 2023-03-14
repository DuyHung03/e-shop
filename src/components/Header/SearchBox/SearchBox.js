import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBox.module.scss';
import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Popper from '../../Popper/Popper';
import SearchItem from './SearchItem/SearchItem';
import { AppContext } from '../../../context/AppProvider';

const cx = classNames.bind(styles);

const SearchBox = () => {
    const {
        searchValue,
        showResult,
        searchResult,
        handleHideResult,
        handleShowResult,
        handleInputValue,
        debounce,
    } = useContext(AppContext);

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
                        {!searchResult.length ? (
                            <Popper width={316}>
                                <span>
                                    No products found "
                                    {searchValue}"
                                </span>
                            </Popper>
                        ) : (
                            <Popper
                                width={316}
                                height={370}
                            >
                                {searchResult.map(
                                    (item) => (
                                        <SearchItem
                                            key={item.id}
                                            src={
                                                item
                                                    .images[0]
                                            }
                                            title={
                                                item.title
                                            }
                                        />
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
                            value={searchValue}
                            placeholder="Search..."
                            onChange={handleInputValue}
                            onFocus={handleShowResult}
                        />
                        <Button
                            className={cx('search-button')}
                            to="/search"
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

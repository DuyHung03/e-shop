import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBox.module.scss';
import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Popper from '../../Popper/Popper';

const cx = classNames.bind(styles);

const SearchBox = () => {
    return (
        <>
            <HeadlessTippy
                render={(attrs) => (
                    <div
                        className="box"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <Popper></Popper>
                    </div>
                )}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('search')}>
                        <input placeholder="Search..." />
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
        </>
    );
};

export default SearchBox;

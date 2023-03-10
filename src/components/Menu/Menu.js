/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '../Popper/Popper';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase/firebase';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '../../context/AuthProvider';

const cx = classNames.bind(styles);

const Menu = ({ children }) => {
    //*GET FNS FROM AUTHCONTEXT
    const { navigate, setUser } = useContext(AuthContext);

    const handleLogOut = () => {
        auth.signOut();
        navigate('/');
        setUser();
        console.log('logout');
    };

    const renderMenu = (attrs) => {
        return (
            <div className="box" tabIndex="-1" {...attrs}>
                <Popper width={180}>
                    <Button
                        className={cx('user-info-button')}
                        to="/user"
                        menuType
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faUser}
                            />
                        }
                    >
                        My account
                    </Button>
                    <Button
                        className={cx('logout-button')}
                        menuType
                        onClick={handleLogOut}
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                            />
                        }
                    >
                        Log Out
                    </Button>
                </Popper>
            </div>
        );
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                // visible
                placement="bottom-end"
                delay={[0, 300000]}
                render={renderMenu}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
};

export default Menu;

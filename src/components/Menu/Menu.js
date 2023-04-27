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
import { AppContext } from '../../context/AppProvider';

const cx = classNames.bind(styles);

const Menu = ({ children }) => {
    //*GET FNS FROM AUTHCONTEXT
    const { navigate, user, setUser } =
        useContext(AuthContext);

    const { setSearchValue } = useContext(AppContext);

    const handleLogOut = async () => {
        await auth.signOut();
        navigate('/');
        setUser();
        setSearchValue('');
        console.log('logout');
    };

    const renderMenu = (attrs) => {
        return (
            <div className="box" tabIndex="-1" {...attrs}>
                <Popper width={180}>
                    <Button
                        className={cx('user-info-button')}
                        to={`/user/${user.uid}`}
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
                delay={[0, 300]}
                render={renderMenu}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
};

export default Menu;

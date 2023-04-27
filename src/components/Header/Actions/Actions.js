import React, { useCallback, useContext } from 'react';
import styles from './Actions.module.scss';
import classNames from 'classnames/bind';

import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AuthProvider';
import Menu from '../../Menu/Menu';
import { Images } from '../../../assets/images';
import { AppContext } from '../../../context/AppProvider';
import { Badge, Tooltip } from 'antd';

const cx = classNames.bind(styles);

const Actions = () => {
    const { user } = useContext(AuthContext);
    const { cart } = useContext(AppContext);

    const getTotalQuantity = useCallback((cart = []) => {
        let totalQuantity = 0;
        cart.forEach((prd) => {
            totalQuantity += prd.quantity;
        });
        return totalQuantity;
    }, []);

    const totalQuantity = getTotalQuantity(cart);

    return (
        <div className={cx('wrapper')}>
            {user ? (
                <Menu>
                    <span>
                        <Button
                            to={`/user/${user.uid}`}
                            className={cx('user-button')}
                            rightIcon={
                                <img
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition:
                                            'contain',
                                    }}
                                    src={
                                        !user.photoURL
                                            ? Images.noUserImage
                                            : user.photoURL
                                    }
                                    alt="user"
                                />
                            }
                        >
                            {user.displayName}
                        </Button>
                    </span>
                </Menu>
            ) : (
                <Tooltip
                    title="Log in"
                    placement="bottomRight"
                    mouseEnterDelay={1}
                >
                    <Button
                        className={cx('log-button')}
                        actionType
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faRightToBracket}
                            />
                        }
                        to="/login"
                    >
                        LogIn
                    </Button>
                </Tooltip>
            )}
            <Tooltip
                title="Cart"
                placement="bottomRight"
                mouseEnterDelay={1}
            >
                <Badge count={totalQuantity}>
                    <Button
                        className={cx('cart-button')}
                        actionType
                        //* CHECK USER LOGGED IN
                        to={
                            !user
                                ? '/login'
                                : `/cart/${user.uid}`
                        }
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faCartShopping}
                            />
                        }
                    ></Button>
                </Badge>
            </Tooltip>
        </div>
    );
};

export default Actions;

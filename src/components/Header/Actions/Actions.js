import React, { useContext } from 'react';
import styles from './Actions.module.scss';
import classNames from 'classnames/bind';

import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
    faCartShopping,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AuthProvider';

const cx = classNames.bind(styles);

const Actions = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className={cx('wrapper')}>
            {user ? (
                <Button to="/user">
                    <FontAwesomeIcon icon={faUser} />
                </Button>
            ) : (
                <Button
                    className={cx('log-button')}
                    leftIcon={
                        <FontAwesomeIcon
                            icon={faRightToBracket}
                        />
                    }
                    to="/login"
                >
                    LogIn
                </Button>
            )}
            <Button
                to="/cart"
                leftIcon={
                    <FontAwesomeIcon
                        icon={faCartShopping}
                    />
                }
            />
        </div>
    );
};

export default Actions;

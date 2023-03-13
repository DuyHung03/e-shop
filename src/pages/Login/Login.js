import React, { useContext } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Images } from '../../assets/images';
import Button from '../../components/Button/Button';
import {
    faEye,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../context/AppProvider';

const cx = classNames.bind(styles);

const Login = () => {
    const { handleGoogleLogin, handleFacebookLogin } =
        useContext(AppContext);

    const handleShowPassword = () => {};

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-login')}>
                <label>
                    Email:
                    <input type="email" />
                </label>
                <label>
                    Password:
                    <span className={cx('password')}>
                        <input
                            id="password"
                            type="password"
                        />
                        <Button
                            onClick={handleShowPassword}
                            className={cx('show-pw-btn')}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                    </span>
                </label>
                <Button
                    leftIcon={
                        <FontAwesomeIcon
                            icon={faRightToBracket}
                        />
                    }
                >
                    LogIn
                </Button>
            </div>
            <div className={cx('others-login')}>
                <Button
                    onClick={handleGoogleLogin}
                    leftIcon={
                        <img
                            src={Images.googleLogo.default}
                            alt="gglogo"
                        />
                    }
                >
                    Login with Google
                </Button>
                <Button
                    onClick={handleFacebookLogin}
                    leftIcon={
                        <img
                            src={
                                Images.facebookLogo.default
                            }
                            alt="fblogo"
                        />
                    }
                >
                    Login with Facebook
                </Button>
            </div>
        </div>
    );
};

export default Login;

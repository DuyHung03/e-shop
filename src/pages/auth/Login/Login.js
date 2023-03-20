import React, { useContext, useState } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import validator from 'validator';

import { Images } from '../../../assets/images';
import Button from '../../../components/Button/Button';
import {
    faEye,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../../context/AppProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { AuthContext } from '../../../context/AuthProvider';
import ModalResetPassword from './ModalResetPassword/ModalResetPassword';

const cx = classNames.bind(styles);

const Login = () => {
    const {
        handleGoogleLogin,
        handleFacebookLogin,
        setIsOpenModal,
    } = useContext(AppContext);

    const { navigate } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        const email = e.target.value;
        e.preventDefault();
        setEmail(validator.trim(email));
    };

    const handlePassword = (e) => {
        const password = e.target.value;
        e.preventDefault();
        setPassword(validator.trim(password));
    };

    const handlePasswordLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    navigate('/');
                }
                console.log(user);
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    };

    const handleOpenModalResetPassword = () => {
        setIsOpenModal(true);
    };

    const handleShowPassword = () => {};

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-login')}>
                <label>
                    Email:
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </label>
                <label>
                    Password:
                    <span className={cx('password')}>
                        <input
                            required
                            maxLength={30}
                            type="password"
                            value={password}
                            onChange={handlePassword}
                        />
                        <Button
                            id="show-pw"
                            onClick={handleShowPassword}
                            className={cx('show-pw-btn')}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                    </span>
                </label>
                <div className={cx('others-func')}>
                    <p
                        className={cx('reset-pw-btn')}
                        onClick={
                            handleOpenModalResetPassword
                        }
                    >
                        Forgot password?
                    </p>

                    <span>
                        <Button
                            to="/sign-up-form"
                            className={cx('sign-up')}
                        >
                            Create new account
                        </Button>
                    </span>
                </div>
                <Button
                    onClick={handlePasswordLogin}
                    className={cx('login-btn')}
                    leftIcon={
                        <FontAwesomeIcon
                            icon={faRightToBracket}
                        />
                    }
                >
                    LogIn
                </Button>
            </form>
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
            <ModalResetPassword />
        </div>
    );
};

export default Login;

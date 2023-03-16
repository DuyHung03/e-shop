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

const cx = classNames.bind(styles);

const Login = () => {
    const { handleGoogleLogin, handleFacebookLogin } =
        useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        const email = e.target.value;
        e.preventDefault();
        setEmail(validator.trim(email));
        console.log(email);
    };

    const handlePassword = (e) => {
        const password = e.target.value;
        e.preventDefault();
        setPassword(validator.trim(password));
        console.log(password);
    };

    const handlePasswordLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleShowPassword = () => {
        const openEye = document.getElementById('show-pw');
        const passwordInput =
            document.getElementsByClassName();
        console.log(openEye, passwordInput);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-login')}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </label>
                <label>
                    Password:
                    <span className={cx('password')}>
                        <input
                            id="password"
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

                <span>
                    <Button
                        to="/sign-up-form"
                        className={cx('sign-up')}
                    >
                        Create new account
                    </Button>
                </span>
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

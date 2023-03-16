import React, { useContext, useState } from 'react';
import styles from './SignUpForm.module.scss';
import validator from 'validator';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { AuthContext } from '../../../context/AuthProvider';

const cx = classNames.bind(styles);

const SignUpForm = () => {
    const { navigate } = useContext(AuthContext);

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

    const handleCreateAccountWithEmail = () => {
        createUserWithEmailAndPassword(
            auth,
            email,
            password,
        )
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                user
                    ? navigate('/login')
                    : alert('Unidentify Error');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Sign Up</h1>
            <div className={cx('form-section')}>
                <label>
                    Email:
                    <input
                        value={email}
                        type="email"
                        onChange={handleEmail}
                    />
                </label>
                <label>
                    Password:
                    <input
                        maxLength={25}
                        value={password}
                        type="password"
                        onChange={handlePassword}
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        maxLength={25}
                        value={password}
                        type="password"
                        onChange={handlePassword}
                    />
                </label>
                <Button
                    onClick={handleCreateAccountWithEmail}
                    className={cx('sign-up-btn')}
                    leftIcon={
                        <FontAwesomeIcon
                            icon={faRightToBracket}
                        />
                    }
                >
                    Sign Up
                </Button>
            </div>

            <p>Already have account ?</p>
        </div>
    );
};

export default SignUpForm;

import React, { useContext } from 'react';
import styles from './SignUpForm.module.scss';
import validator from 'validator';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import { Link, redirect } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

const cx = classNames.bind(styles);

const SignUpForm = () => {
    const {
        setEmail,
        setPassword,
        setName,
        email,
        password,
        name,
        setUser,
        navigate,
    } = useContext(AuthContext);

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
    const handleName = (e) => {
        const name = e.target.value;
        if (!name.startsWith(' ')) {
            setName(name);
        }
    };

    const handleCreateAccountWithEmail = () => {
        if ((email, password, name)) {
            createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )
                .then((userCredential) => {
                    updateProfile(userCredential.user, {
                        displayName: name,
                    });
                    console.log(userCredential.user);
                    navigate('/login');
                })

                .catch((error) => {
                    alert(error);
                    console.log('Loi', error);
                });
        } else {
            alert('Error Empty Infomations');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-section')}>
                <label>
                    Email:
                    <input
                        required
                        value={email}
                        type="email"
                        onChange={handleEmail}
                    />
                </label>
                <label>
                    Name:
                    <input
                        required
                        value={name}
                        type="text"
                        onChange={handleName}
                    />
                </label>
                <label>
                    Password:
                    <input
                        required
                        maxLength={25}
                        value={password}
                        type="password"
                        onChange={handlePassword}
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        required
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
            </form>

            <Link to="/login">Already have account ?</Link>
        </div>
    );
};
export default SignUpForm;

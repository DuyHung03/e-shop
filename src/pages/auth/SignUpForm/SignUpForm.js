import React, { useContext } from 'react';
import styles from './SignUpForm.module.scss';
import validator from 'validator';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context/AppProvider';

const cx = classNames.bind(styles);

const SignUpForm = () => {
    const {
        setEmail,
        setPassword,
        setName,
        email,
        password,
        name,
        handleCreateAccountWithEmail,
    } = useContext(AppContext);

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

    return (
        <div className={cx('wrapper')}>
            <h1>Sign Up</h1>
            <div className={cx('form-section')}>
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
            </div>

            <Link to="/login">Already have account ?</Link>
        </div>
    );
};
export default SignUpForm;

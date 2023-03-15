import React from 'react';
import styles from './SignUpForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SignUpForm = () => {
    return (
        <div className={cx('wrapper')}>
            <h1>Sign Up</h1>
            <div className={cx('form-section')}>
                <label>
                    Email:
                    <input />
                </label>
                <label>
                    Email:
                    <input />
                </label>
                <label>
                    Email:
                    <input />
                </label>
            </div>
        </div>
    );
};

export default SignUpForm;

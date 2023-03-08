import React from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import Icon from '../../components/Icon/Icon';
import { Images } from '../../assets/images';
import Button from '../../components/Button/Button';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const cx = classNames.bind(styles);

const ggProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const Login = () => {
    const handleGoogleLogin = () => {
        signInWithPopup(auth, ggProvider)
            .then((result) => {
                // const credential =
                //     GoogleAuthProvider.credentialFromResult(
                //         result,
                //     );
                // const token = credential.accessToken;
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential =
                //     GoogleAuthProvider.credentialFromError(
                //         error,
                //     );
                // ...
                console.log(
                    'Error Code: ',
                    errorCode,
                    errorMessage,
                    email,
                    // credential,
                );
            });
    };
    const handleFacebookLogin = () => {
        signInWithPopup(auth, fbProvider)
            .then((result) => {
                // const credential =
                //     GoogleAuthProvider.credentialFromResult(
                //         result,
                //     );
                // const token = credential.accessToken;
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential =
                //     GoogleAuthProvider.credentialFromError(
                //         error,
                //     );
                // ...
                console.log(
                    'Error Code: ',
                    errorCode,
                    errorMessage,
                    email,
                    // credential,
                );
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <input />
                <input />
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
            <div>
                <Button onClick={handleGoogleLogin}>
                    <Icon src={Images.googleLogo.default}>
                        Login with Google
                    </Icon>
                </Button>
                <Button onClick={handleFacebookLogin}>
                    <Icon src={Images.facebookLogo.default}>
                        Login with Facebook
                    </Icon>
                </Button>
            </div>
        </div>
    );
};

export default Login;

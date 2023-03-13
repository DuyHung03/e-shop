import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import React, { createContext } from 'react';
import { auth } from '../firebase/firebase';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const ggProvider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

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
        <AppContext.Provider
            value={{
                handleFacebookLogin,
                handleGoogleLogin,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

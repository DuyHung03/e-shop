import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import React, {
    createContext,
    useEffect,
    useState,
} from 'react';
import { auth } from '../firebase/firebase';
import useDebounce from '../hooks/useDebounce';
import searchProduct from '../services/searchProduct';

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

    const [showResult, setShowResult] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const debounce = useDebounce(searchValue, 500);

    const handleInputValue = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue.trim());
        setShowResult(true);
        console.log(searchValue);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleShowResult = () => {
        setShowResult(true);
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const callAPI = async () => {
            const res = await searchProduct(debounce);
            console.log(res);
            setSearchResult(res);
        };

        callAPI();
    }, [debounce]);

    return (
        <AppContext.Provider
            value={{
                handleFacebookLogin,
                handleGoogleLogin,
                handleHideResult,
                handleShowResult,
                handleInputValue,
                showResult,
                searchResult,
                searchValue,
                debounce,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

import {
    FacebookAuthProvider,
    getAdditionalUserInfo,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import React, {
    createContext,
    // useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { addDocs } from '../firebase/addDocs';
import { auth } from '../firebase/firebase';
import useDebounce from '../hooks/useDebounce';
import searchProduct from '../services/searchProduct';
// import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const ggProvider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

    const handleGoogleLogin = async () => {
        await signInWithPopup(auth, ggProvider)
            .then((userCredential) => {
                const user = userCredential.user;
                const { isNewUser } =
                    getAdditionalUserInfo(userCredential);
                if (isNewUser) {
                    addDocs('user', {
                        displayName: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL,
                        phoneNumber: user.phoneNumber,
                        providerID: user.providerId,
                    });
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;

                console.log(
                    'Error Code: ',
                    errorCode,
                    errorMessage,
                    email,
                );
            });
    };
    const handleFacebookLogin = async () => {
        await signInWithPopup(auth, fbProvider)
            .then((userCredential) => {
                const { isNewUser } =
                    getAdditionalUserInfo(userCredential);
                const user = userCredential.user;
                if (isNewUser) {
                    addDocs('user', {
                        displayName: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL,
                        phoneNumber: user.phoneNumber,
                        providerID: user.providerId,
                    });
                }
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

    const [loading, setLoading] = useState(true);

    const debounce = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleInputValue = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
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
            setLoading(false);
            return;
        }

        setLoading(true);

        const callAPI = async () => {
            setLoading(true);
            const res = await searchProduct(debounce);
            console.log(res);
            setSearchResult(res);
            setLoading(false);
        };

        callAPI();
    }, [debounce]);

    const handleClearValue = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <AppContext.Provider
            value={{
                handleFacebookLogin,
                handleGoogleLogin,
                handleHideResult,
                handleShowResult,
                handleInputValue,
                handleClearValue,
                setSearchValue,
                setIsOpenModal,

                showResult,
                isOpenModal,
                searchResult,
                searchValue,
                debounce,
                loading,
                inputRef,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

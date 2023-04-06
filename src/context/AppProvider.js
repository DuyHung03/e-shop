import {
    FacebookAuthProvider,
    getAdditionalUserInfo,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import React, {
    createContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { addDocs } from '../firebase/addDocs';
import { auth } from '../firebase/firebase';
import useDebounce from '../hooks/useDebounce';
import searchProduct from '../services/searchProduct';

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
                        providerID:
                            user.providerData[0].providerId,
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
                        providerID:
                            user.providerData[0].providerId,
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
    const [searchAllResult, setSearchAllResult] = useState(
        [],
    );

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
            const res = await searchProduct(debounce, 10);
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

    //*SET PRODUCT ITEM

    const [currentProduct, setCurrentProduct] = useState(
        localStorage.getItem('currentProduct' || ''),
    );

    const [isLoadingProduct, setIsLoadingProduct] =
        useState(true);

    const handleSetCurrentProduct = (prd) => {
        setCurrentProduct(prd);
        setShowResult(false);
        localStorage.setItem(
            'currentProduct',
            JSON.stringify(prd),
        );
    };

    const [showProduct, setShowProduct] = useState(false);

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
                setCurrentProduct,
                setShowResult,
                setSearchResult,
                setIsLoadingProduct,
                handleSetCurrentProduct,
                setShowProduct,
                setSearchAllResult,
                showResult,
                isOpenModal,
                searchResult,
                searchValue,
                debounce,
                loading,
                inputRef,
                currentProduct,
                isLoadingProduct,
                showProduct,
                searchAllResult,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

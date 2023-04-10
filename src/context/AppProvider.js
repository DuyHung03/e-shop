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

    /**
     * The function handles Google login authentication and adds new user information to a database if
     * the user is new.
     */

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

    /**
     * The function handles Facebook login authentication and adds new users to a Firestore database.
     */

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

    //Show result (product) in searchBox
    const [showResult, setShowResult] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);
    const [searchAllResult, setSearchAllResult] = useState(
        [],
    );

    /* Show loading pages */
    const [loading, setLoading] = useState(true);

    const debounce = useDebounce(searchValue, 500);

    const inputRef = useRef();

    /**
     * The function handles input value changes and sets the search value if it doesn't start with a
     * space.
     * @param e - The parameter "e" is an event object that is passed to the function when it is
     * triggered by an event, such as a user typing in an input field. It contains information about
     * the event, such as the target element (in this case, the input field) and the value of the input
     */
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

    /* This `useEffect` hook is responsible for performing a search operation based on the `debounce`state value. If `debounce` is empty or contains only whitespace characters, it sets the `searchResult` state to an empty array and sets the `loading` state to `false`. Otherwise, it sets the `loading` state to `true`, calls the `searchProduct` function with the `debounce` value and a limit of 10 results, and sets the `searchResult` state to the result of the search.
    Finally, it sets the `loading` state to `false`. This hook is triggered whenever the `debounce`
    state value changes. */
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const callAPI = async () => {
            const res = await searchProduct(
                debounce.trim(),
                10,
            );
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

    /**
     * The function sets the current product, hides the result, and saves the current product in local
     * storage.
     * @param prd - The parameter `prd` is an object representing a product. It is passed as an
     * argument to the `handleSetCurrentProduct` function. The function sets the `currentProduct` state
     * to the value of `prd`, hides the result, and stores the `prd` object in the browser's local
     */
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
                showProduct,
                searchAllResult,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

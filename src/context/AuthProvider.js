import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { auth } from '../firebase/firebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    //*SignIn

    /* This is a React hook called `useEffect` that is used to perform side effects in a functional
    component. In this case, it is used to listen for changes in the authentication state of the
    user using the `auth.onAuthStateChanged` method provided by Firebase. */
    useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged(
            (user) => {
                if (user) {
                    setUser(user);
                    setLoading(false);
                    navigate('/');
                    console.log(user);
                } else {
                    setLoading(false);
                }
            },
        );
        return unsubcribed;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                navigate,
                setUser,
                setEmail,
                setPassword,
                setName,
                email,
                password,
                name,
            }}
        >
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

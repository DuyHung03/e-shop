import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { auth } from '../firebase/firebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged(
            (user) => {
                setUser(user);
                setLoading(false);
                navigate('/');
            },
        );
        return unsubcribed;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <AuthContext.Provider
            value={{ user, navigate, setUser }}
        >
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

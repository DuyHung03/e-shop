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
                if (user) {
                    setLoading(false);
                    setUser(user);
                    navigate('/');
                } else {
                    setLoading(false);
                    navigate('/login');
                }
            },
        );
        return unsubcribed;
    }, [navigate]);
    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

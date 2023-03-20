import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
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
                console.log(user);
            },
        );
        return unsubcribed;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const handleCreateAccountWithEmail = () => {
        createUserWithEmailAndPassword(
            auth,
            email,
            password,
        )
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                });
            })
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setUser(user);
                user
                    ? navigate('/login')
                    : alert('Unidentify Error');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                navigate,
                setUser,
                handleCreateAccountWithEmail,
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

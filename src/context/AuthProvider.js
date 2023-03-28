import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
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
    const handleCreateAccountWithEmail = async () => {
        if ((email, password, name)) {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                    });
                    if (!userCredential.user)
                        redirect('/sign-up-form');
                    else navigate('/login');
                })

                .catch((error) => {
                    alert(error);
                    console.log('Loi', error);
                });
        } else {
            alert('Error Empty Infomations');
        }
    };

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

import { useContext, useEffect, useState } from 'react';
import {
    collection,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/AuthProvider';

/**
 * The useFirestore function retrieves data from a Firestore collection based on the user's ID and
 * returns it as an array.
 * @param field - The "field" parameter is a string that represents the name of the collection in
 * Firestore that the function will query.
 * @returns The `useFirestore` custom hook is returning the `cart` state variable, which is an array of
 * objects representing the documents in the Firestore collection specified by the `field` parameter
 * and belonging to the currently authenticated user. The hook uses the `onSnapshot` function to listen
 * for real-time updates to the collection and updates the `cart` state variable accordingly.
 */
export const useFirestore = (field) => {
    const {
        user: { uid },
    } = useContext(AuthContext);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (uid) {
            const q = query(
                collection(db, field),
                where('user', '==', uid),
            );
            let unsubcribed = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCart(data);
                console.log(data);
            });
            return unsubcribed;
        } else {
            setCart([]);
        }
    }, [field, uid]);

    return cart;
};

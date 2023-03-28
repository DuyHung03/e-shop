import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

export const addDocs = async (field, data) => {
    const docRef = await addDoc(collection(db, field), {
        ...data,
    });
    console.log(field);
    console.log(docRef.id);
};

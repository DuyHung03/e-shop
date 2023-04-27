import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

/**
 * This function adds a document to a specified collection in a Firestore database and logs the
 * collection name and document ID.
 * @param field - The name of the collection in Firestore where the document will be added.
 * @param data - The `data` parameter is an object that contains the data to be added to the Firestore
 * collection. The spread operator `...` is used to spread the properties of the `data` object into the
 * new object being created.
 */
export const addDocs = async (field, data = {}) => {
    await addDoc(collection(db, field), {
        ...data,
    });
};

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
    connectAuthEmulator,
    getAuth,
} from 'firebase/auth';
import {
    connectFirestoreEmulator,
    getFirestore,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCCbvBIBadSdRMKfrmO8zghg-LhrSoFNws',
    authDomain: 'e-shop-f05c0.firebaseapp.com',
    projectId: 'e-shop-f05c0',
    storageBucket: 'e-shop-f05c0.appspot.com',
    messagingSenderId: '141282146145',
    appId: '1:141282146145:web:acb99b5944e48e0d523720',
    measurementId: 'G-B8W1LLL7L0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);

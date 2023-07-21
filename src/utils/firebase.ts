import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBRQDUi-m31kVf3ibqTtj1zX4jUVuZHsHU",
    authDomain: "mutancia-social.firebaseapp.com",
    projectId: "mutancia-social",
    storageBucket: "mutancia-social.appspot.com",
    messagingSenderId: "607585541200",
    appId: "1:607585541200:web:87abc3f9095881f0b50555",
    measurementId: "G-MBLKTP28HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);
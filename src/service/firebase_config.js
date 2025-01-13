import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCiL-RgJ0n8-C7Z_46J9i5VNOfBM_hFOSA",
    authDomain: "sky-resource-form.firebaseapp.com",
    projectId: "sky-resource-form",
    storageBucket: "sky-resource-form.firebasestorage.app",
    messagingSenderId: "336317455241",
    appId: "1:336317455241:web:7a6f0ac3dfdea9a60f9f58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db, };

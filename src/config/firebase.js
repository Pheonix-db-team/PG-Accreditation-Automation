// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8qNkIUIHLacsEE_kVEJlYfGJkgp0KI7c",
    authDomain: "pilot-149b6.firebaseapp.com",
    projectId: "pilot-149b6",
    storageBucket: "pilot-149b6.appspot.com",
    messagingSenderId: "138888483759",
    appId: "1:138888483759:web:ae1bd8ac2037a77f22955a",
    measurementId: "G-MZF78WJKHJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
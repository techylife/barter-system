import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBdo2z6P65tnL7nWx9lRfrsNsHBIMwbbx0",
    authDomain: "barter-system-a.firebaseapp.com",
    projectId: "barter-system-a",
    storageBucket: "barter-system-a.appspot.com",
    messagingSenderId: "382711245891",
    appId: "1:382711245891:web:80bf0121868602f885b8f6",
    measurementId: "G-QGNKFTB2MY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase.firestore()
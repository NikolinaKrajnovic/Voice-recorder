import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyA7xQLoHSklZMV-i_vHoCt1On7NMsql6XI",
    authDomain: "heylol-26e4d.firebaseapp.com",
    databaseURL: "https://heylol-26e4d.firebaseio.com",
    projectId: "heylol-26e4d",
    storageBucket: "heylol-26e4d.appspot.com",
    messagingSenderId: "1025545518827",
    appId: "1:1025545518827:web:fcfa9ae9b1dde81418c8ae"
  };


const config = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();


export { config, database , storage as default };
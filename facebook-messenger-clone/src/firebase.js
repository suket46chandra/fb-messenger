import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  //Firebase Config Here
});

const db = firebaseApp.firestore();

export default db;

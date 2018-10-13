import firebase from 'firebase';
import config from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const databaseRef = firebase.database().ref();
export const productsRef = databaseRef.child('products');
export const recipesRef = databaseRef.child('recipes');

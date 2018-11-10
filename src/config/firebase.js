import firebase from 'firebase';
import config from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const databaseRef = firebase.database();
export const productsRef = databaseRef.ref('/products');
export const measurementsRef = databaseRef.ref('/measurements');
export const recipesRef = databaseRef.ref('/recipes');

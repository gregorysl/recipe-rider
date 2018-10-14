import { databaseRef, productsRef } from '../config/firebase';

const recipes = [
  {
    key: 1,
    name: 'Jajecznik',
    products: [
      { amount: '3', product: '1', measurement: 'glass' },
      { amount: '100', product: '2', measurement: 'grams' }
    ]
  }
];
let currentRecipeKey = 2;

export function addRecipe(recipe) {
  recipe.key = currentRecipeKey;
  currentRecipeKey += 1;
  recipes.push(recipe);
  return true;
}
export function getRecipes() {
  return recipes;
}

export function saveProduct(product) {
  let productKey = '';
  if (!product.key) {
    productKey = productsRef.push().key;
    product.key = productKey;
    product.active = true;
  } else {
    productKey = product.key;
  }
  databaseRef.ref(`/products/${productKey}`).set(product);
  return true;
}
export function getProducts() {
  return productsRef.once('value');
}
export const measurementTypes = [
  {
    key: 'piece',
    name: 'Sztuka',
    main: true
  },
  {
    key: 'grams',
    name: 'Gramy',
    main: true
  },
  {
    key: 'glass',
    name: 'Szklanka',
    parent: 'grams'
  },
  {
    key: 'bigSpoon',
    name: 'Duża łyżka',
    parent: 'grams'
  },
  {
    key: 'smallSpoon',
    name: 'Mała łyżeczka',
    parent: 'grams'
  }
];

export function getMeasurements() {
  return measurementTypes;
}

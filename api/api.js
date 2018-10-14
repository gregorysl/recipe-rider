import { databaseRef, productsRef, measurementsRef } from '../config/firebase';

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

export function getMeasurements() {
  return measurementsRef.once('value');
}

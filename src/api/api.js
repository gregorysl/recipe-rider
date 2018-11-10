import {
  databaseRef,
  productsRef,
  measurementsRef,
  recipesRef
} from '../config/firebase';

export function addRecipe(recipe) {
  let recipeKey = '';
  if (!recipe.key) {
    recipeKey = recipesRef.push().key;
    recipe.key = recipeKey;
    recipe.active = true;
  } else {
    recipeKey = recipe.key;
  }
  databaseRef.ref(`/recipes/${recipeKey}`).set(recipe);
  return true;
}
export function getRecipes() {
  return recipesRef.once('value');
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

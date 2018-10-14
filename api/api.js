import { databaseRef } from '../config/firebase';

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
const products = [];

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
  if (!product.key) {
    const { key } = databaseRef.ref('/products').push();
    product.key = key;
    product.active = true;
    databaseRef.ref(`/products/${key}`).set(product);
  } else {
    const item = products.filter(x => x.key === product.key)[0];
    const index = products.indexOf(item);
    products[index] = product;
  }
  return true;
}
export function getProducts() {
  return databaseRef.ref('/products').once('value');
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

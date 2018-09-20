const recipes = [{ name: 'asd', key: 1 }];
let currentProductKey = 3;
let currentRecipeKey = 2;
const products = [{
  key: 1,
  bigSpoon: 123,
  glass: 123,
  grams: 123,
  name: 'Jajka',
  measurement: 'grams',
  smallSpoon: 123,
  unitPrice: 123
},
{
  key: 2,
  bigSpoon: 123,
  glass: 123,
  grams: 123,
  name: 'Mąka',
  measurement: 'grams',
  smallSpoon: 123,
  unitPrice: 123
}];

export function addRecipe(recipe) {
  recipe.key = currentRecipeKey;
  currentRecipeKey += 1;
  recipes.push(recipe);
  return true;
}
export function getRecipes() {
  return recipes;
}

export function addProduct(product) {
  product.key = currentProductKey;
  currentProductKey += 1;
  products.push(product);
  return true;
}
export function getProducts() {
  return products;
}

const recipes = ['asd'];

const products = [{
  key: 'jajka',
  unitPrice: '0.7'
}];

export function addRecipe(recipe) {
  recipes.push(recipe);
  return true;
}
export function getRecipes() {
  return recipes;
}

export function addProduct(product) {
  products.push(product);
  return true;
}
export function getProducts() {
  return products;
}

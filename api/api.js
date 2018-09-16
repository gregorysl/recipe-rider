const recipes = ['asd'];

const products = [{
  name: 'jajka',
  price: '0.7',
  quantifier: 'sztuka'
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

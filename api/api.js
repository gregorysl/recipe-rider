const recipes = [{ name: 'asd', key: 1 }];
let currentProductKey = 3;
let currentRecipeKey = 2;
const products = [{
  key: 1,
  bigSpoon: 123,
  glass: 234,
  grams: 345,
  name: 'Jajka',
  measurement: 'glass',
  smallSpoon: 456,
  unitPrice: 567,
  active: true
},
{
  key: 2,
  bigSpoon: 123,
  glass: 123,
  grams: 123,
  name: 'Mąka',
  measurement: 'grams',
  smallSpoon: 123,
  unitPrice: 123,
  active: false
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
  if (!product.key) {
    product.key = currentProductKey;
    currentProductKey += 1;
    products.push(product);
  } else {
    const item = products.filter(x => x.key === product.key)[0];
    const index = products.indexOf(item);
    products[index] = product;
  }
  return true;
}
export function getProducts() {
  return products;
}

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
let currentProductKey = 3;
let currentRecipeKey = 2;
const products = [
  {
    key: 1,
    unitPrice: 4.2,
    name: 'Jajka',
    measurement: 'piece',
    piece: 10,
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
  }
];

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

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
    measurement: 'grams',
    grams: 1000,
    key: 3,
    name: 'Jabłka',
    unitPrice: 2.49,
    active: true
  },
  {
    measurement: 'grams',
    grams: 1000,
    key: 4,
    name: 'Cukier',
    unitPrice: 2.19,
    active: true
  },
  {
    measurement: 'grams',
    grams: 250,
    key: 5,
    name: 'Mascarpone',
    unitPrice: 47.9,
    active: true
  },
  {
    measurement: 'smallSpoon',
    grams: 15,
    smallSpoon: 5,
    key: 6,
    name: 'Cynamon',
    unitPrice: 0.99,
    active: true
  },
  {
    measurement: 'glass',
    grams: 1000,
    glass: 130,
    key: 7,
    name: 'Mąka',
    unitPrice: 2.5,
    active: true
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
    product.active = true;
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

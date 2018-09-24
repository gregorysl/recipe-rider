import * as types from '../constants/actionTypes';

export const addRecipe = recipe => ({
  type: types.ADD_RECIPE_REQUEST,
  recipe
});

export const getRecipes = () => ({
  type: types.GET_RECIPE_REQUEST
});

export const saveProduct = product => ({
  type: types.SAVE_PRODUCT_REQUEST,
  product
});

export const getProducts = () => ({
  type: types.GET_PRODUCT_REQUEST
});

import { takeLatest } from 'redux-saga/effects';
import * as recipeSagas from './tableSagas';
import * as productSagas from './productSagas';
import * as types from '../constants/actionTypes';

export function* watchAddRecipe() {
  yield takeLatest(types.ADD_RECIPE_REQUEST, recipeSagas.addRecipe);
}
export function* watchGetRecipes() {
  yield takeLatest(types.GET_RECIPE_REQUEST, recipeSagas.getRecipes);
}

export function* watchAddProduct() {
  yield takeLatest(types.ADD_PRODUCT_REQUEST, productSagas.addProduct);
}
export function* watchGetProducts() {
  yield takeLatest(types.GET_PRODUCT_REQUEST, productSagas.getProducts);
}

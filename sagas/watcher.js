import { takeLatest } from 'redux-saga/effects';
import * as recipeSagas from './recipeSagas';
import * as productSagas from './productSagas';
import measurementSagas from './measurementSagas';
import * as types from '../constants/actionTypes';

export function* watchAddRecipe() {
  yield takeLatest(types.ADD_RECIPE_REQUEST, recipeSagas.addRecipe);
}
export function* watchGetRecipes() {
  yield takeLatest(types.GET_RECIPE_REQUEST, recipeSagas.getRecipes);
}

export function* watchSaveProduct() {
  yield takeLatest(types.SAVE_PRODUCT_REQUEST, productSagas.saveProduct);
}
export function* watchGetProducts() {
  yield takeLatest(types.GET_PRODUCT_REQUEST, productSagas.getProducts);
}

export function* watchGetMeasurements() {
  yield takeLatest(types.GET_MEASUREMENTS_REQUEST, measurementSagas);
}

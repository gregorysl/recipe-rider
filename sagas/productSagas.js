import { put, call } from 'redux-saga/effects';
import * as api from '../api/api';
import * as types from '../constants/actionTypes';

export function* getProducts() {
  try {
    const data = yield call(api.getProducts);
    yield put({ type: types.GET_PRODUCT_SUCCESS, data: data.val() });
  } catch (error) {
    yield put({ type: types.GET_PRODUCT_ERROR, data: error.response.data });
  }
}
export function* saveProduct(params) {
  try {
    const data = yield call(api.saveProduct, params.product);
    yield put({ type: types.SAVE_PRODUCT_SUCCESS, data });
    yield put({ type: types.GET_PRODUCT_REQUEST });
  } catch (error) {
    yield put({ type: types.SAVE_PRODUCT_ERROR, data: error.response.data });
  }
}

import { put, call } from 'redux-saga/effects';
import * as api from '../api/api';
import * as types from '../constants/actionTypes';

export function* getProducts() {
  try {
    const data = yield call(api.getProducts);
    yield put({ type: types.GET_PRODUCT_SUCCESS, data });
  } catch (error) {
    yield put({ type: types.GET_PRODUCT_ERROR, data: error.response.data });
  }
}
export function* addProduct(params) {
  try {
    const data = yield call(api.addProduct, params.product);
    yield put({ type: types.ADD_PRODUCT_SUCCESS, data });
    yield put({ type: types.GET_PRODUCT_REQUEST });
  } catch (error) {
    yield put({ type: types.ADD_PRODUCT_ERROR, data: error.response.data });
  }
}

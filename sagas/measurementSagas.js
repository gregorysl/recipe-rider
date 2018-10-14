import { put, call } from 'redux-saga/effects';
import * as api from '../api/api';
import * as types from '../constants/actionTypes';

export default function* getMeasurements() {
  try {
    const data = yield call(api.getMeasurements);
    yield put({ type: types.GET_MEASUREMENTS_SUCCESS, data }); // :data.val() });
  } catch (error) {
    yield put({
      type: types.GET_MEASUREMENTS_ERROR,
      data: error.response.data
    });
  }
}

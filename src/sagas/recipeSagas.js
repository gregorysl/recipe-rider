import { put, call } from "redux-saga/effects";
import * as api from "../api/api";
import * as types from "../constants/actionTypes";

export function* getRecipes() {
  try {
    const data = yield call(api.getRecipes);
    const items = data.val() ? data.val() : {};
    yield put({ type: types.GET_RECIPE_SUCCESS, data: items });
  } catch (error) {
    yield put({ type: types.GET_RECIPE_ERROR, data: error.response.data });
  }
}
export function* addRecipe(params) {
  try {
    const data = yield call(api.addRecipe, params.recipe);
    yield put({ type: types.ADD_RECIPE_SUCCESS, data });
    yield put({ type: types.GET_RECIPE_REQUEST });
  } catch (error) {
    yield put({ type: types.ADD_RECIPE_ERROR, data: error });
  }
}

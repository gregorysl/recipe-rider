import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

function recipeReducer(state = [], action) {
  switch (action.type) {
    case types.GET_RECIPE_SUCCESS:
      return [...action.data];
    default:
      return state;
  }
}
function productReducer(state = [], action) {
  switch (action.type) {
    case types.GET_PRODUCT_SUCCESS:
      return [...Object.values(action.data)];
    default:
      return state;
  }
}

function measurementReducer(state = [], action) {
  switch (action.type) {
    case types.GET_MEASUREMENTS_SUCCESS:
      return [...action.data]; // [...Object.values(action.data)];
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  table: recipeReducer,
  product: productReducer,
  measurements: measurementReducer
});

export default rootReducer;

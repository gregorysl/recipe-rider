import { combineReducers } from "redux";
import * as types from "../constants/actionTypes";

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function recipeReducer(state = [], action) {
  switch (action.type) {
    case types.GET_RECIPE_SUCCESS:
      return [...Object.values(action.data)];
    default:
      return state;
  }
}
function productReducer(state = [], action) {
  switch (action.type) {
    case types.GET_PRODUCT_SUCCESS:
      return [...Object.values(action.data)].sort(compare);
    default:
      return state;
  }
}

function measurementReducer(state = [], action) {
  switch (action.type) {
    case types.GET_MEASUREMENTS_SUCCESS:
      return [...Object.values(action.data)];
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  recipes: recipeReducer,
  product: productReducer,
  measurements: measurementReducer
});

export default rootReducer;
